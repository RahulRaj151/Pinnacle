// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskPriority = document.getElementById('task-priority');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const searchInput = document.getElementById('search-input');
const filterStatus = document.getElementById('filter-status');
const filterPriority = document.getElementById('filter-priority');
const emptyState = document.getElementById('empty-state');
const taskTemplate = document.getElementById('task-template');
const editModal = document.getElementById('edit-modal');
const closeModal = document.querySelector('.close-modal');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const editPriority = document.getElementById('edit-priority');

// Task array to store all tasks
let tasks = [];
let currentEditId = null;

// Initialize the app
function init() {
    // Load tasks from local storage
    loadTasks();
    
    // Render tasks
    renderTasks();
    
    // Add event listeners
    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', handleTaskActions);
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    searchInput.addEventListener('input', filterTasks);
    filterStatus.addEventListener('change', filterTasks);
    filterPriority.addEventListener('change', filterTasks);
    closeModal.addEventListener('click', closeEditModal);
    editForm.addEventListener('submit', updateTask);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
}

// Load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks based on current filters
function renderTasks() {
    // Clear the task list
    taskList.innerHTML = '';
    
    // Get filter values
    const searchTerm = searchInput.value.toLowerCase().trim();
    const statusFilter = filterStatus.value;
    const priorityFilter = filterPriority.value;
    
    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        // Search filter
        const matchesSearch = task.text.toLowerCase().includes(searchTerm);
        
        // Status filter
        const matchesStatus = 
            statusFilter === 'all' || 
            (statusFilter === 'active' && !task.completed) || 
            (statusFilter === 'completed' && task.completed);
        
        // Priority filter
        const matchesPriority = 
            priorityFilter === 'all' || 
            task.priority === priorityFilter;
        
        return matchesSearch && matchesStatus && matchesPriority;
    });
    
    // Show empty state if no tasks
    if (filteredTasks.length === 0) {
        emptyState.style.display = 'block';
        if (tasks.length > 0) {
            emptyState.querySelector('p').textContent = 'No tasks match your filters.';
        } else {
            emptyState.querySelector('p').textContent = 'No tasks yet. Add a task to get started!';
        }
    } else {
        emptyState.style.display = 'none';
    }
    
    // Render each task
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
    
    // Update task count
    updateTaskCount();
}

// Create a task element from template
function createTaskElement(task) {
    const taskClone = document.importNode(taskTemplate.content, true);
    const taskItem = taskClone.querySelector('.task-item');
    const taskText = taskClone.querySelector('.task-text');
    const taskCheckbox = taskClone.querySelector('.task-checkbox');
    const taskPriorityElement = taskClone.querySelector('.task-priority');
    const taskDate = taskClone.querySelector('.task-date');
    
    // Set task data
    taskItem.dataset.id = task.id;
    taskText.textContent = task.text;
    taskCheckbox.checked = task.completed;
    
    // Set task priority
    taskPriorityElement.textContent = capitalizeFirstLetter(task.priority);
    taskPriorityElement.classList.add(`priority-${task.priority}`);
    
    // Set task date
    const formattedDate = formatDate(task.date);
    taskDate.textContent = formattedDate;
    
    // Add completed class if task is completed
    if (task.completed) {
        taskItem.classList.add('completed');
    }
    
    return taskItem;
}

// Add a new task
function addTask(e) {
    e.preventDefault();
    
    const text = taskInput.value.trim();
    if (text === '') return;
    
    // Create new task object
    const newTask = {
        id: Date.now().toString(),
        text: text,
        priority: taskPriority.value,
        completed: false,
        date: new Date()
    };
    
    // Add task to array
    tasks.unshift(newTask);
    
    // Save tasks to local storage
    saveTasks();
    
    // Clear input
    taskInput.value = '';
    
    // Render tasks
    renderTasks();
    
    // Show notification
    showNotification('Task added successfully!');
}

// Handle task actions (complete, edit, delete)
function handleTaskActions(e) {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;
    
    const taskId = taskItem.dataset.id;
    const task = tasks.find(t => t.id === taskId);
    
    // Handle checkbox click
    if (e.target.classList.contains('task-checkbox')) {
        toggleTaskCompletion(taskId, e.target.checked);
    }
    
    // Handle edit button click
    if (e.target.classList.contains('edit-btn') || e.target.closest('.edit-btn')) {
        openEditModal(task);
    }
    
    // Handle delete button click
    if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
        deleteTask(taskId);
    }
}

// Toggle task completion status
function toggleTaskCompletion(taskId, completed) {
    // Find task index
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return;
    
    // Update task completion status
    tasks[taskIndex].completed = completed;
    
    // Save tasks to local storage
    saveTasks();
    
    // Render tasks
    renderTasks();
    
    // Show notification
    const message = completed ? 'Task completed!' : 'Task marked as active!';
    showNotification(message);
}

// Open edit modal
function openEditModal(task) {
    // Set current edit id
    currentEditId = task.id;
    
    // Set form values
    editInput.value = task.text;
    editPriority.value = task.priority;
    
    // Show modal
    editModal.style.display = 'flex';
    
    // Focus input
    editInput.focus();
}

// Close edit modal
function closeEditModal() {
    editModal.style.display = 'none';
    currentEditId = null;
}

// Update task
function updateTask(e) {
    e.preventDefault();
    
    if (!currentEditId) return;
    
    const text = editInput.value.trim();
    if (text === '') return;
    
    // Find task index
    const taskIndex = tasks.findIndex(task => task.id === currentEditId);
    if (taskIndex === -1) return;
    
    // Update task
    tasks[taskIndex].text = text;
    tasks[taskIndex].priority = editPriority.value;
    
    // Save tasks to local storage
    saveTasks();
    
    // Close modal
    closeEditModal();
    
    // Render tasks
    renderTasks();
    
    // Show notification
    showNotification('Task updated successfully!');
}

// Delete task
function deleteTask(taskId) {
    // Filter out the task
    tasks = tasks.filter(task => task.id !== taskId);
    
    // Save tasks to local storage
    saveTasks();
    
    // Render tasks
    renderTasks();
    
    // Show notification
    showNotification('Task deleted successfully!');
}

// Clear completed tasks
function clearCompletedTasks() {
    // Check if there are any completed tasks
    const completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length === 0) {
        showNotification('No completed tasks to clear!', 'warning');
        return;
    }
    
    // Filter out completed tasks
    tasks = tasks.filter(task => !task.completed);
    
    // Save tasks to local storage
    saveTasks();
    
    // Render tasks
    renderTasks();
    
    // Show notification
    showNotification(`Cleared ${completedTasks.length} completed tasks!`);
}

// Filter tasks based on search and filter options
function filterTasks() {
    renderTasks();
}

// Update task count
function updateTaskCount() {
    const activeTaskCount = tasks.filter(task => !task.completed).length;
    taskCount.textContent = activeTaskCount;
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Helper function to format date
function formatDate(date) {
    const now = new Date();
    const taskDate = new Date(date);
    
    // Check if date is today
    if (taskDate.toDateString() === now.toDateString()) {
        return 'Today';
    }
    
    // Check if date is yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (taskDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }
    
    // Format date
    const options = { month: 'short', day: 'numeric' };
    if (taskDate.getFullYear() !== now.getFullYear()) {
        options.year = 'numeric';
    }
    
    return taskDate.toLocaleDateString('en-US', options);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        background-color: #4a6cf7;
        color: white;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s, opacity 0.3s;
        z-index: 1001;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.warning {
        background-color: #f39c12;
    }
    
    .notification.error {
        background-color: #dc3545;
    }
`;
document.head.appendChild(notificationStyles);

// Initialize the app
init();