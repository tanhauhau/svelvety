import { writable } from 'svelte/store';

export default function(target) {
  const store = writable(target);

  return {
    get: () => makeProxy(target, () => store.set(target)),
    subscribe: store.subscribe,
  };
}

function makeProxy(target, callback) {
  const proxy = new Proxy(target, {
    set(target, prop, value) {
      const _value =
        typeof value === 'object' ? makeProxy(value, callback) : value;
      Reflect.set(target, prop, _value);
      callback();
      return true;
    },
    deleteProperty(target, prop) {
      Reflect.deleteProperty(target, prop);
      callback();
      return true;
    },
  });
  return proxy;
}
