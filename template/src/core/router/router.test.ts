import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import { Router, type RouteLocation } from './router.ts';

// A stand-in for the few browser APIs the router touches.
let rendered: Array<Record<string, unknown>>;
let outlet: { innerHTML: string; replaceChildren: (el: never) => void };
let clickListener: (event: object) => void;

function setUrl(url: string) {
  const [pathname, search = ''] = url.split('?');
  Object.assign(window.location, {
    pathname,
    search: search && '?' + search,
  });
}

beforeEach(() => {
  rendered = [];
  outlet = { innerHTML: '', replaceChildren: (el) => rendered.push(el) };
  Object.assign(globalThis, {
    window: {
      location: { pathname: '/', search: '', hash: '' },
      addEventListener: () => {},
      history: {
        pushState: (_: object, __: string, url: string) => setUrl(url),
      },
    },
    document: {
      baseURI: 'http://localhost/',
      querySelector: () => outlet,
      createElement: (tagName: string) => ({ tagName }),
      addEventListener: (_: string, listener: typeof clickListener) => {
        clickListener = listener;
      },
    },
    customElements: { get: (tagName: string) => tagName !== 'missing-page' },
  });
});

describe('Router', () => {
  test('matches static routes', () => {
    const router = new Router();
    router.registerRoute({ path: '/', component: 'home' });
    router.registerRoute({ path: 'about', component: 'about' });

    assert.strictEqual(router.findRoute('/')?.route.component, 'home');
    assert.strictEqual(router.findRoute('/about')?.route.component, 'about');
    assert.strictEqual(router.findRoute('/nope'), null);
  });

  test('extracts and decodes route parameters', () => {
    const router = new Router();
    router.registerRoute({ path: '/post/:year/:slug', component: 'blog-post' });

    const match = router.findRoute('/post/2026/hello%20world');
    assert.deepStrictEqual(match?.params, {
      year: '2026',
      slug: 'hello world',
    });
    assert.strictEqual(router.findRoute('/post/2026'), null);
  });

  test('renders the component with params and query, then emits navigate', async () => {
    const router = new Router();
    router.registerRoute({ path: '/user/:id', component: 'user-page' });
    const seen: RouteLocation[] = [];
    router.addEventListener('navigate', (event) =>
      seen.push((event as CustomEvent<RouteLocation>).detail)
    );

    await router.navigate('/user/7?tab=posts');

    assert.deepStrictEqual(rendered, [
      {
        tagName: 'user-page',
        id: '7',
        params: { id: '7' },
        query: { tab: 'posts' },
      },
    ]);
    assert.deepStrictEqual(seen, [
      { path: '/user/7', params: { id: '7' }, query: { tab: 'posts' } },
    ]);
  });

  test('works under a base URL', async () => {
    Object.assign(document, { baseURI: 'http://localhost/my-repo/' });
    const router = new Router();
    router.registerRoute({ path: '/docs', component: 'docs-page' });

    await router.navigate('/docs');
    assert.strictEqual(window.location.pathname, '/my-repo/docs');
    assert.strictEqual(router.getAppPath(), '/docs');
    assert.strictEqual(rendered.length, 1);
  });

  test('a guard can cancel or redirect a navigation', async () => {
    const router = new Router();
    router.registerRoute({ path: '/', component: 'home-page' });
    router.registerRoute({ path: '/login', component: 'login-page' });
    router.registerRoute({
      path: '/locked',
      component: 'locked-page',
      beforeEnter: () => false,
    });
    router.registerRoute({
      path: '/account',
      component: 'account-page',
      beforeEnter: async (to) => (to.query.token ? true : '/login'),
    });
    const shown = () => rendered.map((element) => element.tagName);

    await router.navigate('/');
    await router.navigate('/locked');
    assert.deepStrictEqual(shown(), ['home-page']);
    assert.strictEqual(router.getAppPath(), '/');

    await router.navigate('/account');
    assert.deepStrictEqual(shown(), ['home-page', 'login-page']);
    assert.strictEqual(router.getAppPath(), '/login');

    await router.navigate('/account?token=1');
    assert.strictEqual(shown().at(-1), 'account-page');
  });

  test('shows the notFound component for unknown routes', async () => {
    const router = new Router();
    await router.navigate('/nope');
    assert.match(outlet.innerHTML, /404/);

    router.notFound = 'not-found-page';
    await router.navigate('/still-nope');
    assert.strictEqual(rendered.at(-1)?.tagName, 'not-found-page');
  });

  test('shows the not-found view when a component fails to load', async (t) => {
    t.mock.method(console, 'error', () => {});
    const router = new Router();
    router.registerRoute({ path: '/broken', component: 'missing-page' });

    await router.navigate('/broken');
    assert.match(outlet.innerHTML, /404/);
  });

  test('handles clicks on in-app links only', () => {
    const router = new Router();
    const navigated: string[] = [];
    router.navigate = async (path) => void navigated.push(path);

    const click = (attributes: Record<string, string>, extra = {}) => {
      let prevented = false;
      const link = {
        getAttribute: (name: string) => attributes[name],
        hasAttribute: (name: string) => name in attributes,
      };
      clickListener({
        button: 0,
        target: { closest: () => link },
        preventDefault: () => (prevented = true),
        ...extra,
      });
      return prevented;
    };

    assert.strictEqual(click({ href: '/docs' }), true);
    assert.strictEqual(click({ href: 'https://example.com' }), false);
    assert.strictEqual(click({ href: '//example.com' }), false);
    assert.strictEqual(click({ href: '/file', download: '' }), false);
    assert.strictEqual(click({ href: '/new', target: '_blank' }), false);
    assert.strictEqual(click({ href: '/new-tab' }, { ctrlKey: true }), false);
    assert.deepStrictEqual(navigated, ['/docs']);

    assert.strictEqual(click({ href: '#intro' }), true);
    assert.strictEqual(window.location.hash, '#intro');
  });
});
