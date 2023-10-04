// Function to validate form
function validateForm() {
    var firstName = document.getElementById('first-name').value.trim();
    var lastName = document.getElementById('last-name').value.trim();
    var city = document.getElementById('city').value.trim();
    var state = document.getElementById('state').value.trim();
    var zipCode = document.getElementById('zip-code').value.trim();
    var phoneNumber = document.getElementById('phone-number').value.trim();
    var email = document.getElementById('email').value.trim();
    var birthDate = document.getElementById('birth-date').value;
    var message = document.getElementById('message').value.trim();

    // Check if required fields are filled
    if (
        firstName === '' ||
        lastName === '' ||
        city === '' ||
        state === '' ||
        zipCode === '' ||
        phoneNumber === '' ||
        email === '' ||
        birthDate === '' ||
        message === ''
    ) {
        alert('Please fill in all required fields.');
        return false;
    }

    // Check for valid email format using HTML5 validation
    if (!document.getElementById('email').checkValidity()) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Check for a valid phone number using pattern attribute
    if (!document.getElementById('phone-number').checkValidity()) {
        alert('Please enter a valid 10-digit phone number.');
        return false;
    }

    // Check for a valid birth date using HTML5 validation
    if (new Date(birthDate) > new Date()) {
        alert('Please enter a valid birth date.');
        return false;
    }

    // Get the recipient email address from the form input
    var recipientEmail = document.getElementById('recipient-email').value.trim();

    // Check if recipient email is provided
    if (recipientEmail === '') {
        alert('Please provide a recipient email address.');
        return false;
    }

    // Store the form data for later use
    var formData = {
        firstName: firstName,
        lastName: lastName,
        city: city,
        state: state,
        zipCode: zipCode,
        phoneNumber: phoneNumber,
        email: email,
        birthDate: birthDate,
        message: message,
        recipientEmail: recipientEmail
    };

    // Display the confirmation modal with the form data
    showConfirmationPopup(formData);
}

// Function to display the confirmation popup
function showConfirmationPopup(formData) {
    // Display form data in the confirmation modal
    document.getElementById('modal-first-name').textContent = formData.firstName;
    document.getElementById('modal-last-name').textContent = formData.lastName;
    document.getElementById('modal-address').textContent = formData.city + ', ' + formData.state + ' ' + formData.zipCode;
    document.getElementById('modal-phone-number').textContent = formData.phoneNumber;
    document.getElementById('modal-email').textContent = formData.email;
    document.getElementById('modal-birth-date').textContent = formData.birthDate;
    document.getElementById('modal-message').textContent = formData.message;

    var confirmationModal = document.getElementById('confirmation-modal');
    confirmationModal.style.display = 'flex';

    // Center the confirmation popup
    centerModal(confirmationModal);

    // Add an event listener to the "Confirm" button in the confirmation modal
    document.getElementById('confirm-information-button').addEventListener('click', function () {
        closeConfirmationPopup(formData);
    });
}

// Function to close the confirmation popup
function closeConfirmationPopup(formData) {
    document.getElementById('confirmation-modal').style.display = 'none';

    // After confirmation, display the submission confirmation popup
    showSubmissionConfirmationPopup();

    // Call the sendEmail function to send the email
    sendEmail(formData);
}


// Function to construct and open the mailto link
function sendEmail(formData) {
    var firstName = formData.firstName;
    var lastName = formData.lastName;
    var address = formData.city + ', ' + formData.state + ' ' + formData.zipCode;
    var phoneNumber = formData.phoneNumber;
    var email = formData.email;
    var birthDate = formData.birthDate;
    var message = formData.message;

    // Construct the mailto link with formatted body
    var subject = 'Contact Form Submission';
    var body = `
      First Name: ${firstName}
      Last Name: ${lastName}
      Address: ${address}
      Phone Number: ${phoneNumber}
      Email: ${email}
      Birth Date: ${birthDate}
      Message: ${message}
    `;

    // Encode special characters in the mailto link
    body = encodeURIComponent(body);

    // Construct the mailto link
    var mailtoLink = `mailto:${formData.recipientEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Open the user's default email client with the pre-filled data
    window.location.href = mailtoLink;
}

// Function to display the submission confirmation popup
function showSubmissionConfirmationPopup() {
    var submissionConfirmationModal = document.getElementById('confirmation-modal');
    submissionConfirmationModal.style.display = 'flex';
    centerModal(submissionConfirmationModal);
}

// Function to center the modal
function centerModal(modalElement) {
    modalElement.style.top = '50%';
    modalElement.style.left = '50%';
    modalElement.style.transform = 'translate(-50%, -50%)';
}

// Add an event listener to the form's "submit" event and make sure the confirmation popup shows up when the form is valid
document.getElementById('contact-form').addEventListener('submit', function (event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent the default form submission if validation fails
    }
});

// Add an event listener to the "OK" button in the submission confirmation modal
document.getElementById('ok-button').addEventListener('click', function () {
    closeSubmissionConfirmationPopup();
});

// Function to close the submission confirmation popup
function closeSubmissionConfirmationPopup() {
    document.getElementById('submission-confirmation-modal').style.display = 'none';
}