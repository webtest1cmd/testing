// WhatsApp Integration for Appointment Booking
document.addEventListener('DOMContentLoaded', function() {
    // Get the submit button
    const whatsappSubmitBtn = document.getElementById('whatsapp-submit');
    
    // Check if the button exists
    if (whatsappSubmitBtn) {
        whatsappSubmitBtn.addEventListener('click', function() {
            // Get form values
            const form = document.getElementById('appointment-form');
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const date = document.getElementById('date').value;
            const treatment = document.getElementById('treatment').value;
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Form validation
            if (!name) {
                alert('Please enter your name');
                return;
            }
            
            if (!date) {
                alert('Please select a date');
                return;
            }
            
            if (!phone) {
                alert('Please enter your phone number');
                return;
            }
            
            // Format the date nicely
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Create the WhatsApp message
            let whatsappMessage = `*New Appointment Request*\n\n`;
            whatsappMessage += `*Name:* ${name}\n`;
            whatsappMessage += `*Phone:* ${phone}\n`;
            whatsappMessage += `*Date:* ${formattedDate}\n`;
            whatsappMessage += `*Treatment:* ${treatment}\n`;
            
            if (email) {
                whatsappMessage += `*Email:* ${email}\n`;
            }
            
            if (message) {
                whatsappMessage += `\n*Additional Information:*\n${message}`;
            }
            
            // Replace this with your clinic's WhatsApp number
            const whatsappNumber = '9345597726'; // Format: country code + number without '+' or spaces
            
            // Create the WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');
            
            // Optional: Reset the form after sending
            form.reset();
            
            // Show confirmation message
            alert('Your appointment request has been sent via WhatsApp!');
        });
    } else {
        console.error('WhatsApp submit button not found');
    }
});