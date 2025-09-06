/**
 * Dashboard functionality for Event Organizer Website
 * Handles analytics charts, task management, and dashboard interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

function initDashboard() {
    // Initialize all dashboard components
    initSalesChart();
    initTaskManagement();
    initUserMenu();
    loadDashboardData();
}

/**
 * Initialize sales chart using Chart.js
 */
function initSalesChart() {
    const chartCanvas = document.getElementById('sales-chart');
    if (!chartCanvas) return;

    // Sample data - in a real app, this would come from an API
    const salesData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Ticket Sales',
            data: [12, 19, 8, 15, 25, 32],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            tension: 0.4
        }]
    };

    // Create chart
    const salesChart = new Chart(chartCanvas, {
        type: 'line',
        data: salesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(200, 200, 200, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    }
                }
            }
        }
    });
}

/**
 * Initialize task management functionality
 */
function initTaskManagement() {
    // Add task button
    const addTaskBtn = document.getElementById('add-task-btn');
    const addTaskModal = document.getElementById('add-task-modal');
    const closeModalBtn = addTaskModal?.querySelector('.close-modal');
    const taskForm = document.getElementById('task-form');

    // Task checkboxes
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');

    // Open add task modal
    if (addTaskBtn && addTaskModal) {
        addTaskBtn.addEventListener('click', function() {
            addTaskModal.style.display = 'flex';
        });
    }

    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            addTaskModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === addTaskModal) {
            addTaskModal.style.display = 'none';
        }
    });

    // Handle task form submission
    if (taskForm) {
        taskForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const taskName = document.getElementById('task-name').value;
            const taskDue = document.getElementById('task-due').value;
            const taskEvent = document.getElementById('task-event');
            const taskPriority = document.getElementById('task-priority').value;

            // Format due date
            const dueDate = new Date(taskDue);
            const formattedDue = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            // Create new task element
            addNewTask(taskName, formattedDue, taskPriority);

            // Close modal and reset form
            addTaskModal.style.display = 'none';
            taskForm.reset();

            // Show notification
            showNotification('Task added successfully!', 'success');
        });
    }

    // Handle task checkbox changes
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            const taskDue = taskItem.querySelector('.task-due');

            if (this.checked) {
                taskItem.classList.add('completed');
                if (taskDue) taskDue.textContent = 'Completed';
            } else {
                taskItem.classList.remove('completed');
                // Reset the due date (in a real app, this would come from the database)
                if (taskDue && taskDue.dataset.originalDue) {
                    taskDue.textContent = 'Due: ' + taskDue.dataset.originalDue;
                }
            }
        });
    });
}

/**
 * Add a new task to the task list
 */
function addNewTask(name, dueDate, priority) {
    const taskList = document.querySelector('.task-list');
    if (!taskList) return;

    // Generate unique ID for the task
    const taskId = 'task' + Date.now();

    // Create task element
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    if (priority === 'high') taskItem.classList.add('high-priority');

    // Create task content
    taskItem.innerHTML = `
        <input type="checkbox" id="${taskId}" class="task-checkbox">
        <label for="${taskId}">${name}</label>
        <span class="task-due" data-original-due="${dueDate}">Due: ${dueDate}</span>
    `;

    // Add to task list
    taskList.prepend(taskItem);

    // Add event listener to the new checkbox
    const checkbox = taskItem.querySelector('.task-checkbox');
    checkbox.addEventListener('change', function() {
        const taskDue = taskItem.querySelector('.task-due');

        if (this.checked) {
            taskItem.classList.add('completed');
            if (taskDue) taskDue.textContent = 'Completed';
        } else {
            taskItem.classList.remove('completed');
            if (taskDue) taskDue.textContent = 'Due: ' + taskDue.dataset.originalDue;
        }
    });
}

/**
 * Initialize user menu dropdown
 */
function initUserMenu() {
    const userInfo = document.querySelector('.user-info');
    const userDropdown = document.querySelector('.user-dropdown');

    if (userInfo && userDropdown) {
        userInfo.addEventListener('click', function() {
            userDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userInfo.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }
}

/**
 * Load dashboard data from API or localStorage
 */
function loadDashboardData() {
    // In a real app, this would fetch data from an API
    // For demo purposes, we'll use mock data

    // Get current user
    const currentUser = window.authSystem?.getCurrentUser();
    if (currentUser) {
        // Update user name and avatar
        const userNameElement = document.querySelector('.user-name');
        if (userNameElement) userNameElement.textContent = currentUser.name;

        // In a real app, we would also update the avatar
        // const userAvatar = document.querySelector('.user-avatar');
        // if (userAvatar && currentUser.avatar) userAvatar.src = currentUser.avatar;
    }

    // Load dashboard stats
    loadDashboardStats();

    // Load upcoming events
    loadUpcomingEvents();

    // Load recent activity
    loadRecentActivity();
}

/**
 * Load dashboard statistics
 */
function loadDashboardStats() {
    // In a real app, this would fetch data from an API
    // For demo purposes, we'll use mock data

    // Sample stats data
    const stats = {
        totalEvents: 5,
        totalAttendees: 128,
        ticketsSold: 87,
        revenue: 2450
    };

    // Update stats in the UI
    const statElements = document.querySelectorAll('.stat-content h3');
    if (statElements.length >= 4) {
        statElements[0].textContent = stats.totalEvents;
        statElements[1].textContent = stats.totalAttendees;
        statElements[2].textContent = stats.ticketsSold;
        statElements[3].textContent = '$' + stats.revenue;
    }
}

/**
 * Load upcoming events
 */
function loadUpcomingEvents() {
    // In a real app, this would fetch data from an API
    // For demo purposes, we'll use the events already in the HTML
}

/**
 * Load recent activity
 */
function loadRecentActivity() {
    // In a real app, this would fetch data from an API
    // For demo purposes, we'll use the activities already in the HTML
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Format time for display
 */
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
}