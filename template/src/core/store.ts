/**
 * A minimal observable state container built on `EventTarget`.
 *
 * @example
 * const store = new Store({ count: 0 });
 * store.addEventListener('change', (e) => console.log(e.detail.count));
 * store.setState({ count: 1 });
 */
export class Store<T extends object> extends EventTarget {
  private state: T;

  constructor(initialState: T) {
    super();
    this.state = { ...initialState };
  }

  /** Returns a shallow copy of the state; mutating it does not change the store. */
  getState(): T {
    return { ...this.state };
  }

  /**
   * Shallow-merges `newState` into the state and dispatches a `change`
   * CustomEvent whose `detail` is the new state.
   */
  setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    this.dispatchEvent(new CustomEvent('change', { detail: this.getState() }));
  }
}
