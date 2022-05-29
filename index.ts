type AtomEventName = string;

interface AtomEvent {
  (...args: any[]): void;
}

interface AtomEvents {
  [key: AtomEventName]: AtomEvent[];
}

export default class AtomStore<T> {
  private _events: AtomEvents = {};
  private _store: T;
  
  constructor(data?: T) {
    this._store = data;
  }

  get store() {
    return this._store;
  }

  set store(value) {
    this._store = value;
    console.warn('Warning: store is set directly. This is not recommended. Use dispatch instead.');
  }

  public on(name: AtomEventName, callback: (payload: T, oldStore: T, newStore: T) => void) {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    
    return this._events[name].push(callback);
  }

  public dispatch(name: AtomEventName, payload: T) {
    if (!Object.prototype.hasOwnProperty.call(this._events, name)) {
      return false;
    }

    const previousStore = this._store;

    this._store = {
      ...this._store,
      ...payload
    }

    this._events[name].forEach(callback => callback(payload, previousStore, this._store))

    return true;
  }

}