document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Show the loading indicator
    document.querySelector('.loading').style.display = 'block';
    document.querySelector('.error-message').style.display = 'none'; // Hide error message initially
    document.querySelector('.sent-message').style.display = 'none'; // Hide success message initially

    // Collect form data
    const formData = new FormData(this);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            document.querySelector('.loading').style.display = 'none'; // Hide loading indicator

            if (data.success) {
                document.querySelector('.sent-message').innerText = 'Your message has been sent successfully!';
                document.querySelector('.sent-message').style.display = 'block'; // Show success message
                document.getElementById('contactForm').reset();

                setTimeout(() => {
                    document.querySelector('.sent-message').style.display = 'none';
                }, 5000); // Hide after 5 seconds
            } else {
                document.querySelector('.error-message').innerText = 'Error: ' + (data.message || 'Something went wrong');
                document.querySelector('.error-message').style.display = 'block'; // Show error message

                setTimeout(() => {
                    document.querySelector('.error-message').style.display = 'none';
                }, 5000); // Hide after 5 seconds
            }
        })
        .catch(error => {
            document.querySelector('.loading').style.display = 'none'; // Hide loading indicator
            document.querySelector('.error-message').innerText = 'Error: ' + error.message;
            document.querySelector('.error-message').style.display = 'block'; // Show error message

            setTimeout(() => {
                document.querySelector('.error-message').style.display = 'none';
            }, 5000);
        });
});




