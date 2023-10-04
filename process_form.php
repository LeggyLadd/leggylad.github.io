<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve the recipient email from the form data (sanitize it for security)
    $recipient_email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);

    // Check if the recipient email is valid
    if (!filter_var($recipient_email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400); // Bad Request
        echo "Invalid email address";
        exit;
    }

    // Set email subject
    $subject = "Contact Form Submission";

    // Sanitize and retrieve other form data
    $first_name = filter_var($_POST["first-name"], FILTER_SANITIZE_STRING);
    $last_name = filter_var($_POST["last-name"], FILTER_SANITIZE_STRING);
    $address = filter_var($_POST["address"], FILTER_SANITIZE_STRING);
    $city = filter_var($_POST["city"], FILTER_SANITIZE_STRING);
    $state = filter_var($_POST["state"], FILTER_SANITIZE_STRING);
    $zip_code = filter_var($_POST["zip-code"], FILTER_SANITIZE_STRING);
    $phone_number = filter_var($_POST["phone-number"], FILTER_SANITIZE_STRING);
    $birth_date = $_POST["birth-date"]; // No need to sanitize date
    $message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

    // Construct the email message body
    $message_body = "First Name: $first_name\n"
                 . "Last Name: $last_name\n"
                 . "Address: $address\n"
                 . "City: $city\n"
                 . "State: $state\n"
                 . "Zip Code: $zip_code\n"
                 . "Phone Number: $phone_number\n"
                 . "Email: $recipient_email\n"
                 . "Birth Date: $birth_date\n"
                 . "Message:\n$message";

    // Send the email
    $mail_success = mail($recipient_email, $subject, $message_body);

    if ($mail_success) {
        // Email sent successfully
        echo "success";
    } else {
        // Email sending failed
        http_response_code(500); // Internal Server Error
        echo "An error occurred while sending the email";
    }
} else {
    // Request method is not POST
    http_response_code(405); // Method Not Allowed
    echo "Method Not Allowed";
}
?>
