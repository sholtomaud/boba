import './styles/global.css';
import { Router } from './core/router/router.ts';
import './components/nav-page/nav-page.ts';

const router = Router.getInstance();
router.notFound = 'not-found-page';
router.registerRoute({ path: '/', component: 'home-page' });
router.registerRoute({ path: '/todo', component: 'todo-page' });
router.registerRoute({ path: '/users', component: 'users-page' });
router.registerRoute({ path: '/user/:name', component: 'user-page' });
router.start();

// Offline support (production builds only, so it never caches dev modules).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const firstVisit = !navigator.serviceWorker.controller;
  navigator.serviceWorker.register('sw.js');
  navigator.serviceWorker.ready.then(({ active }) => {
    // This load happened before the worker could cache it; hand it the URLs.
    if (firstVisit) {
      const loaded = performance.getEntriesByType('resource');
      active?.postMessage(loaded.map((entry) => entry.name));
    }
  });
}
