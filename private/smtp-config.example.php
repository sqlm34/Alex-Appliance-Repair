<?php
return [
    // Create a mailbox in Hostinger Email, then copy this file to:
    // /smtp-config.php on the Hostinger account root, one level above public_html.
    // The app also supports public_html/private/smtp-config.php for local tests.
    // Do not commit the real smtp-config.php file.
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => '465',
    'smtp_secure' => 'ssl',
    'smtp_user' => 'no-reply@alex-repair.com',
    'smtp_pass' => 'PASTE_HOSTINGER_MAILBOX_PASSWORD_HERE',
    'smtp_from' => 'no-reply@alex-repair.com',
    'smtp_from_name' => 'Alex Appliance Repair Website',
];
