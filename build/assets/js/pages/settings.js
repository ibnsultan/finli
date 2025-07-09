// Settings-specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize settings components
    initSettingsComponents();
});

// Settings-specific components
function initSettingsComponents() {
    // Initialize settings-specific interactive components
    initSettingsNavigation();
    initProfileForm();
    initUpgradeSettings();
    initFormValidation();
}

function initSettingsNavigation() {
    // Handle settings menu navigation
    const settingsMenuItems = document.querySelectorAll('.settings-menu-item');
    settingsMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active state from all items
            settingsMenuItems.forEach(menuItem => {
                menuItem.classList.remove('bg-blue-50', 'text-blue-600');
                menuItem.classList.add('hover:bg-gray-50');
            });
            
            // Add active state to clicked item
            this.classList.add('bg-blue-50', 'text-blue-600');
            this.classList.remove('hover:bg-gray-50');
            
            // Handle menu item actions
            const menuText = this.textContent.trim();
            console.log('Settings menu clicked:', menuText);
            
            // You can add specific logic for each menu item here
            handleSettingsMenuAction(menuText);
        });
    });
}

function handleSettingsMenuAction(menuText) {
    switch(menuText) {
        case 'Edit Profile':
            // Focus on profile form
            const firstNameInput = document.querySelector('input[placeholder*="name"]');
            if (firstNameInput) firstNameInput.focus();
            break;
        case 'Password & Security':
            // Show password change modal or redirect
            console.log('Password & Security clicked');
            break;
        case 'Billing & Subscription':
            // Show billing information
            console.log('Billing & Subscription clicked');
            break;
        case 'Privacy Policy':
            // Open privacy policy
            console.log('Privacy Policy clicked');
            break;
        case 'FAQs':
            // Open FAQs
            console.log('FAQs clicked');
            break;
        case 'Terms & Conditions':
            // Open terms and conditions
            console.log('Terms & Conditions clicked');
            break;
        default:
            console.log('Unknown menu item:', menuText);
    }
}

function initProfileForm() {
    // Handle profile form interactions
    const form = document.querySelector('.profile-form');
    const saveBtn = document.querySelector('.save-btn');
    const discardBtn = document.querySelector('.discard-btn');
    const photoUploadBtn = document.querySelector('.photo-upload-btn');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSaveProfile();
        });
    }
    
    if (discardBtn) {
        discardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleDiscardChanges();
        });
    }
    
    if (photoUploadBtn) {
        photoUploadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handlePhotoUpload();
        });
    }
    
    // Track form changes
    const formInputs = document.querySelectorAll('.profile-form input');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Enable save button when changes are made
            if (saveBtn) {
                saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                saveBtn.disabled = false;
            }
        });
    });
}

function handleSaveProfile() {
    // Collect form data
    const formData = {
        firstName: document.querySelector('input[placeholder*="first name" i]')?.value || '',
        lastName: document.querySelector('input[placeholder*="last name" i]')?.value || '',
        email: document.querySelector('input[placeholder*="email" i]')?.value || '',
        phone: document.querySelector('input[placeholder*="phone" i]')?.value || '',
        country: document.querySelector('input[placeholder*="country" i]')?.value || '',
        city: document.querySelector('input[placeholder*="city" i]')?.value || '',
        address: document.querySelector('input[placeholder*="address" i]')?.value || '',
        zipCode: document.querySelector('input[placeholder*="zip" i]')?.value || ''
    };
    
    console.log('Saving profile:', formData);
    
    // Add your save logic here
    // For now, just show a success message
    showMessage('Profile saved successfully!', 'success');
}

function handleDiscardChanges() {
    // Reset form to original values
    const formInputs = document.querySelectorAll('.profile-form input');
    formInputs.forEach(input => {
        input.value = input.defaultValue || '';
    });
    
    // Disable save button
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
        saveBtn.disabled = true;
    }
    
    showMessage('Changes discarded', 'info');
}

function handlePhotoUpload() {
    // Create a file input and trigger it
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Here you would typically upload the file to your server
            // For now, just show it as a preview
            const reader = new FileReader();
            reader.onload = function(e) {
                const profileImg = document.querySelector('.profile-image');
                if (profileImg) {
                    profileImg.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
            
            showMessage('Profile photo updated!', 'success');
        }
    });
    
    fileInput.click();
}

function initUpgradeSettings() {
    // Handle upgrade button in settings
    const upgradeBtn = document.querySelector('.settings-upgrade-btn');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add upgrade logic here
            console.log('Settings upgrade clicked');
            showMessage('Redirecting to upgrade page...', 'info');
        });
    }
}

function initFormValidation() {
    // Add real-time form validation
    const emailInput = document.querySelector('input[type="email"]');
    const phoneInput = document.querySelector('input[type="tel"]');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this);
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            validatePhone(this);
        });
    }
}

function validateEmail(input) {
    const email = input.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        showFieldError(input, 'Please enter a valid email address');
    } else {
        clearFieldError(input);
    }
}

function validatePhone(input) {
    const phone = input.value;
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    
    if (phone && !phoneRegex.test(phone)) {
        showFieldError(input, 'Please enter a valid phone number');
    } else {
        clearFieldError(input);
    }
}

function showFieldError(input, message) {
    // Remove existing error
    clearFieldError(input);
    
    // Add error styling
    input.classList.add('border-red-500');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-xs mt-1 field-error';
    errorDiv.textContent = message;
    
    // Insert error message after input
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function clearFieldError(input) {
    // Remove error styling
    input.classList.remove('border-red-500');
    
    // Remove error message
    const errorDiv = input.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showMessage(message, type = 'info') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${getMessageClasses(type)}`;
    messageDiv.textContent = message;
    
    // Add to document
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function getMessageClasses(type) {
    switch(type) {
        case 'success':
            return 'bg-green-100 text-green-800 border border-green-200';
        case 'error':
            return 'bg-red-100 text-red-800 border border-red-200';
        case 'warning':
            return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        default:
            return 'bg-blue-100 text-blue-800 border border-blue-200';
    }
}
