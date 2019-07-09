class EventEmmiter {
  constructor() {
    this._map = new Map();
  }
  emit(eventName, ...args) {
    const listeners = this._map.get(eventName);
    listeners.forEach(cur => cur(...args));
  }

  on(eventName, listener) {
    const listeners = this._map.get(eventName);
    if (listeners) {
      this._map.set(eventName, listeners.concat(listener));
    } else {
      this._map.set(eventName, [listener]);
    }
  }

  removeListener(eventName, listener) {
    const listeners = this._map.get(eventName);
    this._map.set(eventName, listeners.filter(cur => cur !== listener));
  }
}

const emmiter = new EventEmmiter();

function someEvents(...args) {
  console.log('some events: ', ...args);
}

emmiter.on('some_event', someEvents);
emmiter.emit('some_event', 'Nikita', 'Akulich');

emmiter.removeListener('some_event', someEvents);
emmiter.emit('some_event', 'Nikita', 'Akulich');
