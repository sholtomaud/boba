import html from './todo-page.html?raw';
import css from './todo-page.css?raw';
import { BaseComponent } from '../../core/base-component';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoPageComponent extends BaseComponent {
  static readonly tagName = 'todo-page';

  private tasks: Task[] = [];
  private nextTaskId: number = 1;

  private taskInput!: HTMLInputElement;
  private addTaskButton!: HTMLButtonElement;
  private taskList!: HTMLUListElement;

  constructor() {
    super(html, css);
    // Initialize tasks from localStorage if available
    this.loadTasks();
  }

  protected init(): void {
    this.taskInput = this.shadowRoot!.getElementById(
      'new-task-input'
    ) as HTMLInputElement;
    this.addTaskButton = this.shadowRoot!.getElementById(
      'add-task-btn'
    ) as HTMLButtonElement;
    this.taskList = this.shadowRoot!.getElementById(
      'task-list'
    ) as HTMLUListElement;

    this.addTaskButton.addEventListener('click', () => this.addTask());
    this.taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.addTask();
      }
    });

    this.renderTasks();
  }

  private addTask(): void {
    const taskText = this.taskInput.value.trim();
    if (taskText === '') {
      // Optionally, show an error or do nothing
      return;
    }

    const newTask: Task = {
      id: this.nextTaskId++,
      text: taskText,
      completed: false,
    };

    this.tasks.push(newTask);
    this.taskInput.value = ''; // Clear input
    this.saveTasks();
    this.renderTasks();
  }

  private toggleTaskComplete(taskId: number): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.renderTasks();
    }
  }

  private deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    this.saveTasks();
    this.renderTasks();
  }

  private saveTasks(): void {
    localStorage.setItem('boba-tasks', JSON.stringify(this.tasks));
    // Also save nextTaskId to prevent ID collisions on page reload
    localStorage.setItem('boba-nextTaskId', this.nextTaskId.toString());
  }

  private loadTasks(): void {
    const storedTasks = localStorage.getItem('boba-tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
    const storedNextId = localStorage.getItem('boba-nextTaskId');
    if (storedNextId) {
      this.nextTaskId = parseInt(storedNextId, 10);
    }
    // Ensure nextTaskId is at least the max existing ID + 1 if tasks were loaded
    if (this.tasks.length > 0) {
      const maxId = Math.max(...this.tasks.map((t) => t.id), 0);
      this.nextTaskId = Math.max(this.nextTaskId, maxId + 1);
    } else {
      this.nextTaskId = 1; // Reset if no tasks
    }
  }

  private renderTasks(): void {
    this.taskList.innerHTML = ''; // Clear existing tasks

    if (this.tasks.length === 0) {
      // Handled by CSS :empty pseudo-class with ::after
      // Or you can add a specific message here:
      // const emptyMsg = document.createElement('p');
      // emptyMsg.textContent = "No tasks yet! Add some above.";
      // emptyMsg.className = 'empty-list-message'; // Style this class in CSS
      // this.taskList.appendChild(emptyMsg);
    } else {
      this.tasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.dataset.taskId = task.id.toString();
        if (task.completed) {
          listItem.classList.add('completed');
        }

        const taskTextSpan = document.createElement('span');
        taskTextSpan.classList.add('task-text');
        taskTextSpan.textContent = task.text;
        taskTextSpan.addEventListener('click', () =>
          this.toggleTaskComplete(task.id)
        );

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('task-actions');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '&times;'; // Or use an icon/svg
        deleteButton.setAttribute('aria-label', `Delete task: ${task.text}`);
        deleteButton.addEventListener('click', () => this.deleteTask(task.id));

        actionsDiv.appendChild(deleteButton);
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(actionsDiv);
        this.taskList.appendChild(listItem);
      });
    }
  }
}

// Register the component with the browser
if (!customElements.get(TodoPageComponent.tagName)) {
  customElements.define(TodoPageComponent.tagName, TodoPageComponent);
}
