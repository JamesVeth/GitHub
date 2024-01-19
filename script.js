// Contact Form Server Side Handling /////////////////////////////////////////

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Basic form validation
    if (!validateForm()) {
        alert('Please fill in all fields');
        return;
    }

    // Get form data
    const formData = new FormData(this);

    // Display form data (you can replace this with your own logic to send data to a server)
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    // Reset the form after submission
    this.reset();
});

function validateForm() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');

    for (const input of inputs) {
        if (!input.checkValidity()) {
            return false;
        }
    }

    return true;
}


///////////////////////////////////////////////////////////////////////////////