<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$response["ok"] = false;
$response["email"] = true;

if(isset($_POST['name'], $_POST['mail'], $_POST['phone'])) {
	$recaptcha_secret = '6LdnRF4bAAAAANPO1lN1xGcWAruw5ycBpSWWToq3';
	$recaptcha = json_decode(file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $recaptcha_secret . '&response=' . $_POST['recaptchaResponse']));

	if($recaptcha->score >= 0.5) {
		$name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
		$phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_NUMBER_INT);
		$email = filter_var(trim($_POST['mail']), FILTER_SANITIZE_EMAIL);

		if(!empty($name) && !empty($phone) && !empty($email)) {
			if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
				$mail = new PHPMailer\PHPMailer\PHPMailer();
				$mail->IsSMTP();

				$mail->SMTPDebug  = 0;
				$mail->SMTPAuth   = true;
				$mail->Host       = "ssl://smtp.yandex.ru";

				$mail->Username   = "bot@anivatea.by";
				$mail->Password   = "FSdzcKtJYqeQ1MYrXf9B";
				$mail->SMTPSecure = 'SSL';
				$mail->Port       = 465;

				$mail->CharSet = 'UTF-8';
				$mail->From = "bot@anivatea.by";
				$mail->FromName = 'Контактная форма';
				$mail->addAddress("info@anivatea.by", "Контактная форма");

				$mail->isHTML(true);

				$mail->Subject = "$name: Контактная форма";
				$mail->Body = <<<HTML
					Пользователь ввёл свои данные в контактную форму<br>
					Имя пользователя: $name<br>
					Номер телефона пользователя: $phone<br>
					Email пользователя: $email<br>
				HTML;

				if($mail->send()) {
					$response["ok"] = true;
				}
			}else{
				$response["email"] = false;
			}
		}
	}
}

echo json_encode($response);