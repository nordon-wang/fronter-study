/** 
 * fs
 *  同步方法易使用 
 *  异步方法不会阻塞主线程
 */
const fs = require('fs')
const path = require('path')

// read时 path不对会报错
// write时 path不存在不会报错 会创建文件
/** 
 * 将文件读取到内存中，然后写入到指定的文件中
 * 若是读取大文件会存在性能文件，导致内存浪费，一般小于64KB可以使用
 */
/* fs.readFile(path.resolve(__dirname, './a.js'), (err, data) => {
  if(err) console.log(err);
  console.log(data);
  fs.writeFile(path.resolve(__dirname, './a2.js'), data, (err) => {
    if(err) console.log(err);
    console.log('success');
  })
})
 */

/** 
 * 读取大文件
 *  手动按字节读取 读一点 写一点 -- fs.open fs.read fs.write fs.close
 *  
 * fs.open 第二个参数
 * r 读取
 * w 写入
 * r+ 在读的基础上可以写，但是文件不存在会报错
 * w+ 在写的基础上可以读，若是文件不存在则会创建
 */
/* let buf = Buffer.alloc(3) // 定义三个大小的 buffer
fs.open(path.resolve(__dirname, './a.js'), 'r', (err, rfd) => {
  if(err) console.log(err);
  // console.log(fs); // file descriptor 文件描述符
  // 读取 rfd 代表的文件
  // buf 代表将读取的内容写到那个buffer 中
  // 0,3 从buf的第0个位置写入 写入3个
  // 0 从文件的那个闻之开始读取
  fs.open(path.resolve(__dirname, './open.js'), 'w', (err, wfd) => {
    fs.read(rfd, buf, 0, 3, 0, (err, bytesRead) => { //bytesRead 代表真正读取的个数
      if(err) console.log(err);
      fs.write(wfd, buf, 0, 3, 0, () => {
        fs.close(wfd, () => {
          console.log('close');
        })
      })
    })
  })
}) */


/** 
 * 创建目录
 */
function mkdir(paths, cb) {
  const filePath = paths.split('/')
  const fileLen = filePath.length + 1
  let index = 1

  // 递归调用
  function next() {
    if (index === fileLen) { // 结束
      return cb()
    }

    let dirPath = filePath.slice(0, index++).join('/')
    // 判断目录是否存在
    fs.access(dirPath, err => {
      if (err) { // 不存在 则创建, 然后继续递归调用
        fs.mkdir(dirPath, next)
      } else {
        next()
      }
    })
  }
  next()
}


function m() {
  mkdir(path.resolve(__dirname, 'a/b/d'), () => {
    console.log('创建完成了');
  })
  mkdir(path.resolve(__dirname, 'a/b/e'), () => {
    console.log('创建完成了');
  })
  mkdir(path.resolve(__dirname, 'a/c/f'), () => {
    fs.writeFile(path.resolve(__dirname, 'a/s.js'), 'asdasd', err => {
      console.log('创建完成了');
    })
  })
}

/** 
 * 删除目录
 *  直接使用 fs.rmdir 删除文件时，若是目录存在子目录或者文件结构，是不允许删除的 directory not empty
 */
const pathA = path.resolve(__dirname, './a')
// fs.rmdir(pathA, err => {
//   console.log(err);
// })

// fs.readdir(pathA, (err, data) => {
//   console.log(data);
// })

/** 
 * 深度遍历
 */

// 先序 深度 串行 遍历  -- 串连删除 一个一个的删除
function preDeep(dir, cb) {
  // 有子 就删除子
  // 子删除之后 删除自己
  fs.stat(dir, (err, statObj) => {
    if (err) return err;
    if (statObj.isFile()) { // 是文件， 直接删除
      // fs.unlink(dir, cb)
      console.log('删除');
      cb()
    } else { // 是目录 继续找
      // dirs 读取的 子结构
      fs.readdir(dir, (err, dirs) => {
        if (err) return err;
        dirs = dirs.map(item => path.join(dir, item))
        let index = 0
        console.log('数据:', index, dirs, dir);

        function next() { // 取出第一个删除
          if (index === dirs.length) { // 当dirs为空 或者 index和 dirs长度相等时
            // return fs.rmdir(dir, cb)
            console.log('删除时数据:', index, dirs, dir);
            console.log('cb---', cb)
            return cb()
          }
          let currentPath = dirs[index++]
          console.log('递归的数据:', index, currentPath, dirs, dir);
          preDeep(currentPath, next) // 删除当前第一个儿子，成功后删除第二个儿子
        }

        next()
      })
    }
  })
}

// preDeep(pathA, () => {
//   console.log('先序 深度 串行 遍历  -- 串连删除 一个一个的删除');
// })

// 先序 深度 并行 迭代 -- 并联删除 并行的删除自己的
function preParallDeep(dir, cb) {
  fs.stat(dir, (err, statObj) => {
    if (statObj.isFile()) {
      // fs.unlink(dir, cb)
      console.log('删除');
      cb()
    } else {
      fs.readdir(dir, (err, dirs) => {
        dirs = dirs.map(item => path.join(dir, item))

        console.log('数据:', dirs, dir);
        if (dirs.length === 0) { // 若是空文件夹 直接删除
          // fs.rmdir(dir, cb)
          cb()
        }
        let index = 0

        function done() { // 如果删除的子数量 和自己的index相等，说明子都删除完毕了
          console.log('回调数据', index, dirs.length, dirs, dir);
          if (++index === dirs.length) {
            console.log('删除时:', index);
            return cb()
            // return fs.rmdir(dir, cb)
          }
        }

        dirs.forEach(childDir => { // 迭代并行删除
          preParallDeep(childDir, done)
        })

      })
    }
  })
}

// m()
// preParallDeep(pathA, () => {
//   console.log('先序 深度 并行 迭代 -- 并联删除 并行的删除自己的');
// })

// 先序 深度 并行 迭代 promise写法-- 并联删除 并行的删除自己的
function preParallDeepPromise(dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stateObj) => {
      if (stateObj.isFile()) {
        console.log('删除');
        resolve()
        // fs.unlink(dir, resolve)
      } else {
        fs.readdir(dir, (err, dirs) => {
          let oldDirs = dirs
          dirs = dirs.map(item => preParallDeepPromise(path.join(dir, item)))
          console.log(oldDirs, dir);
          Promise.all(dirs).then(() => {
            console.log('-----', dir);
            resolve()
            // fs.rmdir(dir, resolve)
          })
        })
      }
    })
  })
}

// m() 
// preParallDeepPromise(pathA).then(() => {
//   console.log('先序 深度 并行 迭代 promise写法 -- 并联删除 并行的删除自己的');
// })

// 先序 深度 并行 async await 版本
const {
  unlink,
  readdir,
  stat,
  rmdir
} = require('fs').promises
async function preParallDeepAsync(dir) {
  const statObj = await stat(dir) /// 获取文件的描述
  if (statObj.isFile()) { // 是文件类型 直接删除
    await unlink(dir)
  } else {
    let dirs = await readdir(dir) // 获取当前路径下面的全部子目录

    // preParallDeepAsync('a/b') preParallDeepAsync('a/c') preParallDeepAsync('a/s.js')
    // 将子目录的进行递归调用 并转换为promise
    dirs = dirs.map(item => preParallDeepAsync(path.join(dir, item)))
    await Promise.all(dirs) // 执行子目录全部的删除操作
    await rmdir(dir) // 当前子目录删除完成之后  删除其父级目录
  }
}

// m() 
// preParallDeepAsync(pathA).then(() => {
//   console.log('先序 深度 并行 async await 版本');
// })



/** 
 * 广度遍历
 */
function wide(dir) {
  let arr = [dir]
  let index = 0
  let current
  while (current = arr[index++]) {
    let statObj = fs.statSync(current)
    if (statObj.isFile()) {
      // arr.push()
    } else {
      let dirs = fs.readdirSync(current)
      dirs = dirs.map(item => path.join(current, item))
      arr = [...arr, ...dirs]
    }

  }

  console.log(arr);
}

// m() 
// wide(pathA)