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

    function createTaskElement(name, dueDate, assignee) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Due:</strong> ${formatDate(dueDate)}</p>
            <p><strong>Assignee:</strong> ${assignee}</p>
        `;

        // Add draggable event
        taskElement.setAttribute('draggable', true);
        taskElement.addEventListener('dragstart', function() {
            taskElement.classList.add('dragging');
        });
        taskElement.addEventListener('dragend', function() {
            taskElement.classList.remove('dragging');
        });

        return taskElement;
    }

    function formatDate(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleString();
    }

    // Drop functionality (moving tasks to completed)
    completedTasks.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    completedTasks.addEventListener('drop', function(event) {
        event.preventDefault();
        const draggedTask = document.querySelector('.dragging');
        if (draggedTask) {
            draggedTask.classList.remove('dragging');
            draggedTask.classList.add('completed');
            completedTasks.appendChild(draggedTask);
        }
    });

    // Drop functionality (moving tasks from past due to completed)
    pastDueTasks.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    pastDueTasks.addEventListener('drop', function(event) {
        event.preventDefault();
        const draggedTask = document.querySelector('.dragging');
        if (draggedTask) {
            draggedTask.classList.remove('dragging');
            draggedTask.classList.remove('past-due'); // Remove past-due class
            draggedTask.classList.add('completed');
            completedTasks.appendChild(draggedTask);
        }
    });
});
