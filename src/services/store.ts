type Subscriber<T> = (value: T) => void;

class State<T> {
  private _value: T;
  private subscribers: Subscriber<T>[] = [];

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  get(): T {
    return this._value;
  }

  set(newValue: T | ((prev: T) => T)) {
    if (typeof newValue === 'function') {
      this._value = (newValue as (prev: T) => T)(this._value);
    } else {
      this._value = newValue;
    }
    this.subscribers.forEach((subscriber) => subscriber(this._value));
  }

  subscribe(callback: Subscriber<T>) {
    this.subscribers.push(callback);
    // Return an unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  }
}

export const counter = new State(0);
