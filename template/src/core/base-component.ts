/**
 * Base class for Boba components: a Custom Element that renders its markup
 * and styles into the light DOM (no Shadow DOM, so global styles such as
 * Tailwind utilities apply).
 *
 * @example
 * import template from './my-card.html?raw';
 * import style from './my-card.css?raw';
 *
 * class MyCard extends BaseComponent {
 *   constructor() {
 *     super(template, style);
 *   }
 *   init() {
 *     this.delegate('click', 'button', () => console.log('clicked'));
 *   }
 * }
 * customElements.define('my-card', MyCard);
 */
export class BaseComponent extends HTMLElement {
  /** The component's styles and markup, cloned into the element on connect. */
  template: HTMLTemplateElement;

  /**
   * @param htmlContent The component's markup.
   * @param cssContent The component's styles. `:host` is rewritten to the
   *   element's tag name, which scopes rules like `:host h1 { … }` to this
   *   component. Selectors without `:host` are global.
   */
  constructor(htmlContent: string, cssContent: string) {
    super();
    const tagName = this.tagName.toLowerCase();
    const scopedCss = cssContent.replace(/:host/g, tagName);
    this.template = document.createElement('template');
    this.template.innerHTML = `<style>${scopedCss}</style>${htmlContent}`;
  }

  /** Set once the template is rendered and `init()` has run. */
  #rendered = false;

  /**
   * Custom Elements lifecycle. The first time the element is connected, it
   * renders the template and calls `init()`; on every connection it then
   * calls `connected()`. Moving the element (appending it elsewhere)
   * disconnects and reconnects it: it keeps its markup and state, `init()`
   * doesn't run again, and `connected()` restores what
   * `disconnectedCallback()` removed.
   */
  connectedCallback() {
    if (!this.#rendered) {
      this.#rendered = true;
      this.replaceChildren(this.template.content.cloneNode(true));
      this.init();
    }
    this.connected();
  }

  /**
   * Called once, when the markup is first in the DOM. Override it to query
   * elements and
   * attach listeners. Properties set by the router (route params, `params`,
   * `query`) are available here.
   */
  init() {}

  /**
   * Called on every connection, after `init()` the first time. Subscribe
   * here to objects that outlive the component (a shared store, the router,
   * `window`), and unsubscribe in `disconnectedCallback()`, so a component
   * that is removed leaves nothing behind and one that is moved keeps
   * working.
   */
  connected() {}

  /**
   * Listens for an event on the component and calls `handler` when it comes
   * from an element matching `selector`. Because the listener sits on the
   * component itself, it keeps working when the matching elements are
   * re-rendered.
   *
   * @param eventType A DOM event name, e.g. `'click'`.
   * @param selector CSS selector for the elements to handle the event for.
   * @param handler Receives the event and the matching element.
   */
  delegate(
    eventType: string,
    selector: string,
    handler: (event: Event, element: HTMLElement) => void
  ) {
    this.addEventListener(eventType, (event) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>(selector);
      if (element && this.contains(element)) {
        handler.call(this, event, element);
      }
    });
  }
}
