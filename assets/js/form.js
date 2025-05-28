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
        // console.log(planName)
        // Update modal title too (optional)
        let modalTitle = planModal.querySelector('#planBookingModalLabel');
        modalTitle.textContent = planName ? `Book Your ${planName}` : 'Book Your Plan';
    });
});


document.getElementById('planBookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const loadingBox = document.querySelector('#planBookingForm .loading');
    const errorBox = document.querySelector('#planBookingForm .error-message');
    const successBox = document.querySelector('#planBookingForm .sent-message');


    loadingBox.style.display = 'block';
    errorBox.style.display = 'none';
    successBox.style.display = 'none';

    const formData = new FormData(this);
    const phone = formData.get('primary_mobile_number');
    const aadhaar = formData.get('primary_aadhar_number');
    const plan = formData.get('plan');

    const phoneRegex = /^[0-9]{10}$/;
    const aadhaarRegex = /^\d{12}$/;

    // Primary person validation
    if (!phoneRegex.test(phone)) {
        errorBox.innerText = 'Please enter a valid 10-digit primary phone number.';
        errorBox.style.display = 'block';
        loadingBox.style.display = 'none';
        return;
    }

    if (!aadhaarRegex.test(aadhaar)) {
        errorBox.innerText = 'Please enter a valid 12-digit primary Aadhaar number.';
        errorBox.style.display = 'block';
        loadingBox.style.display = 'none';
        return;
    }

    // Plan member count validation
    const members = document.querySelectorAll('#memberContainer .member-group');
    const memberTotal = members.length;
    let message = '';
    if (plan === 'Small Family Plan') {
        message = 'Pay Rs. 472 to book your Small Family Plan Now';
    } else if (plan === 'Large Family Plan') {
        message = 'Pay Rs. 708 to book your Big Family Plan Now';
    }

    if (plan === 'Small Family Plan' && memberTotal > 3) {
        errorBox.innerText = 'The Small plan allows up to 3 family members only.';
        errorBox.style.display = 'block';
        loadingBox.style.display = 'none';
        return;
    }

    if (plan === 'Large Family Plan' && memberTotal > 7) {
        errorBox.innerText = 'The Large plan allows up to 7 family members only.';
        errorBox.style.display = 'block';
        loadingBox.style.display = 'none';
        return;
    }

    // Member validation loop
    for (let i = 1; i <= memberTotal; i++) {
        const mobile = formData.get(`member${i}_mobile`);
        const aadhar = formData.get(`member${i}_aadhar`);

        if (mobile && !phoneRegex.test(mobile)) {
            errorBox.innerText = `Member ${i}: Invalid mobile number. Must be 10 digits.`;
            errorBox.style.display = 'block';
            loadingBox.style.display = 'none';
            return;
        }

        if (aadhar && !aadhaarRegex.test(aadhar)) {
            errorBox.innerText = `Member ${i}: Invalid Aadhaar number. Must be 12 digits.`;
            errorBox.style.display = 'block';
            loadingBox.style.display = 'none';
            return;
        }
    }

    // Submit data
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            loadingBox.style.display = 'none';

            if (data.success) {
                successBox.innerText = 'Thank you for submitting your and your family members details. Our team will contact you for payment and other assistance to get your card membership activated.';
                successBox.style.display = 'block';

                // document.getElementById('planBookingForm').reset();
                document.getElementById('memberContainer').innerHTML = '';
                memberCount = 0;

                document.querySelector('#planmodalform').style.display = 'none';
                document.querySelector('#planqrcode').style.display = 'flex';
                document.getElementById('qrtextmessage').textContent = message;

                setTimeout(() => {
                    successBox.style.display = 'none';
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

document.getElementById('backToPlanBtn').addEventListener('click', function () {
    document.querySelector('#planmodalform').style.display = 'block';
    document.querySelector('#planqrcode').style.display = 'none';
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
        // console.log(jobTitleInput, job)
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
