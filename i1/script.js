document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for skill bars
    initSkillBars();
    
    // Initialize project filters
    initProjectFilters();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize contact form validation
    initContactForm();
    
    // Initialize header scroll effect
    initHeaderScroll();
});

// Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const phrases = [
            'Full Stack Developer',
            'UI/UX Designer',
            'Mobile App Developer',
            'Problem Solver'
        ];
        
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                // Deleting text
                typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                // Typing text
                typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 150; // Slower when typing
            }
            
            // If completed typing the phrase
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at the end of phrase
            }
            
            // If completed deleting the phrase
            if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next phrase
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeEffect, 1000);
    }
});

// Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to add 'visible' class to elements in viewport
    function revealElements() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .section-title, .section-subtitle');
        
        elements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }
    
    // Run on page load
    revealElements();
    
    // Run on scroll
    window.addEventListener('scroll', revealElements);
});

// Smooth Scrolling for Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a, .footer-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's an internal link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navToggle = document.querySelector('.nav-toggle');
                    const navMenu = document.querySelector('.nav-menu');
                    
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    }
                }
            }
        });
    });
});

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.querySelector('#name');
            const emailInput = document.querySelector('#email');
            const subjectInput = document.querySelector('#subject');
            const messageInput = document.querySelector('#message');
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Name is required');
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                isValid = false;
                showError(emailInput, 'Email is required');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                isValid = false;
                showError(subjectInput, 'Subject is required');
            } else {
                removeError(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Message is required');
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Message sent successfully!';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    contactForm.removeChild(successMessage);
                }, 3000);
            }
        });
    }
    
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorElement);
        }
        
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        
        if (errorElement) {
            formControl.removeChild(errorElement);
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});

// Header Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300);
    });
    
    // Add hover effects to buttons and links
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .social-icon');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});

// Add a simple preloader
window.addEventListener('load', function() {
    // You can add a preloader element in your HTML and remove it here
    // For now, we'll just log that the page has loaded
    console.log('Page fully loaded');
});

// Add a simple back to top button functionality
// You can add the HTML for this button in your index.html
function addBackToTopButton() {
    const body = document.querySelector('body');
    
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.style.display = 'none';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.width = '40px';
    backToTopBtn.style.height = '40px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.backgroundColor = '#4a6bff';
    backToTopBtn.style.color = 'white';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.fontSize = '20px';
    backToTopBtn.style.zIndex = '999';
    
    body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if(window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Call the function to add back to top button
addBackToTopButton();