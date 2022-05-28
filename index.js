export default function Store() {
    this.events = [];
    this.store = [];
  
    const self = this;
  
    function on(event, callback) {
      if (!Object.prototype.hasOwnProperty.call(self.events, event)) {
        self.events[event] = [];
      }
  
      return self.events[event].push(callback);
    }
  
    function get(property) {
      return self.store[property];
    }
  
    function dispatch(event, payload = {}) {
      self.store = { ...self.store, ...payload };
      if (!Object.prototype.hasOwnProperty.call(self.events, event)) { return false; }
  
      return self.events[event].map((callback) => callback(payload));
    }
  
    return {
      on, get, dispatch,
    }
  }
  