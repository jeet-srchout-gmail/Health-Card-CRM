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

    formData.delete('access_key');
    formData.append('access_key', '0389886a-5de6-4ef7-a814-a080dadd9208');

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
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
    if (plan === 'Silver Family Plan') {
        message = 'Pay Rs. 472 to book your Silver Family Plan Now';
    } else if (plan === 'Gold Family Plan') {
        message = 'Pay Rs. 708 to book your Big Family Plan Now';
    } else if (plan === 'Platinum Family Plan') {
        message = 'Pay Rs. 1415 to book your Big Family Plan Now';
    }

    if (plan === 'Silver Family Plan' && memberTotal > 3) {
        errorBox.innerText = 'The Silver plan allows up to 3 family members only.';
        errorBox.style.display = 'block';
        loadingBox.style.display = 'none';
        return;
    }

    if (plan === 'Gold Family Plan' && memberTotal > 7) {
        errorBox.innerText = 'The Gold plan allows up to 7 family members only.';
        errorBox.style.display = 'block';
        loadingBox.style.display = 'none';
        return;
    }
    if (plan === 'Paltinum Family Plan' && memberTotal > 5) {
        errorBox.innerText = 'The Gold plan allows up to 5 family members only.';
        errorBox.style.display = 'block';
        loadingBox.style.display = 'none';
        return;
    }

    // Member validation loop
    for (let i = 1; i <= memberTotal; i++) {
        // const mobile = formData.get(`member${i}_mobile`);
        const aadhar = formData.get(`member${i}_aadhar`);

        // if (mobile && !phoneRegex.test(mobile)) {
        //     errorBox.innerText = `Member ${i}: Invalid mobile number. Must be 10 digits.`;
        //     errorBox.style.display = 'block';
        //     loadingBox.style.display = 'none';
        //     return;
        // }

        if (aadhar && !aadhaarRegex.test(aadhar)) {
            errorBox.innerText = `Member ${i}: Invalid Aadhaar number. Must be 12 digits.`;
            errorBox.style.display = 'block';
            loadingBox.style.display = 'none';
            return;
        }
    }
    function downloadAsPdf(formData) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const logoUrl = 'https://arogyasamriddhi.com/assets/img/logo.png';
        const title = 'Arogya Samriddhi';
        const today = new Date().toLocaleDateString('en-IN');

        const renderPDFContent = (startY = 15) => {
            // Add Title and Date
            doc.setFontSize(16);
            doc.text(title, 14, startY);
            doc.setFontSize(10);
            doc.text(`Submission Date: ${today}`, 14, startY + 8);

            // Primary Member Table
            const primaryData = [
                ['Primary Mobile Number', formData.get('primary_mobile_number') || ''],
                ['Primary Aadhaar Number', formData.get('primary_aadhar_number') || ''],
                ['Selected Plan', formData.get('plan') || '']
            ];

            doc.autoTable({
                startY: startY + 12,
                head: [['Field', 'Value']],
                body: primaryData,
                theme: 'grid',
                styles: { fontSize: 10 }
            });

            // Family Members Table
            const memberRows = [];
            let i = 1;
            while (formData.has(`member${i}_name`)) {
                memberRows.push([
                    formData.get(`member${i}_name`) || '',
                    formData.get(`member${i}_aadhar`) || '',
                    formData.get(`member${i}_mobile`) || ''
                ]);
                i++;
            }

            if (memberRows.length > 0) {
                const nextY = doc.lastAutoTable.finalY + 10;
                doc.setFontSize(12);
                doc.text('Family Members', 14, nextY);
                doc.autoTable({
                    startY: nextY + 5,
                    head: [['Name', 'Aadhaar Number', 'Mobile Number']],
                    body: memberRows,
                    theme: 'striped',
                    styles: { fontSize: 10 }
                });
            }

            doc.save('PlanSubmissionDetails.pdf');
        };

        // Try loading image, if fails -> skip logo
        const img = new Image();
        img.src = logoUrl;
        img.onload = function () {
            doc.addImage(img, 'PNG', 150, 10, 40, 30);
            renderPDFContent(30); // Adjusted startY after image
        };
        img.onerror = function () {
            console.warn('Logo failed to load. Proceeding without image.');
            renderPDFContent(); // Default startY
        };
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
                formData.delete('access_key');
                formData.append('access_key', '0389886a-5de6-4ef7-a814-a080dadd9208');

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
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

                // downloading the data
                downloadAsPdf(formData);


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
                formData.delete('access_key');
                formData.append('access_key', '0389886a-5de6-4ef7-a814-a080dadd9208');

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
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
