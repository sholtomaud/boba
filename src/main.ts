import './core/base-component';
import './core/router/router'; // Remove .ts extension
import { Router } from './core/router/router';
import './components/nav-page/nav-page.ts';
import './styles/global.css'; // Path relative to your main.ts file

const BASE_URL = import.meta.env.BASE_URL; // Provided by Vite

function getInitialAppPath(): string {
  const pathname = window.location.pathname;
  // Ensure BASE_URL ends with a slash for correct comparison and substringing,
  // unless it's the root path "/".
  const normalizedBaseUrl =
    BASE_URL.endsWith('/') || BASE_URL === '/' ? BASE_URL : BASE_URL + '/';

  if (pathname.startsWith(normalizedBaseUrl) && normalizedBaseUrl.length > 1) {
    // Don't strip if base is '/'
    let appPath = pathname.substring(normalizedBaseUrl.length);
    if (!appPath.startsWith('/')) {
      appPath = '/' + appPath;
    }
    return appPath === '' ? '/' : appPath; // e.g. /about or /
  }
  return pathname.startsWith('/') ? pathname : '/' + pathname; // Fallback or if BASE_URL is '/'
}

// Initialize router and register routes
const router = Router.getInstance();
router.registerRoute({ path: '/', component: 'home-page' });
router.registerRoute({ path: '/about', component: 'about-page' }); // Keeping about page for now
router.registerRoute({ path: '/todo', component: 'todo-page' }); // New To-Do page route

// Initial load
router.navigate(getInitialAppPath());
