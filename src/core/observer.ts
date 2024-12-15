type TObserver = () => void;

let currentObserver: TObserver | null = null;

export const observe = (fn: TObserver): void => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};
export const observable = <T extends Record<string, any>>(obj: T): T => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers: Set<TObserver> = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },

      set(value) {
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });

  return obj;
};
