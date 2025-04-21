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

// Plan FORM

document.addEventListener('DOMContentLoaded', function () {
    const planModal = document.getElementById('planBookingModal');

    planModal.addEventListener('show.bs.modal', function (event) {
        let button = event.relatedTarget;
        let planName = button.getAttribute('data-plan');

        let input = planModal.querySelector('input[name="plan"]');
        input.value = planName || '';

        // Update modal title too (optional)
        let modalTitle = planModal.querySelector('#planBookingModalLabel');
        modalTitle.textContent = planName ? `Book Your ${planName}` : 'Book Your Plan';
    });
});


document.getElementById('planBookingForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form's natural submit

    // Show loading, hide previous messages
    document.querySelector('#planBookingForm .loading').style.display = 'block';
    document.querySelector('#planBookingForm .error-message').style.display = 'none';
    document.querySelector('#planBookingForm .sent-message').style.display = 'none';

    const formData = new FormData(this);

    fetch('https://api.web3forms.com/submit', { // Replace with your actual endpoint
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.querySelector('#planBookingForm .loading').style.display = 'none';

            if (data.success) {
                document.querySelector('#planBookingForm .sent-message').innerText =
                    'Thank you for submitting details for Arogya Samriddhi health card. Our customer service team will contact you shortly for payment process and explaining further details!';
                document.querySelector('#planBookingForm .sent-message').style.display = 'block';
                document.getElementById('planBookingForm').reset();

                setTimeout(() => {
                    document.querySelector('#planBookingForm .sent-message').style.display = 'none';
                    var modal = bootstrap.Modal.getInstance(document.getElementById('planBookingModal'));
                    modal.hide(); // Auto-close modal after success
                }, 5000);
            } else {
                document.querySelector('#planBookingForm .error-message').innerText =
                    'Error: ' + (data.message || 'Something went wrong.');
                document.querySelector('#planBookingForm .error-message').style.display = 'block';

                setTimeout(() => {
                    document.querySelector('#planBookingForm .error-message').style.display = 'none';
                }, 5000);
            }
        })
        .catch(error => {
            document.querySelector('#planBookingForm .loading').style.display = 'none';
            document.querySelector('#planBookingForm .error-message').innerText =
                'Error: ' + error.message;
            document.querySelector('#planBookingForm .error-message').style.display = 'block';

            setTimeout(() => {
                document.querySelector('#planBookingForm .error-message').style.display = 'none';
            }, 5000);
        });
});

// JOB FORM
document.addEventListener('DOMContentLoaded', function () {
    const jobModal = document.getElementById('jobBookingModal');
    const jobTitleInput = document.getElementById('jobTitleInput');
    const jobModalLabel = document.getElementById('jobBookingModalLabel');

    jobModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const job = button.getAttribute('data-job');
        jobTitleInput.value = job;
        jobModalLabel.textContent = 'Apply for ' + job;
    });
});

document.getElementById('jobBookingForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form's default submission

    // Show loading and hide previous messages
    document.querySelector('#jobBookingForm .loading').style.display = 'block';
    document.querySelector('#jobBookingForm .error-message').style.display = 'none';
    document.querySelector('#jobBookingForm .sent-message').style.display = 'none';

    const formData = new FormData(this);

    fetch('https://api.web3forms.com/submit', {  // Replace this with your actual endpoint if needed
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('#jobBookingForm .loading').style.display = 'none';

        if (data.success) {
            document.querySelector('#jobBookingForm .sent-message').innerText =
                'Your application has been submitted successfully! Our team will contact you shortly.';
            document.querySelector('#jobBookingForm .sent-message').style.display = 'block';
            document.getElementById('jobBookingForm').reset();

            setTimeout(() => {
                document.querySelector('#jobBookingForm .sent-message').style.display = 'none';
                const modal = bootstrap.Modal.getInstance(document.getElementById('jobBookingModal'));
                modal.hide();  // Auto-close modal after success
            }, 5000);
        } else {
            document.querySelector('#jobBookingForm .error-message').innerText =
                'Error: ' + (data.message || 'Something went wrong.');
            document.querySelector('#jobBookingForm .error-message').style.display = 'block';

            setTimeout(() => {
                document.querySelector('#jobBookingForm .error-message').style.display = 'none';
            }, 5000);
        }
    })
    .catch(error => {
        document.querySelector('#jobBookingForm .loading').style.display = 'none';
        document.querySelector('#jobBookingForm .error-message').innerText =
            'Error: ' + error.message;
        document.querySelector('#jobBookingForm .error-message').style.display = 'block';

        setTimeout(() => {
            document.querySelector('#jobBookingForm .error-message').style.display = 'none';
        }, 5000);
    });
});
