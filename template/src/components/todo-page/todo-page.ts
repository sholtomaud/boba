import { BaseComponent } from '../../core/base-component.ts';
import template from './todo-page.html?raw';
import style from './todo-page.css?raw';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoPageComponent extends BaseComponent {
  static tagName = 'todo-page';
  tasks: Todo[] = [];
  nextTaskId = 1;
  taskInput!: HTMLInputElement;
  addTaskButton!: HTMLButtonElement;
  taskList!: HTMLElement;

  constructor() {
    super(template, style);
    this.loadTasks();
  }

  init() {
    this.taskInput = this.querySelector('#new-task-input') as HTMLInputElement;
    this.addTaskButton = this.querySelector('#add-task-btn') as HTMLButtonElement;
    this.taskList = this.querySelector('#task-list')!;

    this.addTaskButton.addEventListener('click', () => this.addTask());
    this.taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') this.addTask();
    });

    this.renderTasks();
  }

  addTask() {
    const taskText = this.taskInput.value.trim();
    if (!taskText) return;

    const newTask = { id: this.nextTaskId++, text: taskText, completed: false };
    this.tasks.push(newTask);
    this.taskInput.value = '';
    this.saveTasks();
    this.renderTasks();
  }

  toggleTaskComplete(taskId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.renderTasks();
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    this.saveTasks();
    this.renderTasks();
  }

  saveTasks() {
    localStorage.setItem('boba-tasks', JSON.stringify(this.tasks));
    localStorage.setItem('boba-nextTaskId', this.nextTaskId.toString());
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('boba-tasks');
    if (storedTasks) this.tasks = JSON.parse(storedTasks);
    const storedNextId = localStorage.getItem('boba-nextTaskId');
    if (storedNextId) this.nextTaskId = parseInt(storedNextId, 10);
  }

  renderTasks() {
    this.taskList.innerHTML = '';
    this.tasks.forEach((task) => {
      const li = document.createElement('li');
      if (task.completed) li.classList.add('completed');

      const span = document.createElement('span');
      span.className = 'task-text';
      span.textContent = task.text;
      span.onclick = () => this.toggleTaskComplete(task.id);

      const btn = document.createElement('button');
      btn.className = 'delete-btn';
      btn.innerHTML = '&times;';
      btn.onclick = (e) => {
        e.stopPropagation();
        this.deleteTask(task.id);
      };

      li.append(span, btn);
      this.taskList.append(li);
    });
  }
}

if (!customElements.get(TodoPageComponent.tagName)) {
  customElements.define(TodoPageComponent.tagName, TodoPageComponent);
}
