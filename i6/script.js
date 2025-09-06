// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    // Menu filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // Reservation form
    const reservationForm = document.getElementById('reservation-form');
    const reservationConfirmation = document.getElementById('reservation-confirmation');
    const newReservationBtn = document.getElementById('new-reservation');

    // Events calendar
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    // Testimonials slider
    const prevTestimonialBtn = document.getElementById('prev-testimonial');
    const nextTestimonialBtn = document.getElementById('next-testimonial');
    const testimonialDots = document.querySelectorAll('.dot');

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');

    // Notification
    const notification = document.getElementById('notification');
    const notificationMessage = document.querySelector('.notification-message');
    const notificationIcon = document.querySelector('.notification-icon');
    const notificationClose = document.querySelector('.notification-close');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('#navbar a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Menu filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            menuItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'flex';
                    // Add animation
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Reservation form validation and submission
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const date = document.getElementById('date');
            const time = document.getElementById('time');
            const guests = document.getElementById('guests');
            
            // Validate name
            if (name.value.trim() === '') {
                showError(name, 'Please enter your name');
                isValid = false;
            } else {
                clearError(name);
            }
            
            // Validate email
            if (email.value.trim() === '') {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(email);
            }
            
            // Validate phone
            if (phone.value.trim() === '') {
                showError(phone, 'Please enter your phone number');
                isValid = false;
            } else {
                clearError(phone);
            }
            
            // Validate date
            if (date.value === '') {
                showError(date, 'Please select a date');
                isValid = false;
            } else {
                clearError(date);
            }
            
            // Validate time
            if (time.value === '') {
                showError(time, 'Please select a time');
                isValid = false;
            } else {
                clearError(time);
            }
            
            // Validate guests
            if (guests.value === '') {
                showError(guests, 'Please select number of guests');
                isValid = false;
            } else {
                clearError(guests);
            }
            
            if (isValid) {
                // Show confirmation message
                reservationForm.style.display = 'none';
                reservationConfirmation.style.display = 'flex';
                
                // Show notification
                showNotification('Reservation request submitted successfully!', 'success');
                
                // Reset form
                reservationForm.reset();
            }
        });
    }
    
    // New reservation button
    if (newReservationBtn) {
        newReservationBtn.addEventListener('click', function() {
            reservationConfirmation.style.display = 'none';
            reservationForm.style.display = 'flex';
        });
    }

    // Events Calendar
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Sample events data (in a real application, this would come from a database)
    const events = [
        { date: new Date(2023, 8, 15), title: 'Wine Tasting Evening' },
        { date: new Date(2023, 8, 22), title: 'Chef\'s Table Experience' },
        { date: new Date(2023, 8, 29), title: 'Live Jazz Night' },
        { date: new Date(2023, 9, 8), title: 'Oktoberfest Special' },
        { date: new Date(2023, 9, 20), title: 'Halloween Dinner Party' }
    ];
    
    // Initialize calendar
    if (calendarGrid) {
        generateCalendar(currentMonth, currentYear);
        
        // Previous month button
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });
        
        // Next month button
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    // Generate calendar function
    function generateCalendar(month, year) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        
        // Update current month display
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Clear previous calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('calendar-day', 'day-header');
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            
            // Check if this day has an event
            const currentDateCheck = new Date(year, month, day);
            const hasEvent = events.some(event => 
                event.date.getDate() === currentDateCheck.getDate() && 
                event.date.getMonth() === currentDateCheck.getMonth() && 
                event.date.getFullYear() === currentDateCheck.getFullYear()
            );
            
            if (hasEvent) {
                dayElement.classList.add('has-event');
                dayElement.addEventListener('click', function() {
                    // In a real application, you would show events for this day
                    showNotification('Event details would be shown here', 'info');
                });
            }
            
            // Check if this is today
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }

    // Testimonials slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    // Show only the first testimonial initially
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Previous testimonial button
    if (prevTestimonialBtn) {
        prevTestimonialBtn.addEventListener('click', function() {
            testimonials[currentTestimonial].style.display = 'none';
            testimonialDots[currentTestimonial].classList.remove('active');
            
            currentTestimonial--;
            if (currentTestimonial < 0) {
                currentTestimonial = testimonials.length - 1;
            }
            
            testimonials[currentTestimonial].style.display = 'block';
            testimonialDots[currentTestimonial].classList.add('active');
        });
    }
    
    // Next testimonial button
    if (nextTestimonialBtn) {
        nextTestimonialBtn.addEventListener('click', function() {
            testimonials[currentTestimonial].style.display = 'none';
            testimonialDots[currentTestimonial].classList.remove('active');
            
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            
            testimonials[currentTestimonial].style.display = 'block';
            testimonialDots[currentTestimonial].classList.add('active');
        });
    }
    
    // Testimonial dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            testimonials[currentTestimonial].style.display = 'none';
            testimonialDots[currentTestimonial].classList.remove('active');
            
            currentTestimonial = index;
            
            testimonials[currentTestimonial].style.display = 'block';
            testimonialDots[currentTestimonial].classList.add('active');
        });
    });

    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() === '') {
                showNotification('Please enter your email address', 'error');
            } else if (!isValidEmail(emailInput.value)) {
                showNotification('Please enter a valid email address', 'error');
            } else {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            }
        });
    }

    // Notification functions
    function showNotification(message, type) {
        notificationMessage.textContent = message;
        notificationIcon.className = 'notification-icon fas';
        
        if (type === 'success') {
            notificationIcon.classList.add('fa-check-circle');
            notificationIcon.classList.add('success');
        } else if (type === 'error') {
            notificationIcon.classList.add('fa-exclamation-circle');
            notificationIcon.classList.add('error');
        } else {
            notificationIcon.classList.add('fa-info-circle');
        }
        
        notification.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    // Close notification
    notificationClose.addEventListener('click', function() {
        notification.classList.remove('show');
    });

    // Form validation helper functions
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        formGroup.classList.add('error');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        formGroup.classList.remove('error');
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Create folder for images if it doesn't exist
    function createImageFolders() {
        // This would typically be handled server-side
        console.log('Image folders would be created server-side');
    }

    // Initialize the website
    function init() {
        // Set minimum date for reservation to today
        if (document.getElementById('date')) {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('date').setAttribute('min', today);
        }
        
        // Trigger the 'all' filter for menu items
        if (filterBtns.length > 0) {
            filterBtns[0].click();
        }
    }
    
    // Call initialization function
    init();
});