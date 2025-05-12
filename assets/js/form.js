document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = new FormData(this);
    const email = formData.get('email');
    const phone = formData.get('phone');

    // Validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Adjust if needed for country codes

    // Error container
    const errorBox = document.querySelector('.error-message');
    const loadingBox = document.querySelector('.loading');
    const successBox = document.querySelector('.sent-message');

    errorBox.style.display = 'none';
    successBox.style.display = 'none';

    if (!emailRegex.test(email)) {
        errorBox.innerText = 'Please enter a valid email address.';
        errorBox.style.display = 'block';
        return;
    }

    if (!phoneRegex.test(phone)) {
        errorBox.innerText = 'Please enter a valid 10-digit phone number.';
        errorBox.style.display = 'block';
        return;
    }

    // Show the loading indicator
    loadingBox.style.display = 'block';

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            loadingBox.style.display = 'none';

            if (data.success) {
                successBox.innerText = 'Your message has been sent successfully!';
                successBox.style.display = 'block';
                document.getElementById('contactForm').reset();

                setTimeout(() => {
                    successBox.style.display = 'none';
                }, 5000);
            } else {
                errorBox.innerText = 'Error: ' + (data.message || 'Something went wrong');
                errorBox.style.display = 'block';

                setTimeout(() => {
                    errorBox.style.display = 'none';
                }, 5000);
            }
        })
        .catch(error => {
            loadingBox.style.display = 'none';
            errorBox.innerText = 'Error: ' + error.message;
            errorBox.style.display = 'block';

            setTimeout(() => {
                errorBox.style.display = 'none';
            }, 5000);
        });
});

// Plan FORM

document.addEventListener('DOMContentLoaded', function () {
    const planModal = document.getElementById('planBookingModal');

    planModal.addEventListener('show.bs.modal', function (event) {
        let button = event.relatedTarget;
        let planName = button.getAttribute('data-plan');

        let input = document.getElementById('planTitleInput');
        input.value = planName || '';
        console.log(planName)
        // Update modal title too (optional)
        let modalTitle = planModal.querySelector('#planBookingModalLabel');
        modalTitle.textContent = planName ? `Book Your ${planName}` : 'Book Your Plan';
    });
});


document.getElementById('planBookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading, hide previous messages
    const loadingBox = document.querySelector('#planBookingForm .loading');
    const errorBox = document.querySelector('#planBookingForm .error-message');
    const successBox = document.querySelector('#planBookingForm .sent-message');

    loadingBox.style.display = 'block';
    errorBox.style.display = 'none';
    successBox.style.display = 'none';

    const formData = new FormData(this);
    console.log(formData)
    const phone = formData.get('primary_mobile_number');
    const aadhaar = formData.get('primary_aadhar_number');
    const plan = formData.get('plan');

    const phoneRegex = /^[0-9]{10}$/;
    const aadhaarRegex = /^\d{12}$/;

    if (!phoneRegex.test(phone)) {
        errorBox.innerText = 'Please enter a valid 10-digit phone number.';
        errorBox.style.display = 'block';
        loadingBox.style.display = 'none';
        return;
    }

    if (!aadhaarRegex.test(aadhaar)) {
        errorBox.innerText = 'Please enter a valid 12-digit Aadhaar number.';
        errorBox.style.display = 'block';
        loadingBox.style.display = 'none';
        return;
    }

    // Validate number of members based on plan
    const memberCount = document.querySelectorAll('#memberContainer .member-group').length;
    if (plan === 'Small Family Plan' && memberCount > 5) {
        errorBox.innerText = 'The Small plan allows up to 4 family members only.';
        errorBox.style.display = 'block';
        loadingBox.style.display = 'none';
        return;
    }

    if (plan === 'Large Family Plan' && memberCount > 9) {
        errorBox.innerText = 'The Large plan allows up to 8 family members only.';
        errorBox.style.display = 'block';
        loadingBox.style.display = 'none';
        return;
    }

    // Proceed with submission
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            loadingBox.style.display = 'none';

            if (data.success) {
                successBox.innerText = 'Thank you for submitting details for Arogya Samriddhi health card. Our customer service team will contact you shortly!';
                successBox.style.display = 'block';

                document.getElementById('planBookingForm').reset();
                document.getElementById('memberContainer').innerHTML = ''; // Clear dynamic members

                setTimeout(() => {
                    successBox.style.display = 'none';
                    var modal = bootstrap.Modal.getInstance(document.getElementById('planBookingModal'));
                    modal.hide();
                }, 5000);
            } else {
                errorBox.innerText = 'Error: ' + (data.message || 'Something went wrong.');
                errorBox.style.display = 'block';

                setTimeout(() => errorBox.style.display = 'none', 5000);
            }
        })
        .catch(error => {
            loadingBox.style.display = 'none';
            errorBox.innerText = 'Error: ' + error.message;
            errorBox.style.display = 'block';
            setTimeout(() => errorBox.style.display = 'none', 5000);
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
        console.log(jobTitleInput,job)
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
