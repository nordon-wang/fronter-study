const Koa = require('./lib/application')

const app = new Koa()

//#region 
// app.use( ctx => {
//   // console.log('原生的', ctx.req.url);
//   // console.log('原生的', ctx.request.req.url);

//   // console.log('koa封装的', ctx.request.url);
//   // console.log('koa封装的', ctx.url); // 其实 ctx.url == ctx.request.url 在ctx上做一层代理

//   // console.log('原生的', ctx.req.method);
//   // console.log('原生的', ctx.request.req.method);

//   // console.log('koa封装的', ctx.request.method, ctx.request.path);
//   // console.log('koa封装的', ctx.method, ctx.path); // 其实 ctx.url == ctx.request.url 在ctx上做一层代理

//   // ctx.body === ctx.response.body
//   ctx.body = '好了'

//   console.log('body', ctx.body);
//   console.log('body', ctx.response.body);
// })
//#endregion




/** 
 * 所有的use组合在一起，其实就是一个 compose组合成了一个大的函数，组合的结果是一个promise
 * 中间件 use方法， 可以在在里面做一些操作，决定是否继续向下执行
 */

// 洋葱模型基本使用，打印 1 2 3 6 5 4
//#region 
/* app.use( (ctx, next) => {
  console.log('1');
  next()
  // next 等价下一个 ctx.use的回调
  // (ctx, next) => {
  //   console.log('2');
  //   next() // 这个next 又是下一个 ctx.use的回调
      // (ctx, next) => {
      //   console.log('3');
      //   next()
      //   console.log('6');
      // }
  //   console.log('5');
  // }
  console.log('4');
})
app.use( (ctx, next) => {
  console.log('2');
  next()
  console.log('5');
})
app.use( (ctx, next) => {
  console.log('3');
  next()
  console.log('6');
}) */


/* 
因此 可以认为
app.use( (ctx, next) => {
  console.log('1');
  next()
  console.log('4');
})
app.use( (ctx, next) => {
  console.log('2');
  next()
  console.log('5');
})
app.use( (ctx, next) => {
  console.log('3');
  next()
  console.log('6');
}) 

等价下面
app.use((ctx, next) => {
  console.log('1');
  (ctx, next) => {
    console.log('2');
    (ctx, next) => {
      console.log('3');
      next()
      console.log('6');
    }()
    console.log('5');
  }()
  console.log('4');
})
*/
//#endregion


const logger = () => {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      console.log('logger');
      resolve()
      clearTimeout(t)
    }, 1000);
  })
}
// async await 在第一个使用，不会发生变化，因为next
// 此时结果是 1 logger 2 3 6 5 4
//#region 
// 因为当执行到 logger() 时，会等待 logger执行完毕，next被阻塞在这个地方了
/* app.use( async (ctx, next) => {
  console.log('1');
  await logger() // 代码阻塞在这里了 等待一秒
  next()
  console.log('4');
})
app.use( (ctx, next) => {
  console.log('2');
  next()
  console.log('5');
})
app.use( (ctx, next) => {
  console.log('3');
  next()
  console.log('6');
}) */

/* 
app.use(async (ctx, next) => {
  console.log('1');
  await logger() // 代码阻塞在这里了 等待一秒
  ((ctx, next) => {
    console.log('2');
    ((ctx, next) => {
      console.log('3');
      next()
      console.log('6');
    }())
    console.log('5');
  }())
  console.log('4');
})
*/
//#endregion


// async await 不放在第一个use中使用
// 此时结果 1 2 4 logger 3 6 5， 若是想让代码按照洋葱模型顺序执行，在第一个use增加async await，等待next执行完，就可以了
//#region 
/* app.use( async (ctx, next) => {
  console.log('1');
  await next() // 当前执行next的时候，没有等待这个next执行完，但是外层的函数已经执行万完
  console.log('4');
})
app.use( async (ctx, next) => {
  console.log('2');
  await logger()
  next()
  console.log('5');
})
app.use( (ctx, next) => {
  console.log('3');
  next()
  console.log('6');
}) */

/* 
app.use((ctx, next) => {
  console.log('1');
  (async (ctx, next) => {
    console.log('2');
    await logger() // 代码阻塞在这里了 等待一秒，结合event loop，会继续执行打印4
    ((ctx, next) => {
      console.log('3');
      next()
      console.log('6');
    }())
    console.log('5');
  }())
  console.log('4');
})
*/

//#endregion


/** 
 * 在使用koa的时候，遇到next，为了保证执行顺序，需要在 next 前面增加一个await
 * 或者第一个use时， return next() 也可以，因为一个promise 内返回了一个 promise， 会等在里面的 promise执行完毕
*/
//#region 
/* 
app.use(async (ctx, next) => {
  console.log('1');
  ctx.body = 'log1'
  await next()
  ctx.body = 'log4 -- ' + Math.random()
  console.log('4');
})
app.use(async (ctx, next) => {
  console.log('2');
  ctx.body = 'log2'
  await logger()
  await next()
  ctx.body = 'log5'
  console.log('5');
})
app.use(async (ctx, next) => {
  console.log('3');
  ctx.body = 'log3'
  await next()
  ctx.body = 'log6'
  console.log('6');
}) */
//#endregion


app.use( async (ctx, next) => {
  console.log('1');
  ctx.body = 'a -- ' + Math.random()
  await next()
  console.log('4');
})

app.use( async (ctx, next) => {
  console.log('2');
  await logger()
  await next()
  console.log('3');
})

app.listen(4000)