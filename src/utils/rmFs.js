const path = require('path');
const fs = require('fs');

/**
 * 删除指定目录下的 某些文件
 */
const cwd = process.cwd();

fs.readdir(path.resolve(cwd, './src/vue'), function(err, files) {
  const reg = /[(.js)|(.js.map)]$/gi;

  files.forEach(fileName => {
    // console.log(fileName, reg.test(fileName));
    if (reg.test(fileName)) {
      fs.unlink(path.resolve(cwd, `./src/vue/${fileName}`), err => {
        console.log('删除失败');
      });
    }
  });
});
