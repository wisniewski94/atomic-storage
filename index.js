export default class AtomStore {
    constructor(data) {
        this._events = {};
        this._store = data;
    }
    get store() {
        return this._store;
    }
    set store(value) {
        this._store = value;
        console.warn('Warning: store is set directly. This is not recommended. Use dispatch instead.');
    }
    on(name, callback) {
        if (!this._events[name]) {
            this._events[name] = [];
        }
        return this._events[name].push(callback);
    }
    dispatch(name, payload) {
        if (!Object.prototype.hasOwnProperty.call(this._events, name)) {
            return false;
        }
        const previousStore = this._store;
        this._store = Object.assign(Object.assign({}, this._store), payload);
        this._events[name].forEach(callback => callback(payload, previousStore, this._store));
        return true;
    }
}
