/** 
 * 处理响应相关的
 */

const response = {
  _body: '',
  get body() {
    // console.log('获取body', this._body);
    return this._body
  },
  set body(newVal) {
    // console.log('设置body', newVal);
    this._body = newVal
  }
}


module.exports = response