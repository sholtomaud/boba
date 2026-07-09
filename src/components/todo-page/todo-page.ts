import { BaseComponent } from '../../core/base-component.ts';
import { Store } from '../../core/store.ts';
import template from './todo-page.html?raw';
import style from './todo-page.css?raw';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
}

const initialTasks: Task[] = [
  { id: 1, text: 'Discover Boba framework standards', completed: true },
  { id: 2, text: 'Explore the upgraded regex router', completed: false },
  { id: 3, text: 'Build a gorgeous state-driven interface', completed: false },
];

export class TodoPageComponent extends BaseComponent {
  static tagName = 'todo-page';
  private store: Store<TodoState>;
  private nextTaskId = 4;

  constructor() {
    super(template, style);

    // Load from local storage or fall back to defaults
    const saved = localStorage.getItem('boba-todo-state');
    const initialState: TodoState = saved
      ? JSON.parse(saved)
      : { tasks: initialTasks, filter: 'all' };

    // Determine next taskId
    const maxId = initialState.tasks.reduce((max, t) => t.id > max ? t.id : max, 0);
    this.nextTaskId = maxId >= 1 ? maxId + 1 : 1;

    // Force reset filter to 'all' on load
    initialState.filter = 'all';

    this.store = new Store<TodoState>(initialState);
  }

  init() {
    // Subscribe to the store for automatic declarative updates
    this.store.addEventListener('change', () => {
      // Persist state to localStorage
      localStorage.setItem('boba-todo-state', JSON.stringify(this.store.getState()));
      this.renderTasks();
    });

    // Register delegated event listeners (they survive DOM updates perfectly!)
    this.delegate('click', '#add-task-btn', () => this.addTask());
    this.delegate('keypress', '#new-task-input', (e) => {
      if ((e as KeyboardEvent).key === 'Enter') this.addTask();
    });
    this.delegate('click', '.toggle-task', (_, el) => {
      const taskId = parseInt(el.getAttribute('data-id') || '0', 10);
      this.toggleTask(taskId);
    });
    this.delegate('click', '.delete-task', (_, el) => {
      const taskId = parseInt(el.getAttribute('data-id') || '0', 10);
      this.deleteTask(taskId);
    });
    this.delegate('click', '.filter-btn', (_, el) => {
      const filter = el.getAttribute('data-filter') as 'all' | 'active' | 'completed';
      this.setFilter(filter);
    });
    this.delegate('click', '#clear-completed-btn', () => this.clearCompleted());

    // Initial paint
    this.renderTasks();
  }

  addTask() {
    const input = this.querySelector('#new-task-input') as HTMLInputElement;
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const { tasks } = this.store.getState();
    const newTask: Task = { id: this.nextTaskId++, text, completed: false };

    this.store.setState({ tasks: [...tasks, newTask] });

    // Keep focus in input
    const newInput = this.querySelector('#new-task-input') as HTMLInputElement;
    if (newInput) {
      newInput.value = '';
      newInput.focus();
    }
  }

  toggleTask(id: number) {
    const { tasks } = this.store.getState();
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    this.store.setState({ tasks: updated });
  }

  deleteTask(id: number) {
    const { tasks } = this.store.getState();
    const updated = tasks.filter(t => t.id !== id);
    this.store.setState({ tasks: updated });
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.store.setState({ filter });
  }

  clearCompleted() {
    const { tasks } = this.store.getState();
    const updated = tasks.filter(t => !t.completed);
    this.store.setState({ tasks: updated });
  }

  private renderTasks() {
    const { tasks, filter } = this.store.getState();

    const filteredTasks = tasks.filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    });

    const activeCount = tasks.filter(t => !t.completed).length;
    const completedCount = tasks.filter(t => t.completed).length;

    this.renderFilterButtons(filter);

    const activeCountEl = this.querySelector('[data-active-count]');
    if (activeCountEl) activeCountEl.textContent = String(activeCount);

    this.querySelector('#clear-completed-btn')?.classList.toggle('hidden', completedCount === 0);

    this.renderTaskList(filteredTasks);

    const remainingLabelEl = this.querySelector('[data-remaining-label]');
    if (remainingLabelEl) {
      remainingLabelEl.textContent = `${activeCount} active task${activeCount === 1 ? '' : 's'} remaining`;
    }
    const totalCountEl = this.querySelector('[data-total-count]');
    if (totalCountEl) totalCountEl.textContent = String(tasks.length);
  }

  private renderFilterButtons(filter: TodoState['filter']) {
    this.querySelectorAll('.filter-btn').forEach((btn) => {
      const isActive = btn.getAttribute('data-filter') === filter;
      btn.classList.toggle('bg-white', isActive);
      btn.classList.toggle('text-gray-900', isActive);
      btn.classList.toggle('shadow-sm', isActive);
      btn.classList.toggle('text-gray-500', !isActive);
      btn.classList.toggle('hover:text-gray-900', !isActive);
    });
  }

  private renderTaskList(filteredTasks: Task[]) {
    const taskList = this.querySelector('#task-list');
    const emptyState = this.querySelector('#empty-state');
    const itemTemplate = this.querySelector('#task-item-template') as HTMLTemplateElement | null;
    if (!taskList || !itemTemplate) return;

    taskList.innerHTML = '';

    if (filteredTasks.length === 0) {
      emptyState?.classList.remove('hidden');
      return;
    }
    emptyState?.classList.add('hidden');

    for (const task of filteredTasks) {
      const node = itemTemplate.content.cloneNode(true) as DocumentFragment;

      const toggleEl = node.querySelector('.toggle-task') as HTMLElement;
      const deleteEl = node.querySelector('.delete-task') as HTMLElement;
      const checkboxEl = node.querySelector('.checkbox') as HTMLElement;
      const checkIconEl = node.querySelector('.check-icon') as HTMLElement;
      const textEl = node.querySelector('.task-text') as HTMLElement;

      toggleEl.setAttribute('data-id', String(task.id));
      deleteEl.setAttribute('data-id', String(task.id));
      textEl.textContent = task.text;

      checkboxEl.classList.toggle('bg-green-500', task.completed);
      checkboxEl.classList.toggle('border-green-500', task.completed);
      checkboxEl.classList.toggle('text-white', task.completed);
      checkboxEl.classList.toggle('border-gray-300', !task.completed);
      checkboxEl.classList.toggle('group-hover:border-gray-400', !task.completed);
      checkIconEl.classList.toggle('hidden', !task.completed);

      textEl.classList.toggle('line-through', task.completed);
      textEl.classList.toggle('text-gray-400', task.completed);
      textEl.classList.toggle('font-normal', task.completed);
      textEl.classList.toggle('text-gray-800', !task.completed);

      taskList.appendChild(node);
    }
  }
}

if (!customElements.get(TodoPageComponent.tagName)) {
  customElements.define(TodoPageComponent.tagName, TodoPageComponent);
}
