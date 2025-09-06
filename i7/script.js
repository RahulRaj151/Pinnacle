document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initModals();
    initCalendar();
    initTestimonialSlider();
    initFormValidation();
    initEventPreview();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Clone navigation and auth buttons for mobile
                if (mainNav) {
                    const navClone = mainNav.cloneNode(true);
                    mobileMenu.appendChild(navClone);
                }
                
                if (authButtons) {
                    const authClone = authButtons.cloneNode(true);
                    mobileMenu.appendChild(authClone);
                }
                
                // Add close button
                const closeBtn = document.createElement('button');
                closeBtn.className = 'mobile-close-btn';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                closeBtn.addEventListener('click', function() {
                    document.body.classList.remove('mobile-menu-open');
                });
                
                mobileMenu.appendChild(closeBtn);
                document.body.appendChild(mobileMenu);
                
                // Add styles for mobile menu
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-menu {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: var(--bg-light);
                        z-index: 1001;
                        padding: 2rem;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                        overflow-y: auto;
                    }
                    
                    .mobile-menu-open .mobile-menu {
                        transform: translateX(0);
                    }
                    
                    .mobile-close-btn {
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                    }
                    
                    .mobile-menu .main-nav ul {
                        flex-direction: column;
                        gap: 1rem;
                        margin-bottom: 2rem;
                    }
                    
                    .mobile-menu .auth-buttons {
                        flex-direction: column;
                        gap: 1rem;
                        width: 100%;
                    }
                    
                    .mobile-menu .auth-buttons .btn {
                        width: 100%;
                    }
                `;
                
                document.head.appendChild(style);
            }
            
            // Toggle mobile menu
            document.body.classList.toggle('mobile-menu-open');
        });
    }
}

// Modal Handling
function initModals() {
    // Login modal
    const loginModal = document.getElementById('login-modal');
    const loginBtn = document.querySelector('.btn-login');
    const signupLink = document.querySelector('.signup-link a');
    
    // Signup modal
    const signupModal = document.getElementById('signup-modal');
    const signupBtn = document.querySelector('.btn-primary');
    const loginLink = document.querySelector('.login-link a');
    
    // Close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Open login modal
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'flex';
        });
    }
    
    // Open signup modal
    if (signupBtn && signupModal) {
        signupBtn.addEventListener('click', function(e) {
            // Only open modal if it's the signup button in the header
            if (e.target.closest('.auth-buttons')) {
                e.preventDefault();
                signupModal.style.display = 'flex';
            }
        });
    }
    
    // Switch between modals
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            signupModal.style.display = 'flex';
        });
    }
    
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }
    
    // Close modals
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Calendar Generation
function initCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    
    if (!calendarGrid || !currentMonthElement) return;
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Sample events data (in a real app, this would come from a database)
    const events = [
        {
            id: 1,
            title: 'Tech Conference 2023',
            date: new Date(2023, 5, 15), // June 15, 2023
            location: 'Convention Center, New York',
            time: '9:00 AM - 5:00 PM'
        },
        {
            id: 2,
            title: 'Marketing Workshop',
            date: new Date(2023, 5, 22), // June 22, 2023
            location: 'Business Center, Chicago',
            time: '1:00 PM - 4:00 PM'
        },
        {
            id: 3,
            title: 'Networking Mixer',
            date: new Date(2023, 5, 30), // June 30, 2023
            location: 'Skyline Lounge, San Francisco',
            time: '6:00 PM - 9:00 PM'
        },
        {
            id: 4,
            title: 'Product Launch',
            date: new Date(2023, 5, 10), // June 10, 2023
            location: 'Innovation Hub, Boston',
            time: '10:00 AM - 12:00 PM'
        },
        {
            id: 5,
            title: 'Design Thinking Workshop',
            date: new Date(2023, 5, 18), // June 18, 2023
            location: 'Creative Studio, Austin',
            time: '2:00 PM - 5:00 PM'
        }
    ];
    
    // Generate calendar
    function generateCalendar(month, year) {
        // Clear previous calendar
        calendarGrid.innerHTML = '';
        
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Get days from previous month
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Calculate total cells needed (previous month days + current month days + next month days)
        const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
        
        // Generate calendar cells
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'calendar-day';
            
            // Calculate day number
            let dayNumber;
            let isCurrentMonth = true;
            
            if (i < firstDay) {
                // Previous month days
                dayNumber = daysInPrevMonth - (firstDay - i - 1);
                cell.classList.add('other-month');
                isCurrentMonth = false;
            } else if (i >= firstDay + daysInMonth) {
                // Next month days
                dayNumber = i - (firstDay + daysInMonth) + 1;
                cell.classList.add('other-month');
                isCurrentMonth = false;
            } else {
                // Current month days
                dayNumber = i - firstDay + 1;
                
                // Check if it's today
                const today = new Date();
                if (dayNumber === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    cell.classList.add('today');
                }
            }
            
            // Add day number
            const dayElement = document.createElement('div');
            dayElement.className = 'day-number';
            dayElement.textContent = dayNumber;
            cell.appendChild(dayElement);
            
            // Add events for this day
            const dayEvents = document.createElement('div');
            dayEvents.className = 'day-events';
            
            // Find events for this day
            if (isCurrentMonth) {
                const dayDate = new Date(year, month, dayNumber);
                const eventsForDay = events.filter(event => {
                    return event.date.getDate() === dayDate.getDate() && 
                           event.date.getMonth() === dayDate.getMonth() && 
                           event.date.getFullYear() === dayDate.getFullYear();
                });
                
                // Add event indicators
                eventsForDay.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'day-event';
                    eventElement.textContent = event.title;
                    eventElement.setAttribute('data-event-id', event.id);
                    dayEvents.appendChild(eventElement);
                });
            }
            
            cell.appendChild(dayEvents);
            calendarGrid.appendChild(cell);
        }
    }
    
    // Initialize calendar with current month
    generateCalendar(currentMonth, currentYear);
    
    // Previous month button
    if (prevMonthButton) {
        prevMonthButton.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    // Next month button
    if (nextMonthButton) {
        nextMonthButton.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (!testimonialSlider || testimonialSlides.length === 0) return;
    
    let currentSlide = 0;
    
    // Hide all slides except the first one
    testimonialSlides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Show the selected slide
        testimonialSlides[index].style.display = 'block';
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Previous button
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = testimonialSlides.length - 1;
            }
            showSlide(newIndex);
        });
    }
    
    // Next button
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            let newIndex = currentSlide + 1;
            if (newIndex >= testimonialSlides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialSlides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }, 5000);
}

// Form Validation
function initFormValidation() {
    const eventForm = document.getElementById('event-form');
    const contactForm = document.getElementById('contact-form');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Validate event form
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const eventName = document.getElementById('event-name');
            const eventDate = document.getElementById('event-date');
            const eventLocation = document.getElementById('event-location');
            const eventDescription = document.getElementById('event-description');
            const eventCategory = document.getElementById('event-category');
            
            // Reset previous error messages
            const errorMessages = eventForm.querySelectorAll('.error-message');
            errorMessages.forEach(message => message.remove());
            
            // Validate required fields
            if (!eventName.value.trim()) {
                showError(eventName, 'Event name is required');
                isValid = false;
            }
            
            if (!eventDate.value) {
                showError(eventDate, 'Date is required');
                isValid = false;
            }
            
            if (!eventLocation.value.trim()) {
                showError(eventLocation, 'Location is required');
                isValid = false;
            }
            
            if (!eventDescription.value.trim()) {
                showError(eventDescription, 'Description is required');
                isValid = false;
            }
            
            if (!eventCategory.value) {
                showError(eventCategory, 'Please select a category');
                isValid = false;
            }
            
            if (isValid) {
                // In a real app, this would submit the form data to a server
                showNotification('Event saved successfully!', 'success');
                eventForm.reset();
            }
        });
    }
    
    // Validate contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Reset previous error messages
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(message => message.remove());
            
            // Validate required fields
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!subject.value.trim()) {
                showError(subject, 'Subject is required');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // In a real app, this would submit the form data to a server
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            }
        });
    }
    
    // Validate login form
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const email = document.getElementById('login-email');
            const password = document.getElementById('login-password');
            
            // Reset previous error messages
            const errorMessages = loginForm.querySelectorAll('.error-message');
            errorMessages.forEach(message => message.remove());
            
            // Validate required fields
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!password.value) {
                showError(password, 'Password is required');
                isValid = false;
            }
            
            if (isValid) {
                // In a real app, this would authenticate the user
                showNotification('Login successful!', 'success');
                loginForm.reset();
                document.getElementById('login-modal').style.display = 'none';
            }
        });
    }
    
    // Validate signup form
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('signup-name');
            const email = document.getElementById('signup-email');
            const password = document.getElementById('signup-password');
            const confirmPassword = document.getElementById('signup-confirm');
            const terms = document.getElementById('terms');
            
            // Reset previous error messages
            const errorMessages = signupForm.querySelectorAll('.error-message');
            errorMessages.forEach(message => message.remove());
            
            // Validate required fields
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!password.value) {
                showError(password, 'Password is required');
                isValid = false;
            } else if (password.value.length < 8) {
                showError(password, 'Password must be at least 8 characters');
                isValid = false;
            }
            
            if (!confirmPassword.value) {
                showError(confirmPassword, 'Please confirm your password');
                isValid = false;
            } else if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Passwords do not match');
                isValid = false;
            }
            
            if (!terms.checked) {
                showError(terms, 'You must agree to the Terms of Service');
                isValid = false;
            }
            
            if (isValid) {
                // In a real app, this would register the user
                showNotification('Account created successfully!', 'success');
                signupForm.reset();
                document.getElementById('signup-modal').style.display = 'none';
            }
        });
    }
    
    // Helper function to show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group') || input.closest('.form-options');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error-color)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = '0.25rem';
        formGroup.appendChild(errorElement);
        
        // Highlight the input
        if (input.type !== 'checkbox') {
            input.style.borderColor = 'var(--error-color)';
        }
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Event Preview
function initEventPreview() {
    const eventNameInput = document.getElementById('event-name');
    const eventDateInput = document.getElementById('event-date');
    const eventTimeInput = document.getElementById('event-time');
    const eventLocationInput = document.getElementById('event-location');
    
    // Preview elements
    const previewTitle = document.querySelector('.event-title');
    const previewDate = document.querySelector('.event-date');
    const previewLocation = document.querySelector('.event-location');
    
    // Update preview when inputs change
    if (eventNameInput && previewTitle) {
        eventNameInput.addEventListener('input', function() {
            previewTitle.textContent = eventNameInput.value || 'Tech Conference 2023';
        });
    }
    
    if (eventDateInput && eventTimeInput && previewDate) {
        const updateDateTime = function() {
            let dateText = 'Jun 15, 2023';
            let timeText = '6:00 PM';
            
            if (eventDateInput.value) {
                const date = new Date(eventDateInput.value);
                const options = { month: 'short', day: 'numeric', year: 'numeric' };
                dateText = date.toLocaleDateString('en-US', options);
            }
            
            if (eventTimeInput.value) {
                const timeParts = eventTimeInput.value.split(':');
                let hours = parseInt(timeParts[0]);
                const minutes = timeParts[1];
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12 || 12;
                timeText = `${hours}:${minutes} ${ampm}`;
            }
            
            previewDate.textContent = `${dateText} • ${timeText}`;
        };
        
        eventDateInput.addEventListener('input', updateDateTime);
        eventTimeInput.addEventListener('input', updateDateTime);
    }
    
    if (eventLocationInput && previewLocation) {
        eventLocationInput.addEventListener('input', function() {
            const locationText = eventLocationInput.value || 'Convention Center, New York';
            previewLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${locationText}`;
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
    
    const container = document.querySelector('.notification-container');
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${getIconForType(type)}"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Style the notification
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.padding = '1rem';
    notification.style.backgroundColor = 'white';
    notification.style.borderRadius = 'var(--border-radius-md)';
    notification.style.boxShadow = 'var(--shadow-md)';
    notification.style.marginBottom = '1rem';
    notification.style.transform = 'translateX(120%)';
    notification.style.transition = 'transform 0.3s ease';
    notification.style.overflow = 'hidden';
    notification.style.borderLeft = `4px solid ${getColorForType(type)}`;
    
    // Style the icon
    const iconDiv = notification.querySelector('.notification-icon');
    iconDiv.style.marginRight = '1rem';
    iconDiv.style.color = getColorForType(type);
    
    // Style the close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.marginLeft = 'auto';
    closeButton.style.color = 'var(--text-light)';
    
    // Add to container
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close button functionality
    closeButton.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    function closeNotification(notification) {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    function getIconForType(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }
    
    function getColorForType(type) {
        switch (type) {
            case 'success': return 'var(--success-color)';
            case 'error': return 'var(--error-color)';
            case 'warning': return 'var(--warning-color)';
            default: return 'var(--info-color)';
        }
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.main-nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
        header.style.height = '70px';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
        header.style.height = 'var(--header-height)';
    }
});

// Add ticket type button
const addTicketButton = document.querySelector('.ticket-option + .btn-small');
if (addTicketButton) {
    addTicketButton.addEventListener('click', function() {
        const ticketOption = document.querySelector('.ticket-option');
        const newTicketOption = ticketOption.cloneNode(true);
        
        // Clear input values
        newTicketOption.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        
        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'btn-remove';
        removeButton.innerHTML = '<i class="fas fa-times"></i>';
        removeButton.style.background = 'none';
        removeButton.style.border = 'none';
        removeButton.style.color = 'var(--error-color)';
        removeButton.style.cursor = 'pointer';
        
        removeButton.addEventListener('click', function() {
            newTicketOption.remove();
        });
        
        newTicketOption.appendChild(removeButton);
        
        // Insert before the add button
        ticketOption.parentNode.insertBefore(newTicketOption, addTicketButton);
    });
}