<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

const RECIPIENT_EMAIL = 'alexeasyrepair@gmail.com';
const MAX_FILE_BYTES = 8388608;

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
if (isset($_FILES['Model_Number_Photo']) && is_array($_FILES['Model_Number_Photo']) && $_FILES['Model_Number_Photo']['error'] !== UPLOAD_ERR_NO_FILE) {
    $file = $_FILES['Model_Number_Photo'];
    if ($file['error'] !== UPLOAD_ERR_OK || $file['size'] > MAX_FILE_BYTES) {
        $errors['photo'] = 'Please attach an image up to 8 MB.';
    } else {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'];
        $extension = strtolower(pathinfo((string)$file['name'], PATHINFO_EXTENSION));
        $mime = '';
        if (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            if ($finfo !== false) {
                $mime = finfo_file($finfo, (string)$file['tmp_name']) ?: '';
                finfo_close($finfo);
            }
        }
        if (!in_array($extension, $allowedExtensions, true) || ($mime !== '' && !in_array($mime, $allowedTypes, true))) {
            $errors['photo'] = 'Please attach a JPG, PNG, WEBP, or HEIC image.';
        } else {
            $attachment = [
                'path' => (string)$file['tmp_name'],
                'name' => safe_file_name((string)$file['name']),
                'type' => $mime !== '' ? $mime : (string)$file['type'],
            ];
        }
    }
}

if ($errors !== []) {
    respond(422, ['success' => false, 'message' => 'Validation failed.', 'errors' => $errors]);
}

$subject = 'New service request from alex-repair.com';
$bodyLines = [
    'New Request Service submission',
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

$boundary = 'alex_' . bin2hex(random_bytes(12));
$headers = [
    'From: Alex Appliance Repair <no-reply@alex-repair.com>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
];

$emailBody = "--{$boundary}\r\n";
$emailBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
$emailBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$emailBody .= implode("\r\n", $bodyLines) . "\r\n";

if ($attachment !== null && is_uploaded_file($attachment['path'])) {
    $fileData = chunk_split(base64_encode((string)file_get_contents($attachment['path'])));
    $emailBody .= "--{$boundary}\r\n";
    $emailBody .= 'Content-Type: ' . $attachment['type'] . '; name="' . $attachment['name'] . "\"\r\n";
    $emailBody .= "Content-Transfer-Encoding: base64\r\n";
    $emailBody .= 'Content-Disposition: attachment; filename="' . $attachment['name'] . "\"\r\n\r\n";
    $emailBody .= $fileData . "\r\n";
}

$emailBody .= "--{$boundary}--\r\n";

$sent = mail(RECIPIENT_EMAIL, $subject, $emailBody, implode("\r\n", $headers));
if (!$sent) {
    respond(500, ['success' => false, 'message' => 'Mail delivery failed.']);
}

respond(200, ['success' => true, 'message' => 'Request sent.']);
