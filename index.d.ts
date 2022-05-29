declare type AtomEventName = string;
export default class AtomStore<T> {
    private _events;
    private _store;
    constructor(data?: T);
    get store(): T;
    set store(value: T);
    on(name: AtomEventName, callback: (payload: T, oldStore: T, newStore: T) => void): number;
    dispatch(name: AtomEventName, payload: T): boolean;
}
export {};
