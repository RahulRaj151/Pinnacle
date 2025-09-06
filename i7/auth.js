/**
 * Authentication System for Event Organizer Website
 * Handles user registration, login, password recovery, and session management
 */

document.addEventListener('DOMContentLoaded', function() {
    initAuthSystem();
});

function initAuthSystem() {
    // Initialize Firebase Authentication (in a real app)
    // For demo purposes, we'll use localStorage to simulate user authentication
    setupAuthListeners();
    checkAuthStatus();
}

/**
 * Set up event listeners for authentication forms and buttons
 */
function setupAuthListeners() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Password reset form
    const resetForm = document.getElementById('reset-form');
    if (resetForm) {
        resetForm.addEventListener('submit', handlePasswordReset);
    }
    
    // Password reset link in login form
    const resetLink = document.querySelector('.reset-link a');
    if (resetLink) {
        resetLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPasswordResetModal();
        });
    }
}

/**
 * Check if user is logged in and update UI accordingly
 */
function checkAuthStatus() {
    const currentUser = getCurrentUser();
    updateUIForAuthState(currentUser);
}

/**
 * Handle login form submission
 */
function handleLogin(e) {
    e.preventDefault();
    
    // Get form inputs
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me')?.checked || false;
    
    // Validate inputs
    if (!email || !password) {
        showAuthError('Please enter both email and password');
        return;
    }
    
    // In a real app, this would call an authentication API
    // For demo purposes, we'll simulate authentication with localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        loginUser(user, rememberMe);
        closeAuthModals();
        showNotification('Login successful!', 'success');
    } else {
        // Login failed
        showAuthError('Invalid email or password');
    }
}

/**
 * Handle signup form submission
 */
function handleSignup(e) {
    e.preventDefault();
    
    // Get form inputs
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    const terms = document.getElementById('terms')?.checked || false;
    
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
        showAuthError('Please fill in all required fields');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthError('Passwords do not match');
        return;
    }
    
    if (!terms) {
        showAuthError('You must agree to the Terms of Service');
        return;
    }
    
    // In a real app, this would call an authentication API
    // For demo purposes, we'll simulate user registration with localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
        showAuthError('An account with this email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        id: generateUserId(),
        name,
        email,
        password, // In a real app, this would be hashed
        created: new Date().toISOString(),
        role: 'user'
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log in the new user
    loginUser(newUser, false);
    closeAuthModals();
    showNotification('Account created successfully!', 'success');
}

/**
 * Handle logout button click
 */
function handleLogout(e) {
    if (e) e.preventDefault();
    
    // Clear session
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    
    // Update UI
    updateUIForAuthState(null);
    showNotification('You have been logged out', 'info');
    
    // Redirect to home page if on a protected page
    const protectedPages = ['dashboard.html', 'create-event.html', 'my-events.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        window.location.href = 'index.html';
    }
}

/**
 * Handle password reset form submission
 */
function handlePasswordReset(e) {
    e.preventDefault();
    
    const email = document.getElementById('reset-email').value;
    
    if (!email) {
        showAuthError('Please enter your email address');
        return;
    }
    
    // In a real app, this would send a password reset email
    // For demo purposes, we'll just show a success message
    showNotification('Password reset instructions sent to your email', 'success');
    closeAuthModals();
}

/**
 * Log in a user and save their session
 */
function loginUser(user, rememberMe) {
    // Remove password from stored user object for security
    const userToStore = { ...user };
    delete userToStore.password;
    
    // Store user in session or local storage based on remember me option
    if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
    } else {
        sessionStorage.setItem('currentUser', JSON.stringify(userToStore));
    }
    
    // Update UI for logged in state
    updateUIForAuthState(userToStore);
}

/**
 * Get the current logged in user
 */
function getCurrentUser() {
    // Check session storage first, then local storage
    const sessionUser = sessionStorage.getItem('currentUser');
    const localUser = localStorage.getItem('currentUser');
    
    if (sessionUser) {
        return JSON.parse(sessionUser);
    } else if (localUser) {
        return JSON.parse(localUser);
    }
    
    return null;
}

/**
 * Update UI elements based on authentication state
 */
function updateUIForAuthState(user) {
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    const userNameElement = document.querySelector('.user-name');
    const protectedElements = document.querySelectorAll('.auth-protected');
    const guestElements = document.querySelectorAll('.guest-only');
    
    if (user) {
        // User is logged in
        if (authButtons) authButtons.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'flex';
            if (userNameElement) userNameElement.textContent = user.name;
        }
        
        // Show protected elements
        protectedElements.forEach(el => el.style.display = '');
        
        // Hide guest-only elements
        guestElements.forEach(el => el.style.display = 'none');
        
        // Update dashboard link if it exists
        const dashboardLink = document.getElementById('dashboard-link');
        if (dashboardLink) {
            dashboardLink.href = 'dashboard.html';
        }
    } else {
        // User is not logged in
        if (authButtons) authButtons.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
        
        // Hide protected elements
        protectedElements.forEach(el => el.style.display = 'none');
        
        // Show guest-only elements
        guestElements.forEach(el => el.style.display = '');
    }
}

/**
 * Show an error message in the auth form
 */
function showAuthError(message) {
    // Find the active modal
    const activeModal = document.querySelector('.modal[style*="display: flex"]');
    if (!activeModal) return;
    
    // Find or create error message container
    let errorContainer = activeModal.querySelector('.auth-error');
    
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'auth-error';
        errorContainer.style.color = 'var(--error-color)';
        errorContainer.style.marginBottom = '1rem';
        errorContainer.style.padding = '0.5rem';
        errorContainer.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        errorContainer.style.borderRadius = 'var(--border-radius-sm)';
        
        // Insert at the top of the form
        const form = activeModal.querySelector('form');
        if (form) {
            form.insertBefore(errorContainer, form.firstChild);
        }
    }
    
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    
    // Hide error after 5 seconds
    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 5000);
}

/**
 * Close all authentication modals
 */
function closeAuthModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

/**
 * Show password reset modal
 */
function showPasswordResetModal() {
    // Close other modals
    closeAuthModals();
    
    // Check if reset modal exists
    let resetModal = document.getElementById('reset-modal');
    
    if (!resetModal) {
        // Create reset modal if it doesn't exist
        resetModal = document.createElement('div');
        resetModal.id = 'reset-modal';
        resetModal.className = 'modal';
        resetModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Reset Password</h2>
                <form id="reset-form">
                    <div class="form-group">
                        <label for="reset-email">Email</label>
                        <input type="email" id="reset-email" placeholder="Enter your email" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Reset Link</button>
                </form>
                <div class="login-link">
                    <p>Remember your password? <a href="#">Log in</a></p>
                </div>
            </div>
        `;
        
        document.body.appendChild(resetModal);
        
        // Add event listeners
        const closeBtn = resetModal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            resetModal.style.display = 'none';
        });
        
        const loginLink = resetModal.querySelector('.login-link a');
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            resetModal.style.display = 'none';
            const loginModal = document.getElementById('login-modal');
            if (loginModal) loginModal.style.display = 'flex';
        });
        
        const resetForm = resetModal.querySelector('#reset-form');
        resetForm.addEventListener('submit', handlePasswordReset);
    }
    
    // Show the modal
    resetModal.style.display = 'flex';
}

/**
 * Generate a unique user ID
 */
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Check if a route is protected and redirect if necessary
 */
function checkProtectedRoute() {
    const protectedPages = ['dashboard.html', 'create-event.html', 'my-events.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        const currentUser = getCurrentUser();
        
        if (!currentUser) {
            // Redirect to login page
            window.location.href = 'index.html';
            // We'll show the login modal after redirect
            sessionStorage.setItem('showLogin', 'true');
        }
    }
    
    // Check if we need to show login modal
    if (sessionStorage.getItem('showLogin') === 'true') {
        sessionStorage.removeItem('showLogin');
        setTimeout(() => {
            const loginModal = document.getElementById('login-modal');
            if (loginModal) loginModal.style.display = 'flex';
        }, 500);
    }
}

// Check protected routes on page load
checkProtectedRoute();

// Export functions for use in other scripts
window.authSystem = {
    getCurrentUser,
    handleLogout,
    checkAuthStatus,
    showPasswordResetModal
};