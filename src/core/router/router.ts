import { COMPONENT_PATHS } from 'virtual:component-manifest';

const BASE_URL = import.meta.env.BASE_URL; // Provided by Vite, e.g., "/ts-wc-templater/" or "/"

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

  private getAppPath(): string {
    const pathname = window.location.pathname;
    // Ensure BASE_URL ends with a slash for correct comparison and substringing,
    // unless it's the root path "/".
    const normalizedBaseUrl =
      BASE_URL.endsWith('/') || BASE_URL === '/' ? BASE_URL : BASE_URL + '/';

    if (
      pathname.startsWith(normalizedBaseUrl) &&
      normalizedBaseUrl.length > 1
    ) {
      // Don't strip if base is '/'
      let appPath = pathname.substring(normalizedBaseUrl.length);
      // Ensure it starts with a leading slash for consistency (e.g. / or /about)
      if (!appPath.startsWith('/')) {
        appPath = '/' + appPath;
      }
      // Handle case where pathname is exactly the base (e.g. /ts-wc-templater/ should map to /)
      return appPath === '' ? '/' : appPath;
    }
    // Fallback or if BASE_URL is '/'
    return pathname.startsWith('/') ? pathname : '/' + pathname;
  }

  public registerRoute(route: Route): void {
    // Ensure routes are registered with a leading slash for consistency
    const normalizedPath = route.path.startsWith('/')
      ? route.path
      : '/' + route.path;
    this.routes.push({ ...route, path: normalizedPath });
  }

  /**
   * Navigates to an application-specific path (e.g., '/', '/about').
   * The router will handle prepending the BASE_URL for history.
   * @param appPath The application-specific path.
   */
  public navigate(appPath: string): void {
    // appPath is like "/" or "/about"
    const normalizedAppPath = appPath.startsWith('/') ? appPath : '/' + appPath;

    // Construct the full public URL path.
    // The base for new URL must be an absolute URL.
    const dummyAbsoluteBase = 'http://dummy';
    const publicPath = new URL(
      normalizedAppPath.substring(1),
      dummyAbsoluteBase + (BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/')
    ).pathname;

    if (window.location.pathname !== publicPath) {
      window.history.pushState({}, '', publicPath);
    }
    this.handleRoute(); // handleRoute will use getAppPath() to match
  }

  private handleRoute(): void {
    const appPathToMatch = this.getAppPath();
    const route = this.routes.find((r) => r.path === appPathToMatch);

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
