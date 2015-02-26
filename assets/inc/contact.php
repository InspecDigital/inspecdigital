<?php

$to = 'art@inspecdigital.org';
$subject = 'Inspec Digital contact form submission';

if(isset($_POST['url']) && $_POST['url'] === '') {
  $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
  $from = preg_replace("/[\r\n]/", '', filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
  $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
  $url = filter_var($_POST['url'], FILTER_SANITIZE_URL);

  $body .= 'A customer has sent you a message:' . "\n";
  $body .= 'Name: ' . $name . "\n";
  $body .= 'E-Mail: ' . $from . "\n";
  $body .= 'Message: ' . $message . "\n";
  $body .= 'URL: ' . $url . "\n";

  $headers = 'From: ';
  $headers .= filter_var($from, FILTER_VALIDATE_EMAIL) ? $from : $to;

  mail($to, $subject, $body, $headers);
}

print 'Thank you, your message has been sent.';

?>
