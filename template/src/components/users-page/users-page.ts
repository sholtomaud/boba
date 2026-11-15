import { BaseComponent } from '../../core/base-component.ts';
import {
  fetchUsers,
  validateUser,
  type User,
} from '../../services/user-service.ts';
import template from './users-page.html?raw';
import style from './users-page.css?raw';

/**
 * Loads users through a service, lists them, and adds new ones from a form.
 * Shows native form validation, an async call with loading and error states,
 * and links to a parameterised route.
 */
export class UsersPageComponent extends BaseComponent {
  static tagName = 'users-page';
  users: User[] = [];

  constructor() {
    super(template, style);
  }

  async init() {
    const form = this.querySelector<HTMLFormElement>('#user-form')!;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const user = Object.fromEntries(new FormData(form)) as unknown as User;
      user.name = user.name.trim();

      // Report our own rule through the same UI as the built-in ones.
      nameInput.setCustomValidity(validateUser(user, this.users));
      if (!form.reportValidity()) return;

      this.users.push(user);
      this.renderUsers();
      this.setStatus(`Added ${user.name}.`);
      form.reset();
      nameInput.focus();
    });
    nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));

    this.setStatus('Loading users…');
    try {
      this.users = await fetchUsers();
      this.renderUsers();
      this.setStatus('');
    } catch (error) {
      this.setStatus((error as Error).message);
    }
  }

  setStatus(message: string) {
    this.querySelector('#user-status')!.textContent = message;
  }

  renderUsers() {
    const itemTemplate = this.querySelector<HTMLTemplateElement>(
      '#user-item-template'
    )!;
    const items = this.users.map((user) => {
      const item = itemTemplate.content.cloneNode(true) as DocumentFragment;
      const link = item.querySelector<HTMLAnchorElement>('.user-link')!;
      link.textContent = user.name;
      link.setAttribute('href', `/user/${encodeURIComponent(user.name)}`);
      item.querySelector('.user-role')!.textContent = user.role;
      return item;
    });
    this.querySelector('#user-list')!.replaceChildren(...items);
  }
}

if (!customElements.get(UsersPageComponent.tagName)) {
  customElements.define(UsersPageComponent.tagName, UsersPageComponent);
}
