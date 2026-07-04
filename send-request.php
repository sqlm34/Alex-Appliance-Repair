<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

const RECIPIENT_EMAIL = 'alexeasyrepair@gmail.com';
const MAX_FILE_BYTES = 8388608;
const PRIVATE_DIR = __DIR__ . '/private';
const SUBMISSIONS_DIR = PRIVATE_DIR . '/submissions';
const SMTP_CONFIG_FILE = PRIVATE_DIR . '/smtp-config.php';

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function value(string $key): string
{
    return trim((string)($_POST[$key] ?? ''));
}

function clean_text(string $value): string
{
    return preg_replace('/[\x00-\x1F\x7F]+/', ' ', $value) ?? '';
}

function clean_header(string $value): string
{
    return trim(str_replace(["\r", "\n", '<', '>'], '', $value));
}

function is_letters_only(string $value): bool
{
    return (bool)preg_match("/^[A-Za-z][A-Za-z\s'.-]{1,59}$/", $value);
}

function safe_file_name(string $name): string
{
    $name = preg_replace('/[^A-Za-z0-9._-]+/', '-', $name) ?? 'model-number-photo';
    $name = trim($name, '.-');
    if ($name === '') {
        $name = 'model-number-photo';
    }
    if (strlen($name) <= 48) {
        return $name;
    }
    $extension = pathinfo($name, PATHINFO_EXTENSION);
    $base = pathinfo($name, PATHINFO_FILENAME);
    $suffix = $extension !== '' ? '.' . substr($extension, 0, 8) : '';
    return substr($base, 0, 34) . '...' . $suffix;
}

function ensure_private_storage(): void
{
    foreach ([PRIVATE_DIR, SUBMISSIONS_DIR] as $dir) {
        if (!is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
            respond(500, ['success' => false, 'message' => 'Could not create secure request storage.']);
        }
    }
}

function write_json_file(string $path, array $payload): bool
{
    $json = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        return false;
    }
    return file_put_contents($path, $json . PHP_EOL, LOCK_EX) !== false;
}

function smtp_env(string $key): string
{
    $value = getenv($key);
    return is_string($value) ? trim($value) : '';
}

function load_smtp_config(): array
{
    $fileConfig = [];
    if (is_file(SMTP_CONFIG_FILE)) {
        $loaded = require SMTP_CONFIG_FILE;
        if (is_array($loaded)) {
            $fileConfig = $loaded;
        }
    }

    $get = static function (string $key, string $default = '') use ($fileConfig): string {
        $envValue = smtp_env('ALEX_' . strtoupper($key));
        if ($envValue !== '') {
            return $envValue;
        }
        $plainEnvValue = smtp_env(strtoupper($key));
        if ($plainEnvValue !== '') {
            return $plainEnvValue;
        }
        $fileValue = $fileConfig[strtolower($key)] ?? $fileConfig[strtoupper($key)] ?? '';
        return is_scalar($fileValue) && trim((string)$fileValue) !== '' ? trim((string)$fileValue) : $default;
    };

    $username = $get('smtp_user');
    return [
        'host' => $get('smtp_host', 'smtp.hostinger.com'),
        'port' => (int)$get('smtp_port', '465'),
        'secure' => strtolower($get('smtp_secure', 'ssl')),
        'username' => $username,
        'password' => $get('smtp_pass'),
        'from_email' => $get('smtp_from', $username),
        'from_name' => $get('smtp_from_name', 'Alex Appliance Repair Website'),
    ];
}

function smtp_configured(array $config): bool
{
    return $config['host'] !== '' && $config['port'] > 0 && $config['username'] !== '' && $config['password'] !== '' && $config['from_email'] !== '';
}

function build_mail_parts(array $bodyLines, ?array $attachment, array $smtpConfig, string $replyToName, string $replyToEmail): array
{
    $fromEmail = $smtpConfig['from_email'] !== '' ? $smtpConfig['from_email'] : 'no-reply@alex-repair.com';
    $fromName = $smtpConfig['from_name'] !== '' ? $smtpConfig['from_name'] : 'Alex Appliance Repair Website';
    $boundary = 'alex_' . bin2hex(random_bytes(12));
    $subject = 'New service request from alex-repair.com';
    $headers = [
        'From: ' . clean_header($fromName) . ' <' . clean_header($fromEmail) . '>',
        'Reply-To: "' . clean_header($replyToName) . '" <' . clean_header($replyToEmail) . '>',
        'To: ' . RECIPIENT_EMAIL,
        'Date: ' . date(DATE_RFC2822),
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@alex-repair.com>',
        'MIME-Version: 1.0',
        'X-Mailer: Alex Appliance Repair Request Form',
    ];

    if ($attachment === null || !is_file($attachment['path'])) {
        $headers[] = 'Content-Type: text/plain; charset=UTF-8';
        $headers[] = 'Content-Transfer-Encoding: 8bit';
        $body = implode("\r\n", $bodyLines) . "\r\n";
    } else {
        $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
        $body = "--{$boundary}\r\n";
        $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $body .= implode("\r\n", $bodyLines) . "\r\n\r\n";

        $fileData = chunk_split(base64_encode((string)file_get_contents($attachment['path'])));
        $body .= "--{$boundary}\r\n";
        $body .= 'Content-Type: ' . $attachment['type'] . '; name="' . $attachment['name'] . "\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= 'Content-Disposition: attachment; filename="' . $attachment['name'] . "\"\r\n\r\n";
        $body .= $fileData . "\r\n";
        $body .= "--{$boundary}--\r\n";
    }

    return [
        'subject' => $subject,
        'headers' => $headers,
        'body' => $body,
        'from_email' => clean_header($fromEmail),
    ];
}

function smtp_read_response($socket): array
{
    $lines = [];
    while (($line = fgets($socket, 515)) !== false) {
        $lines[] = rtrim($line, "\r\n");
        if (strlen($line) >= 4 && $line[3] === ' ') {
            break;
        }
    }
    $last = end($lines) ?: '';
    $code = (int)substr($last, 0, 3);
    return [$code, implode("\n", $lines)];
}

function smtp_command($socket, string $command, array $acceptedCodes): void
{
    fwrite($socket, $command . "\r\n");
    [$code, $response] = smtp_read_response($socket);
    if (!in_array($code, $acceptedCodes, true)) {
        throw new RuntimeException('SMTP command failed: ' . $response);
    }
}

function smtp_dot_stuff(string $message): string
{
    $message = str_replace(["\r\n", "\r"], "\n", $message);
    $lines = explode("\n", $message);
    foreach ($lines as &$line) {
        if (isset($line[0]) && $line[0] === '.') {
            $line = '.' . $line;
        }
    }
    unset($line);
    return implode("\r\n", $lines);
}

function send_via_smtp(array $config, string $recipient, array $mailParts): void
{
    if (!smtp_configured($config)) {
        throw new RuntimeException('SMTP is not configured.');
    }

    $transport = $config['secure'] === 'ssl' ? 'ssl://' : '';
    $socket = @stream_socket_client($transport . $config['host'] . ':' . $config['port'], $errno, $errstr, 25, STREAM_CLIENT_CONNECT);
    if (!$socket) {
        throw new RuntimeException('SMTP connection failed: ' . $errstr);
    }

    stream_set_timeout($socket, 25);
    try {
        [$code, $response] = smtp_read_response($socket);
        if ($code !== 220) {
            throw new RuntimeException('SMTP greeting failed: ' . $response);
        }

        smtp_command($socket, 'EHLO alex-repair.com', [250]);
        if ($config['secure'] === 'tls') {
            smtp_command($socket, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('SMTP STARTTLS failed.');
            }
            smtp_command($socket, 'EHLO alex-repair.com', [250]);
        }

        smtp_command($socket, 'AUTH LOGIN', [334]);
        smtp_command($socket, base64_encode($config['username']), [334]);
        smtp_command($socket, base64_encode($config['password']), [235]);
        smtp_command($socket, 'MAIL FROM:<' . $mailParts['from_email'] . '>', [250]);
        smtp_command($socket, 'RCPT TO:<' . $recipient . '>', [250, 251]);
        smtp_command($socket, 'DATA', [354]);

        $raw = implode("\r\n", $mailParts['headers']);
        $raw .= "\r\nSubject: " . $mailParts['subject'];
        $raw .= "\r\n\r\n" . $mailParts['body'];
        fwrite($socket, smtp_dot_stuff($raw) . "\r\n.\r\n");
        [$dataCode, $dataResponse] = smtp_read_response($socket);
        if ($dataCode !== 250) {
            throw new RuntimeException('SMTP DATA failed: ' . $dataResponse);
        }
        smtp_command($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

function send_via_php_mail(string $recipient, array $mailParts): bool
{
    $headers = implode("\r\n", $mailParts['headers']);
    $sent = @mail($recipient, $mailParts['subject'], $mailParts['body'], $headers, '-f ' . $mailParts['from_email']);
    if (!$sent) {
        $sent = @mail($recipient, $mailParts['subject'], $mailParts['body'], $headers);
    }
    return $sent;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'message' => 'Method not allowed.']);
}

$name = clean_text(value('Name'));
$phone = preg_replace('/\D+/', '', value('Phone')) ?? '';
if (strlen($phone) === 10) {
    $phone = '1' . $phone;
}
$phoneDisplay = '+' . $phone;
$email = filter_var(value('Email'), FILTER_SANITIZE_EMAIL);
$city = clean_text(value('City'));
$service = clean_text(value('Service'));
$message = trim(clean_text(value('Message')));
$sourcePage = clean_text(value('Source_Page')) ?: 'https://alex-repair.com/contacts.html';

$errors = [];
if (!is_letters_only($name)) {
    $errors['name'] = 'Please enter a real name using letters only.';
}
if (!preg_match('/^1\d{10}$/', $phone)) {
    $errors['phone'] = 'Please enter a valid 10-digit phone number.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
}
if (!is_letters_only($city)) {
    $errors['city'] = 'Please enter a city name using letters only.';
}
if ($service === '') {
    $errors['service'] = 'Please select a service.';
}
if (strlen($message) < 8) {
    $errors['message'] = 'Please add a short description.';
}

$attachment = null;
$uploadedFile = null;
if (isset($_FILES['Model_Number_Photo']) && is_array($_FILES['Model_Number_Photo']) && $_FILES['Model_Number_Photo']['error'] !== UPLOAD_ERR_NO_FILE) {
    $uploadedFile = $_FILES['Model_Number_Photo'];
    if ($uploadedFile['error'] !== UPLOAD_ERR_OK || $uploadedFile['size'] > MAX_FILE_BYTES) {
        $errors['photo'] = 'Please attach an image up to 8 MB.';
    } else {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'];
        $extension = strtolower(pathinfo((string)$uploadedFile['name'], PATHINFO_EXTENSION));
        $mime = '';
        if (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            if ($finfo !== false) {
                $mime = finfo_file($finfo, (string)$uploadedFile['tmp_name']) ?: '';
                finfo_close($finfo);
            }
        }
        if (!in_array($extension, $allowedExtensions, true) || ($mime !== '' && !in_array($mime, $allowedTypes, true))) {
            $errors['photo'] = 'Please attach a JPG, PNG, WEBP, or HEIC image.';
        }
    }
}

if ($errors !== []) {
    respond(422, ['success' => false, 'message' => 'Validation failed.', 'errors' => $errors]);
}

ensure_private_storage();
$submissionId = gmdate('Ymd-His') . '-' . bin2hex(random_bytes(4));
$submissionDir = SUBMISSIONS_DIR . '/' . $submissionId;
if (!mkdir($submissionDir, 0750, true) && !is_dir($submissionDir)) {
    respond(500, ['success' => false, 'message' => 'Could not save request.']);
}

if ($uploadedFile !== null) {
    $safeName = safe_file_name((string)$uploadedFile['name']);
    $targetPath = $submissionDir . '/' . $safeName;
    $moved = is_uploaded_file((string)$uploadedFile['tmp_name'])
        ? move_uploaded_file((string)$uploadedFile['tmp_name'], $targetPath)
        : copy((string)$uploadedFile['tmp_name'], $targetPath);
    if (!$moved || !is_file($targetPath)) {
        respond(500, ['success' => false, 'message' => 'Could not save attached photo.']);
    }
    @chmod($targetPath, 0640);
    $attachment = [
        'path' => $targetPath,
        'name' => $safeName,
        'type' => (string)($mime !== '' ? $mime : $uploadedFile['type']),
        'size' => (int)$uploadedFile['size'],
    ];
}

$bodyLines = [
    'New Request Service submission',
    'Submission ID: ' . $submissionId,
    '',
    'Name: ' . $name,
    'Phone: ' . $phoneDisplay,
    'Email: ' . $email,
    'City: ' . $city,
    'Service: ' . $service,
    'Source page: ' . $sourcePage,
    '',
    'Message:',
    $message,
];

if ($attachment !== null) {
    array_splice($bodyLines, 9, 0, 'Model number photo: attached as ' . $attachment['name']);
}

$smtpConfig = load_smtp_config();
$mailParts = build_mail_parts($bodyLines, $attachment, $smtpConfig, $name, $email);
$delivery = [
    'smtp_configured' => smtp_configured($smtpConfig),
    'smtp_sent' => false,
    'php_mail_sent' => false,
    'smtp_error' => '',
];

if ($delivery['smtp_configured']) {
    try {
        send_via_smtp($smtpConfig, RECIPIENT_EMAIL, $mailParts);
        $delivery['smtp_sent'] = true;
    } catch (Throwable $error) {
        $delivery['smtp_error'] = $error->getMessage();
    }
}

if (!$delivery['smtp_sent']) {
    $delivery['php_mail_sent'] = send_via_php_mail(RECIPIENT_EMAIL, $mailParts);
}

$stored = write_json_file($submissionDir . '/request.json', [
    'submission_id' => $submissionId,
    'created_at_utc' => gmdate('c'),
    'recipient' => RECIPIENT_EMAIL,
    'name' => $name,
    'phone' => $phoneDisplay,
    'email' => $email,
    'city' => $city,
    'service' => $service,
    'source_page' => $sourcePage,
    'message' => $message,
    'attachment' => $attachment === null ? null : [
        'file_name' => $attachment['name'],
        'mime_type' => $attachment['type'],
        'size' => $attachment['size'],
    ],
    'delivery' => $delivery,
]);

if (!$stored) {
    respond(500, ['success' => false, 'message' => 'Could not store request details.']);
}

respond(200, [
    'success' => true,
    'message' => 'Request received.',
    'stored' => true,
    'email_sent' => $delivery['smtp_sent'] || $delivery['php_mail_sent'],
    'smtp_configured' => $delivery['smtp_configured'],
    'submission_id' => $submissionId,
]);
