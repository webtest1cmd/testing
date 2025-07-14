/**
 * Nizmed ENT Licensing System
 * Displays creator details when a specific secret key is entered
 * Created for Nizmed ENT Clinic
 */

// Use a self-executing function but expose necessary functions globally
var promptForSecretKey, showLicenseInfo;

(function() {
    // Configuration
    const SECRET_KEY = 'NIZMED2023'; // Your secret key
    const LICENSE_KEY = 'ENT-KOVILPATTI-2023'; // Your license key
    const CREATOR_DETAILS = {
        name: 'NexSway',
        title: 'Developer',
        clinic: 'Nizmed ENT Clinic',
        address: '8-A, Park E Rd, Indira Nagar, Verravanchi Nagar, Kovilpatti, Tamil Nadu 628501',
        contact: '9345597726',
        email: 'nexsway.dev@gmail.com',
        website: 'nizmedent.com',
        copyright: '© ' + new Date().getFullYear() + ' Nizmed ENT. All rights reserved.',
        developer: 'NexSway',
        lastUpdated: new Date().toLocaleDateString()
    };
    
    // Track entered keys for secret key detection
    let enteredKeys = '';
    const maxKeyLength = 20; // Maximum buffer size to prevent memory issues
    
    // Listen for key down events to capture secret key
    document.addEventListener('keydown', function(event) {
        // Only track alphanumeric keys and some special characters
        if (event.key.length === 1 && /[a-zA-Z0-9]/.test(event.key)) {
            // Add the key to our buffer
            enteredKeys += event.key;
            
            // Trim the buffer if it gets too long
            if (enteredKeys.length > maxKeyLength) {
                enteredKeys = enteredKeys.substring(enteredKeys.length - maxKeyLength);
            }
            
            // Check if the secret key is in the buffer
            if (enteredKeys.toUpperCase().includes(SECRET_KEY)) {
                // Clear the buffer after a match
                enteredKeys = '';
                showLicenseInfo();
            }
        }
    });
    
    // Also keep the Ctrl+Alt+L shortcut as a backup method
    let keyState = {
        ctrl: false,
        alt: false
    };
    
    document.addEventListener('keydown', function(event) {
        // Update key state
        if (event.key === 'Control') keyState.ctrl = true;
        if (event.key === 'Alt') keyState.alt = true;
        
        // Check if the trigger combination is pressed
        if (keyState.ctrl && keyState.alt && event.key.toLowerCase() === 'l') {
            promptForSecretKey();
        }
    });
    
    // Listen for key up events
    document.addEventListener('keyup', function(event) {
        // Update key state
        if (event.key === 'Control') keyState.ctrl = false;
        if (event.key === 'Alt') keyState.alt = false;
    });
    
    // Function to prompt for secret key - exposed globally
    promptForSecretKey = function() {
        const enteredKey = prompt('Enter the secret license key:');
        if (enteredKey && enteredKey.toUpperCase() === SECRET_KEY) {
            showLicenseInfo();
        } else if (enteredKey) {
            alert('Invalid license key!');
        }
    }
    
    // Function to display license information - exposed globally
    showLicenseInfo = function() {
        // Create modal container
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
        modal.style.zIndex = '9999';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        
        // Create license content
        const content = document.createElement('div');
        content.style.backgroundColor = '#fff';
        content.style.padding = '30px';
        content.style.borderRadius = '5px';
        content.style.maxWidth = '500px';
        content.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        content.style.position = 'relative';
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '10px';
        closeBtn.style.right = '10px';
        closeBtn.style.border = 'none';
        closeBtn.style.background = 'none';
        closeBtn.style.fontSize = '24px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.color = '#333';
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Create header
        const header = document.createElement('h2');
        header.textContent = 'License Information';
        header.style.color = '#14b1bb'; // Match Nizmed ENT color scheme
        header.style.marginTop = '0';
        
        // Create license key display
        const licenseKeyDiv = document.createElement('div');
        licenseKeyDiv.style.padding = '10px';
        licenseKeyDiv.style.backgroundColor = '#f5f5f5';
        licenseKeyDiv.style.border = '1px solid #ddd';
        licenseKeyDiv.style.marginBottom = '20px';
        licenseKeyDiv.style.fontFamily = 'monospace';
        licenseKeyDiv.textContent = 'License Key: ' + LICENSE_KEY;
        
        // Create creator details
        const detailsDiv = document.createElement('div');
        
        // Add creator details
        for (const [key, value] of Object.entries(CREATOR_DETAILS)) {
            const detail = document.createElement('p');
            detail.style.margin = '5px 0';
            
            // Format the key with proper capitalization
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
            
            detail.innerHTML = `<strong>${formattedKey}:</strong> ${value}`;
            detailsDiv.appendChild(detail);
        }
        
        // Assemble the modal
        content.appendChild(closeBtn);
        content.appendChild(header);
        content.appendChild(licenseKeyDiv);
        content.appendChild(detailsDiv);
        modal.appendChild(content);
        
        // Add to document
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // Verify license on page load
    window.addEventListener('load', function() {
        console.log('Nizmed ENT - Licensed to: ' + CREATOR_DETAILS.name);
    });
    
    // Expose methods to check if the site is licensed
    window.checkNizmedLicense = function(key) {
        return key === LICENSE_KEY;
    };
    

})();