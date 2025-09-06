/**
 * EventHub - Profile Management JavaScript
 * Handles profile settings, tab navigation, and form submissions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize profile functionality
    initProfileTabs();
    initProfileForms();
    initProfileImage();
    initPasswordStrength();
    initTwoFactorAuth();
});

/**
 * Initialize profile tab navigation
 */
function initProfileTabs() {
    const tabLinks = document.querySelectorAll('.profile-nav a');
    const tabContents = document.querySelectorAll('.profile-tab');
    
    if (tabLinks.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tabs and links
                tabLinks.forEach(l => l.classList.remove('active'));
                tabContents.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Show the corresponding tab content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                
                // Update URL hash
                window.location.hash = tabId;
            });
        });
        
        // Check for hash in URL and activate corresponding tab
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const tabLink = document.querySelector(`.profile-nav a[data-tab="${hash}"]`);
            if (tabLink) {
                tabLink.click();
            }
        }
    }
}

/**
 * Initialize profile forms submission
 */
function initProfileForms() {
    // Account form
    const accountForm = document.getElementById('account-form');
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would submit the form data to the server
            // For demo purposes, we'll just show a notification
            showNotification('Profile updated successfully!', 'success');
        });
    }
    
    // Security form
    const securityForm = document.getElementById('security-form');
    if (securityForm) {
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Simple validation
            if (!currentPassword) {
                showNotification('Please enter your current password', 'error');
                return;
            }
            
            if (!newPassword) {
                showNotification('Please enter a new password', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match', 'error');
                return;
            }
            
            // In a real application, you would submit the form data to the server
            // For demo purposes, we'll just show a notification
            showNotification('Password updated successfully!', 'success');
            
            // Clear form
            this.reset();
        });
    }
    
    // Notifications form
    const notificationsForm = document.getElementById('notifications-form');
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would submit the form data to the server
            // For demo purposes, we'll just show a notification
            showNotification('Notification preferences updated!', 'success');
        });
    }
}

/**
 * Initialize profile image upload
 */
function initProfileImage() {
    const avatarInput = document.getElementById('avatar-input');
    const profilePicture = document.getElementById('profile-picture');
    
    if (avatarInput && profilePicture) {
        avatarInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    profilePicture.src = e.target.result;
                };
                
                reader.readAsDataURL(this.files[0]);
                
                // In a real application, you would upload the image to the server
                // For demo purposes, we'll just show a notification
                showNotification('Profile picture updated!', 'success');
            }
        });
    }
}

/**
 * Initialize password strength meter
 */
function initPasswordStrength() {
    const passwordInput = document.getElementById('new-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthValue = document.getElementById('strength-value');
    
    if (passwordInput && strengthBar && strengthValue) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Update strength bar width and color
            strengthBar.style.width = `${strength.score * 25}%`;
            strengthBar.className = 'strength-bar ' + strength.level;
            
            // Update strength text
            strengthValue.textContent = strength.level.charAt(0).toUpperCase() + strength.level.slice(1);
        });
    }
}

/**
 * Calculate password strength
 * @param {string} password - The password to evaluate
 * @returns {object} - Object containing score (0-4) and level (weak, medium, strong, very-strong)
 */
function calculatePasswordStrength(password) {
    // Default to weak
    let score = 0;
    let level = 'weak';
    
    if (!password) {
        return { score, level: 'none' };
    }
    
    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    
    // Complexity checks
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++; // Has uppercase and lowercase
    if (/\d/.test(password)) score++; // Has numbers
    if (/[^a-zA-Z\d]/.test(password)) score++; // Has special characters
    
    // Determine level based on score
    if (score >= 4) {
        level = 'very-strong';
    } else if (score >= 3) {
        level = 'strong';
    } else if (score >= 2) {
        level = 'medium';
    }
    
    return { score, level };
}

/**
 * Initialize two-factor authentication toggle
 */
function initTwoFactorAuth() {
    const twoFactorToggle = document.getElementById('two-factor');
    const twoFactorSetup = document.querySelector('.two-factor-setup');
    
    if (twoFactorToggle && twoFactorSetup) {
        twoFactorToggle.addEventListener('change', function() {
            if (this.checked) {
                twoFactorSetup.style.display = 'block';
            } else {
                twoFactorSetup.style.display = 'none';
            }
        });
    }
}

/**
 * Show a notification message
 * @param {string} message - The notification message
 * @param {string} type - The notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add notification to the DOM
    document.body.appendChild(notification);
    
    // Add active class after a short delay (for animation)
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}