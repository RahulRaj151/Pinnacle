document.addEventListener('DOMContentLoaded', function() {
    // Initialize calendar
    initCalendar();
    
    // Initialize event listeners
    initEventListeners();
    
    // Show event details when clicking on an event
    initEventDetails();
});

// Calendar data
let currentDate = new Date();
let currentView = 'month';
let events = [
    {
        id: 1,
        title: 'Tech Conference',
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 10, 0),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 0),
        category: 'technology',
        location: 'Convention Center, New York',
        organizer: 'Tech Events Inc.',
        description: 'Join us for the annual Tech Conference 2023, where industry leaders and innovators gather to share insights on the latest technological advancements.',
        image: 'https://via.placeholder.com/600x400',
        ticket: '$49.99 - General Admission'
    },
    {
        id: 2,
        title: 'Marketing Workshop',
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5, 14, 0),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5, 16, 0),
        category: 'business',
        location: 'Business Center, Chicago',
        organizer: 'Marketing Pros',
        description: 'Learn the latest marketing strategies from industry experts.',
        image: 'https://via.placeholder.com/600x400',
        ticket: '$35.00 - Professional Pass'
    },
    {
        id: 3,
        title: 'Charity Gala',
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10, 19, 0),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10, 22, 0),
        category: 'community',
        location: 'Grand Hotel, San Francisco',
        organizer: 'Community Foundation',
        description: 'Annual charity gala to raise funds for local community projects.',
        image: 'https://via.placeholder.com/600x400',
        ticket: '$100.00 - Gala Ticket'
    }
];

// Initialize calendar
function initCalendar() {
    updateCalendarHeader();
    renderCalendarView();
}

// Initialize event listeners
function initEventListeners() {
    // Navigation buttons
    document.getElementById('prev-month').addEventListener('click', () => navigateCalendar('prev'));
    document.getElementById('next-month').addEventListener('click', () => navigateCalendar('next'));
    document.getElementById('today-btn').addEventListener('click', goToToday);
    
    // View buttons
    const viewButtons = document.querySelectorAll('.calendar-view-options button');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            changeCalendarView(view);
        });
    });
    
    // Filters
    document.getElementById('filter-my-events').addEventListener('change', filterEvents);
    document.getElementById('filter-attending').addEventListener('change', filterEvents);
    document.getElementById('filter-public').addEventListener('change', filterEvents);
    document.getElementById('category-filter').addEventListener('change', filterEvents);
    
    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
    
    // User menu
    const userInfo = document.querySelector('.user-info');
    const userDropdown = document.querySelector('.user-dropdown');
    if (userInfo && userDropdown) {
        userInfo.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!userInfo.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }
    
    // Modal close
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            document.getElementById('event-details-modal').classList.remove('show');
        });
    }
}

// Initialize event details
function initEventDetails() {
    // Add click event to all calendar events
    document.addEventListener('click', function(e) {
        const eventElement = e.target.closest('[data-event-id]');
        if (eventElement) {
            const eventId = parseInt(eventElement.getAttribute('data-event-id'));
            showEventDetails(eventId);
        }
    });
}

// Update calendar header with current month/year
function updateCalendarHeader() {
    const monthYearElement = document.getElementById('current-month');
    const options = { month: 'long', year: 'numeric' };
    monthYearElement.textContent = currentDate.toLocaleDateString('en-US', options);
    
    // Update current day for day view
    const currentDayElement = document.getElementById('current-day');
    const dayOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    currentDayElement.textContent = currentDate.toLocaleDateString('en-US', dayOptions);
}

// Navigate calendar (prev/next)
function navigateCalendar(direction) {
    if (currentView === 'month') {
        if (direction === 'prev') {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        } else {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        }
    } else if (currentView === 'week') {
        if (direction === 'prev') {
            currentDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else {
            currentDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        }
    } else if (currentView === 'day') {
        if (direction === 'prev') {
            currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        } else {
            currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        }
    }
    
    updateCalendarHeader();
    renderCalendarView();
}

// Go to today
function goToToday() {
    currentDate = new Date();
    updateCalendarHeader();
    renderCalendarView();
}

// Change calendar view (month, week, day, list)
function changeCalendarView(view) {
    // Update active button
    const viewButtons = document.querySelectorAll('.calendar-view-options button');
    viewButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-view') === view) {
            button.classList.add('active');
        }
    });
    
    // Update current view
    currentView = view;
    
    // Hide all views
    const calendarViews = document.querySelectorAll('.calendar-view');
    calendarViews.forEach(view => view.classList.remove('active'));
    
    // Show selected view
    document.getElementById(`${view}-view`).classList.add('active');
    
    // Render the view
    renderCalendarView();
}

// Render calendar based on current view
function renderCalendarView() {
    if (currentView === 'month') {
        renderMonthView();
    } else if (currentView === 'week') {
        // Simplified placeholder
        console.log('Week view would be rendered here');
    } else if (currentView === 'day') {
        // Simplified placeholder
        console.log('Day view would be rendered here');
    } else if (currentView === 'list') {
        // Simplified placeholder
        console.log('List view would be rendered here');
    }
}

// Render month view
function renderMonthView() {
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week for first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Get total days in month
    const totalDays = lastDay.getDate();
    
    // Get total days from previous month to display
    const prevMonthDays = firstDayOfWeek;
    
    // Get last day of previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // Calculate total cells needed (previous month days + current month days + next month days)
    const totalCells = Math.ceil((prevMonthDays + totalDays) / 7) * 7;
    
    // Create calendar grid
    for (let i = 0; i < totalCells; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        
        const dayNumber = document.createElement('span');
        dayNumber.className = 'day-number';
        
        const dayEvents = document.createElement('div');
        dayEvents.className = 'day-events';
        
        // Calculate day number
        let dayNum;
        
        if (i < prevMonthDays) {
            // Previous month days
            dayNum = prevMonthLastDay - prevMonthDays + i + 1;
            dayElement.classList.add('prev-month');
        } else if (i >= prevMonthDays && i < prevMonthDays + totalDays) {
            // Current month days
            dayNum = i - prevMonthDays + 1;
            
            // Check if it's today
            const today = new Date();
            if (dayNum === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add('today');
            }
        } else {
            // Next month days
            dayNum = i - prevMonthDays - totalDays + 1;
            dayElement.classList.add('next-month');
        }
        
        dayNumber.textContent = dayNum;
        dayHeader.appendChild(dayNumber);
        dayElement.appendChild(dayHeader);
        dayElement.appendChild(dayEvents);
        
        calendarGrid.appendChild(dayElement);
    }
    
    // Add sample events to the calendar
    addSampleEventsToCalendar();
}

// Add sample events to the calendar
function addSampleEventsToCalendar() {
    events.forEach(event => {
        const day = event.start.getDate();
        const month = event.start.getMonth();
        const year = event.start.getFullYear();
        
        // Find the day element for this event
        const dayElements = document.querySelectorAll('.calendar-day:not(.prev-month):not(.next-month)');
        const dayElement = dayElements[day - 1]; // Adjust for 0-based index
        
        if (dayElement) {
            const dayEvents = dayElement.querySelector('.day-events');
            
            const eventElement = document.createElement('div');
            eventElement.className = `calendar-event ${event.category}`;
            eventElement.setAttribute('data-event-id', event.id);
            
            const eventTime = document.createElement('span');
            eventTime.className = 'event-time';
            eventTime.textContent = event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            
            const eventTitle = document.createElement('span');
            eventTitle.className = 'event-title';
            eventTitle.textContent = event.title;
            
            eventElement.appendChild(eventTime);
            eventElement.appendChild(eventTitle);
            
            dayEvents.appendChild(eventElement);
        }
    });
}

// Show event details
function showEventDetails(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    const modal = document.getElementById('event-details-modal');
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = event.title;
    modal.querySelector('.event-details-image img').src = event.image;
    
    const dateTimeInfo = modal.querySelectorAll('.event-detail')[0].querySelectorAll('p');
    dateTimeInfo[0].textContent = event.start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    dateTimeInfo[1].textContent = `${event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} - ${event.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    
    const locationInfo = modal.querySelectorAll('.event-detail')[1].querySelectorAll('p');
    const locationParts = event.location.split(',');
    locationInfo[0].textContent = locationParts[0];
    locationInfo[1].textContent = locationParts.slice(1).join(',').trim();
    
    const organizerInfo = modal.querySelectorAll('.event-detail')[2].querySelector('p');
    organizerInfo.textContent = event.organizer;
    
    const ticketInfo = modal.querySelectorAll('.event-detail')[3].querySelector('p');
    ticketInfo.textContent = event.ticket;
    
    const descriptionParagraphs = modal.querySelectorAll('.event-details-description p');
    descriptionParagraphs[0].textContent = event.description;
    
    // Show modal
    modal.classList.add('show');
}

// Filter events
function filterEvents() {
    renderCalendarView();
}