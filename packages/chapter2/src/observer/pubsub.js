const state = {};
let subscribers = [];

export const 구독 = (fn) => {
  subscribers.push(fn.bind(state));
  fn();
};

export const 발행기관 = (obj) => {
  for (let [key, value] of Object.entries(obj)) {
    // console.log(key, value);
    Object.defineProperty(state, key, {
      get() {
        return value;
      },
      set(newVal) {
        value = newVal;
        subscribers.forEach((subscriber) => subscriber());
      },
      configurable: true,
    });
  }
  return state;
};

const test = 발행기관({ a: 10, b: 1000 });
console.log(test.a);
console.log(test.b);
test.a = 99;
console.log(test.a);
