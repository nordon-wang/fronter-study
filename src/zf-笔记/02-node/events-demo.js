// const EventEmitter = require('events')
const EventEmitter = require('./events')



const emit = new EventEmitter()

// emit.on('newListener', type => {
//   process.nextTick(() => {
//     // console.log(`new listener ${type}`);
//     emit.emit(type)
//   })
// })

const fn1 = (actions) => {
  console.log('fn1...', actions);
}

const fn2 = (actions) => {
  console.log('fn2...', actions);
}

// emit.on('w', fn1)
// emit.on('w', fn2)
emit.once('w', fn1)
emit.remove('w', fn1)
emit.once('w', fn2)

// emit.emit('w', '执行了')
emit.emit('w', '执行了')