import { BaseComponent, html, css } from '../../core/base-component.ts';
import { Store } from '../../core/store.ts';

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
    // We pass empty HTML and CSS as the base, because we render dynamically
    super('', css`:host { display: block; }`);
    
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
      this.update();
    });

    // Register delegated event listeners (they survive HTML re-renders perfectly!)
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
    this.update();
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

  render(): string {
    const { tasks, filter } = this.store.getState();
    
    // Filter tasks
    const filteredTasks = tasks.filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    });

    const activeCount = tasks.filter(t => !t.completed).length;
    const completedCount = tasks.filter(t => t.completed).length;

    return html`
      <div class="min-h-[85vh] bg-gray-50/50 py-12 px-4 sm:px-6">
        <div class="max-w-xl mx-auto">
          
          <!-- Heading -->
          <div class="text-center mb-10">
            <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              To-Do List
            </h1>
            <p class="text-gray-500 font-medium">
              A declarative state-managed demo built with Boba standards.
            </p>
          </div>

          <!-- Main Card -->
          <div class="bg-white rounded-3xl shadow-xl border border-gray-100/80 p-6 sm:p-8">
            
            <!-- Input Row -->
            <div class="flex gap-3 mb-8">
              <input 
                type="text" 
                id="new-task-input" 
                placeholder="What needs to be done?" 
                class="flex-grow px-5 py-3.5 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium shadow-inner text-sm sm:text-base"
                autocomplete="off"
              />
              <button 
                id="add-task-btn"
                class="px-6 py-3.5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 text-sm"
              >
                <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add
              </button>
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-6 text-sm">
              <div class="flex items-center bg-gray-100/80 p-1 rounded-xl">
                <button 
                  data-filter="all" 
                  class="filter-btn px-4 py-2 font-semibold rounded-lg transition-all ${filter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}"
                >
                  All
                </button>
                <button 
                  data-filter="active" 
                  class="filter-btn px-4 py-2 font-semibold rounded-lg transition-all ${filter === 'active' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}"
                >
                  Active <span class="ml-1 text-xs px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded-full font-bold">${tasks.filter(t => !t.completed).length}</span>
                </button>
                <button 
                  data-filter="completed" 
                  class="filter-btn px-4 py-2 font-semibold rounded-lg transition-all ${filter === 'completed' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}"
                >
                  Completed
                </button>
              </div>

              ${completedCount > 0 ? html`
                <button 
                  id="clear-completed-btn"
                  class="text-xs font-bold text-red-500 hover:text-red-600 hover:underline transition-colors py-1 px-2"
                >
                  Clear Completed
                </button>
              ` : ''}
            </div>

            <!-- Task List -->
            <ul id="task-list" class="space-y-3.5">
              ${filteredTasks.length === 0 ? html`
                <div class="py-12 text-center">
                  <svg class="w-16 h-16 text-gray-300 mx-auto mb-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.375M9 18h3.375m1.875-10.125A2.25 2.25 0 0115.75 6H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                  </svg>
                  <p class="text-gray-400 font-medium">No tasks found in this section!</p>
                </div>
              ` : filteredTasks.map(task => html`
                <li class="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100/70 border border-gray-100 rounded-2xl transition-all group shadow-sm">
                  <div class="flex items-center space-x-3.5 flex-grow cursor-pointer toggle-task" data-id="${task.id}">
                    
                    <!-- Checkbox -->
                    <div class="w-6 h-6 flex items-center justify-center rounded-lg border-2 transition-all ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 group-hover:border-gray-400'}">
                      ${task.completed ? html`
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ` : ''}
                    </div>

                    <!-- Task Text -->
                    <span class="font-semibold text-sm sm:text-base transition-all ${task.completed ? 'line-through text-gray-400 font-normal' : 'text-gray-800'}">
                      ${task.text}
                    </span>
                  </div>

                  <!-- Delete Button -->
                  <button 
                    class="delete-task p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95" 
                    data-id="${task.id}"
                    title="Delete Task"
                  >
                    <svg class="w-5 h-5 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              `)}
            </ul>

            <!-- Task Footer Stats -->
            <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-gray-500 font-medium">
              <span>${activeCount} active task${activeCount === 1 ? '' : 's'} remaining</span>
              <span>Total tasks: ${tasks.length}</span>
            </div>

          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get(TodoPageComponent.tagName)) {
  customElements.define(TodoPageComponent.tagName, TodoPageComponent);
}
