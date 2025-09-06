/**
 * EventHub - Events Management JavaScript
 * Handles event listing, filtering, searching, and actions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize event management functionality
    initEventManagement();
    
    // Initialize event form preview functionality if on create event page
    if (document.getElementById('event-form')) {
        initEventFormPreview();
    }
});

/**
 * Initialize event management functionality
 */
function initEventManagement() {
    // Event filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Filter events based on selected tab
                const filter = this.getAttribute('data-filter');
                filterEvents(filter);
            });
        });
    }
    
    // Event search functionality
    const searchInput = document.getElementById('event-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchEvents(this.value.trim().toLowerCase());
        });
    }
    
    // Event sorting functionality
    const sortSelect = document.getElementById('sort-events');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortEvents(this.value);
        });
    }
    
    // Event action buttons
    const actionButtons = document.querySelectorAll('.event-action-btn');
    if (actionButtons.length > 0) {
        actionButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Close all other dropdowns
                document.querySelectorAll('.event-action-dropdown').forEach(dropdown => {
                    if (dropdown !== this.nextElementSibling) {
                        dropdown.classList.remove('active');
                    }
                });
                
                // Toggle dropdown
                this.nextElementSibling.classList.toggle('active');
            });
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.event-action-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
    
    // Event delete confirmation
    const deleteButtons = document.querySelectorAll('.delete-event');
    if (deleteButtons.length > 0) {
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
                    // Get the event card and remove it
                    const eventCard = this.closest('.event-card');
                    if (eventCard) {
                        // In a real application, you would make an API call to delete the event
                        // For demo purposes, we'll just remove it from the DOM
                        eventCard.remove();
                        showNotification('Event deleted successfully', 'success');
                    }
                }
            });
        });
    }
    
    // Event duplication
    const duplicateButtons = document.querySelectorAll('.duplicate-event');
    if (duplicateButtons.length > 0) {
        duplicateButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real application, you would make an API call to duplicate the event
                // For demo purposes, we'll just show a notification
                showNotification('Event duplicated successfully', 'success');
            });
        });
    }
}

/**
 * Filter events based on selected filter
 * @param {string} filter - The filter to apply (all, upcoming, past, draft)
 */
function filterEvents(filter) {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
        } else {
            const eventType = card.getAttribute('data-event-type');
            card.style.display = (eventType === filter) ? 'block' : 'none';
        }
    });
}

/**
 * Search events based on search query
 * @param {string} query - The search query
 */
function searchEvents(query) {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        const title = card.querySelector('.event-title').textContent.toLowerCase();
        const location = card.querySelector('.event-location').textContent.toLowerCase();
        
        if (title.includes(query) || location.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Sort events based on selected sort option
 * @param {string} sortOption - The sort option (date-desc, date-asc, name-asc, name-desc)
 */
function sortEvents(sortOption) {
    const eventsGrid = document.querySelector('.events-grid');
    const eventCards = Array.from(document.querySelectorAll('.event-card'));
    
    // Sort the event cards based on the selected option
    eventCards.sort((a, b) => {
        const titleA = a.querySelector('.event-title').textContent;
        const titleB = b.querySelector('.event-title').textContent;
        const dateA = new Date(a.querySelector('.event-date').textContent.split('•')[0].trim());
        const dateB = new Date(b.querySelector('.event-date').textContent.split('•')[0].trim());
        
        switch (sortOption) {
            case 'date-desc':
                return dateB - dateA;
            case 'date-asc':
                return dateA - dateB;
            case 'name-asc':
                return titleA.localeCompare(titleB);
            case 'name-desc':
                return titleB.localeCompare(titleA);
            default:
                return 0;
        }
    });
    
    // Remove all event cards from the grid
    eventCards.forEach(card => card.remove());
    
    // Add the sorted event cards back to the grid
    eventCards.forEach(card => eventsGrid.appendChild(card));
}

/**
 * Initialize event form preview functionality
 */
function initEventFormPreview() {
    // Get form elements
    const eventNameInput = document.getElementById('event-name');
    const eventDateInput = document.getElementById('event-date');
    const eventTimeInput = document.getElementById('event-time');
    const eventLocationInput = document.getElementById('event-location');
    const eventCategorySelect = document.getElementById('event-category');
    const eventPriceInput = document.getElementById('ticket-price');
    const eventImageInput = document.getElementById('event-image');
    const freeEventCheckbox = document.getElementById('free-event');
    
    // Get preview elements
    const previewTitle = document.querySelector('.event-preview .event-title');
    const previewDate = document.querySelector('.event-preview .event-date');
    const previewLocation = document.querySelector('.event-preview .event-location');
    const previewCategory = document.querySelector('.event-preview .category-tag');
    const previewPrice = document.querySelector('.event-preview .event-price');
    const previewImage = document.getElementById('preview-image');
    
    // Update preview when event name changes
    if (eventNameInput) {
        eventNameInput.addEventListener('input', function() {
            previewTitle.textContent = this.value || 'Event Title';
        });
    }
    
    // Update preview when event date or time changes
    function updateDateTime() {
        if (eventDateInput && eventTimeInput) {
            const date = eventDateInput.value ? new Date(eventDateInput.value) : new Date();
            const time = eventTimeInput.value || '12:00';
            
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            
            // Convert 24-hour time to 12-hour format
            let [hours, minutes] = time.split(':');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            const formattedTime = `${hours}:${minutes} ${ampm}`;
            
            previewDate.textContent = `${formattedDate} • ${formattedTime}`;
        }
    }
    
    if (eventDateInput) {
        eventDateInput.addEventListener('change', updateDateTime);
    }
    
    if (eventTimeInput) {
        eventTimeInput.addEventListener('change', updateDateTime);
    }
    
    // Update preview when event location changes
    if (eventLocationInput) {
        eventLocationInput.addEventListener('input', function() {
            previewLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${this.value || 'Location'}`;
        });
    }
    
    // Update preview when event category changes
    if (eventCategorySelect) {
        eventCategorySelect.addEventListener('change', function() {
            const categoryText = this.options[this.selectedIndex].text;
            previewCategory.textContent = categoryText !== 'Select a category' ? categoryText : 'Category';
        });
    }
    
    // Update preview when event price changes
    function updatePrice() {
        if (freeEventCheckbox && freeEventCheckbox.checked) {
            previewPrice.textContent = 'Free';
        } else if (eventPriceInput) {
            const price = parseFloat(eventPriceInput.value);
            previewPrice.textContent = isNaN(price) ? '$0.00' : `$${price.toFixed(2)}`;
        }
    }
    
    if (eventPriceInput) {
        eventPriceInput.addEventListener('input', updatePrice);
    }
    
    if (freeEventCheckbox) {
        freeEventCheckbox.addEventListener('change', function() {
            if (eventPriceInput) {
                eventPriceInput.disabled = this.checked;
            }
            updatePrice();
        });
    }
    
    // Update preview when event image changes
    if (eventImageInput) {
        eventImageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    // Handle virtual event URL display
    const eventTypeRadios = document.querySelectorAll('input[name="event-type"]');
    const virtualUrlGroup = document.querySelector('.virtual-url-group');
    
    if (eventTypeRadios.length > 0 && virtualUrlGroup) {
        eventTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'virtual' || this.value === 'hybrid') {
                    virtualUrlGroup.style.display = 'block';
                } else {
                    virtualUrlGroup.style.display = 'none';
                }
            });
        });
    }
    
    // Handle form submission
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would submit the form data to the server
            // For demo purposes, we'll just show a notification
            showNotification('Event created successfully!', 'success');
            
            // Redirect to my-events page after a short delay
            setTimeout(() => {
                window.location.href = 'my-events.html';
            }, 2000);
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