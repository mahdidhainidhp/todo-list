document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks = document.getElementById('completedTasks');
    const pastDueTasks = document.getElementById('pastDueTasks');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const taskName = document.getElementById('taskName').value;
        const dueDate = document.getElementById('dueDate').value;
        const assignee = document.getElementById('assignee').value;

        // Create task element
        const taskElement = createTaskElement(taskName, dueDate, assignee);

        // Determine task status
        const now = new Date();
        const taskDueDate = new Date(dueDate);
        if (taskDueDate < now) {
            taskElement.classList.add('past-due');
            pastDueTasks.appendChild(taskElement);
        } else {
            pendingTasks.appendChild(taskElement);
        }

        // Clear form
        taskForm.reset();
    });
});
