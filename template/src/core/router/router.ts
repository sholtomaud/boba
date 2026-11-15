/** Values of the `:name` segments of the matched route, keyed by name. */
export type RouteParams = Record<string, string>;
/** The parsed query string of the current URL. */
export type RouteQuery = Record<string, string>;

/** Where a navigation is going. Passed to guards and `navigate` listeners. */
export interface RouteLocation {
  /** App path without the base URL or query string, e.g. `/user/ada`. */
  path: string;
  params: RouteParams;
  query: RouteQuery;
}

/**
 * Runs before a route's component is shown. Return `false` to cancel the
 * navigation, a path to redirect to it, or nothing to continue. May be async.
 */
export type RouteGuard = (
  to: RouteLocation
) => boolean | string | void | Promise<boolean | string | void>;

export interface RouteDefinition {
  /** App path. `:name` segments match any single segment, e.g. `/user/:id`. */
  path: string;
  /**
   * Tag name of the custom element to show. If it is not defined yet it is
   * lazy-loaded from `src/components/<tag>/<tag>.ts`.
   */
  component: string;
  beforeEnter?: RouteGuard;
}

interface RegisteredRoute extends RouteDefinition {
  regex: RegExp;
  paramNames: string[];
}

interface RouteMatch {
  route: RegisteredRoute;
  params: RouteParams;
}

type RoutedElement = HTMLElement & { params?: RouteParams; query?: RouteQuery };

/**
 * A small History API router. It renders the component of the matching route
 * into `#router-outlet`, and handles clicks on in-app links for the whole
 * page so components don't have to.
 *
 * Dispatches a `navigate` CustomEvent (detail: {@link RouteLocation}) after
 * every completed navigation, including ones that end on the not-found view.
 *
 * @example
 * const router = Router.getInstance();
 * router.notFound = 'not-found-page';
 * router.registerRoute({ path: '/user/:id', component: 'user-page' });
 * router.addEventListener('navigate', (e) => console.log(e.detail.path));
 * router.start();
 */
export class Router extends EventTarget {
  static instance: Router | undefined;
  routes: RegisteredRoute[] = [];
  /** App path (with query string) of the route currently shown. */
  currentPath = '';
  /**
   * Tag name of a component to show when no route matches or a route's
   * component fails to load. It is resolved like a route component. When
   * unset, a plain "404" heading is shown.
   */
  notFound: string | undefined;

  constructor() {
    super();
    window.addEventListener('popstate', () => {
      // In-page anchors (#section) also fire popstate; the view is unchanged.
      if (this.getAppPath() !== this.currentPath) this.handleRoute();
    });
    document.addEventListener('click', (event) => this.handleLinkClick(event));
  }

  /** The shared router. Components use this to navigate. */
  static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  /**
   * The path the app is served from, with a trailing slash: `/`, or e.g.
   * `/my-repo/` for a build made with `vite build --base /my-repo/`. It is
   * read from the page's `<base href>`, which index.html sets at build time.
   */
  get baseUrl(): string {
    const base = new URL(document.baseURI).pathname;
    return base.endsWith('/') ? base : base + '/';
  }

  /** The current URL as an app path: base URL removed, query string kept. */
  getAppPath(): string {
    const { pathname, search } = window.location;
    const base = this.baseUrl;
    const path = pathname.startsWith(base)
      ? pathname.slice(base.length - 1)
      : pathname;
    return path + search;
  }

  /** Adds a route. Routes are matched in registration order. */
  registerRoute(route: RouteDefinition): void {
    const path = route.path.startsWith('/') ? route.path : '/' + route.path;

    // '/user/:id' becomes /^\/user\/([^\/]+)$/ with paramNames ['id'].
    const paramNames: string[] = [];
    const regexSource = path.replace(/:([^/]+)/g, (_, name: string) => {
      paramNames.push(name);
      return '([^\\/]+)';
    });

    this.routes.push({
      ...route,
      path,
      regex: new RegExp(`^${regexSource}$`),
      paramNames,
    });
  }

  /** Renders the route for the current URL. Call once after registering routes. */
  start(): Promise<void> {
    return this.handleRoute();
  }

  /**
   * Goes to an app path, adding a history entry.
   * @param appPath Path relative to the app, e.g. `/todo` or `/search?q=tea`.
   */
  navigate(appPath: string): Promise<void> {
    return this.go(appPath.startsWith('/') ? appPath : '/' + appPath, true);
  }

  /** Renders the route for the current URL, e.g. after back/forward. */
  handleRoute(): Promise<void> {
    return this.go(this.getAppPath(), false);
  }

  /** Matches an app path, runs the route's guard and renders the result. */
  private async go(appPath: string, push: boolean): Promise<void> {
    const [path, queryString = ''] = appPath.split('?');
    const query = Object.fromEntries(new URLSearchParams(queryString));
    const match = this.findRoute(path);
    const to: RouteLocation = { path, params: match?.params ?? {}, query };
    const url = (target: string) => this.baseUrl + target.slice(1);

    const guardResult = await match?.route.beforeEnter?.(to);
    if (guardResult === false) {
      // Back/forward already changed the URL; point it at the page still shown.
      if (!push && this.currentPath) {
        window.history.pushState({}, '', url(this.currentPath));
      }
      return;
    }
    if (typeof guardResult === 'string') {
      return this.navigate(guardResult);
    }

    const { pathname, search } = window.location;
    if (push && pathname + search !== url(appPath)) {
      window.history.pushState({}, '', url(appPath));
    }
    this.currentPath = appPath;
    if (match) {
      await this.loadComponent(match.route.component, match.params, query);
    } else {
      await this.show404();
    }
    this.dispatchEvent(new CustomEvent('navigate', { detail: to }));
  }

  /** Finds the first registered route matching an app path (no query string). */
  findRoute(path: string): RouteMatch | null {
    for (const route of this.routes) {
      const match = path.match(route.regex);
      if (match) {
        const params: RouteParams = {};
        route.paramNames.forEach((name, index) => {
          params[name] = decodeURIComponent(match[index + 1]);
        });
        return { route, params };
      }
    }
    return null;
  }

  /**
   * Creates the component and puts it in the outlet. Route params are set as
   * properties on the element (so `/user/:name` sets `element.name`) and are
   * also available, with the query, as `element.params` / `element.query`.
   * Shows the not-found view if the component cannot be loaded.
   */
  async loadComponent(
    tagName: string,
    params: RouteParams = {},
    query: RouteQuery = {}
  ): Promise<void> {
    try {
      await this.render(tagName, params, query);
    } catch (error) {
      console.error(`Failed to load component: ${tagName}`, error);
      await this.show404();
    }
  }

  /** Shows the {@link notFound} component, or a plain heading without one. */
  async show404(): Promise<void> {
    try {
      if (this.notFound) return await this.render(this.notFound);
    } catch (error) {
      console.error(`Failed to load component: ${this.notFound}`, error);
    }
    const outlet = document.querySelector('#router-outlet');
    if (outlet) outlet.innerHTML = '<h1>404 - Page Not Found</h1>';
  }

  private async render(
    tagName: string,
    params: RouteParams = {},
    query: RouteQuery = {}
  ): Promise<void> {
    const outlet = document.querySelector('#router-outlet');
    if (!outlet) return;

    if (!customElements.get(tagName)) {
      await import(`../../components/${tagName}/${tagName}.ts`);
    }
    const element: RoutedElement = document.createElement(tagName);
    Object.assign(element, params);
    element.params = params;
    element.query = query;
    outlet.replaceChildren(element);
  }

  /**
   * Turns clicks on in-app links (`<a href="/docs">`) into navigations.
   * Links with a `target` or `download` attribute, external links and
   * modified clicks (new tab, etc.) are left to the browser.
   */
  private handleLinkClick(event: MouseEvent): void {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    const link = (event.target as Element).closest('a[href]');
    if (!link || link.hasAttribute('target') || link.hasAttribute('download')) {
      return;
    }
    const href = link.getAttribute('href')!;
    if (href.startsWith('#')) {
      // The page's <base> would send this to the app root; stay on this URL.
      event.preventDefault();
      window.location.hash = href;
    } else if (href.startsWith('/') && !href.startsWith('//')) {
      event.preventDefault();
      this.navigate(href);
    }
  }
}
