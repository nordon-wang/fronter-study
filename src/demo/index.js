function reactive(data, cb) {
  let res = null;
  let timer = null;

  res = data instanceof Array ? [] : {};

  for (let key in data) {
    if (typeof data[key] === 'object') {
      res[key] = reactive(data[key], cb);
    } else {
      res[key] = data[key];
    }
  }

  return new Proxy(res, {
    get(target, key) {
      return Reflect.get(target, key);
    },
    set(target, key, val) {
      let res = Reflect.set(target, key, val);
      clearTimeout(timer);
      timer = setTimeout(() => {
        cb && cb();
      }, 0);
      return res;
    }
  });
}

let data = { foo: 'foo', bar: [1, 2] };
let p = reactive(data, () => {
  console.log('trigger');
});
p.bar.push(3);
console.log(p.bar);

// trigger
const rawToReactive = new WeakMap();
const reactiveToRaw = new WeakMap();

// utils
function isObject(val) {
  return typeof val === 'object';
}

function hasOwn(val, key) {
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  return hasOwnProperty.call(val, key);
}

// traps
function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    return isObject(res) ? reactive(res) : res;
  };
}

function set(target, key, val, receiver) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];

  val = reactiveToRaw.get(val) || val;
  const result = Reflect.set(target, key, val, receiver);

  if (!hadKey) {
    console.log('trigger ...');
  } else if (val !== oldValue) {
    console.log('trigger ...');
  }

  return result;
}

// handler
const mutableHandlers = {
  get: createGetter(),
  set: set
};

// entry
function reactive(target) {
  return createReactiveObject(
    target,
    rawToReactive,
    reactiveToRaw,
    mutableHandlers
  );
}

function createReactiveObject(target, toProxy, toRaw, baseHandlers) {
  let observed = toProxy.get(target);
  // 原数据已经有相应的可响应数据, 返回可响应数据
  if (observed !== void 0) {
    return observed;
  }
  // 原数据已经是可响应数据
  if (toRaw.has(target)) {
    return target;
  }
  observed = new Proxy(target, baseHandlers);
  toProxy.set(target, observed);
  toRaw.set(observed, target);
  return observed;
}

function mouseEvent() {
  onMounted(() => {});

  onUpdated(() => {});
}

const component = {
  template: `<div>{x}</div>`,
  setup() {
    const x = value(0);
    const y = value(0);

    const update = e => {
      x.value = e.pageX;
      y.value = e.pageY;
    };

    onMounted(() => {
      window.addEventListener('mousemove', update);
    });

    onUnmounted(() => {
      window.removeEventListener('mousemove', update);
    });

    return {
      x,
      y
    };
  }
};

const c1 = {
  props: {
    name: String
  },
  setup(props) {
    console.log(props.name);
  }
};
