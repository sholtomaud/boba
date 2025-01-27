import './core/base-component';
import './core/router/router'; // Remove .ts extension
import { Router } from './core/router/router';
import './components/nav-page/nav-page.ts';
import './styles/global.css'; // Path relative to your main.ts file

// Initialize router and register routes
const router = Router.getInstance();
router.registerRoute({ path: '/', component: 'home-page' });
router.registerRoute({ path: '/about', component: 'about-page' });

// Initial load
router.navigate(window.location.pathname);
