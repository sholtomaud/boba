import { COMPONENT_PATHS } from '../../components';

type Route = {
  path: string;
  component: string; // Component tag name (e.g., 'home-page')
};

export class Router {
  private static instance: Router;
  private routes: Route[] = [];

  private constructor() {
    window.addEventListener('popstate', this.handleRoute.bind(this));
  }

  static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  public registerRoute(route: Route): void {
    this.routes.push(route);
  }

  public navigate(path: string): void {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  private handleRoute(): void {
    const path = window.location.pathname;
    const route = this.routes.find((r) => r.path === path);

    if (route) {
      this.loadComponent(route.component);
    } else {
      this.show404();
    }
  }

  private async loadComponent(tagName: string): Promise<void> {
    const outlet = document.querySelector('#router-outlet');
    if (!outlet) return;

    try {
      const loader = COMPONENT_PATHS[tagName as keyof typeof COMPONENT_PATHS];
      if (!loader) throw new Error('Component not registered');

      await loader();
      outlet.innerHTML = `<${tagName}></${tagName}>`;
    } catch (error) {
      console.error(`Failed to load component: ${tagName}`, error);
      this.show404();
    }
  }

  private show404(): void {
    const outlet = document.querySelector('#router-outlet');
    if (outlet) {
      outlet.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
  }
}
