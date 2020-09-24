class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  add(val) {
    const node = new Node(val);
    if (!this.root) {
      // 不存在根节点
      this.root = node;
    } else {
      //  存在根节点 插入到对应的位置
      this.insert(this.root, node);
    }
  }

  /**
   * parent 当前需要插入的节点
   * node 需要插入的节点
   */
  insert(parent, node) {
    // 判断大小
    if (parent.value <= node.value) {
      // 若是大于 则向右查找， 看看右侧是否已经存在子节点，
      if (parent.right) {
        // 存在， 继续查找
        this.insert(parent.right, node);
      } else {
        // 不存在 作为叶子节点
        parent.right = node;
      }
    } else {
      // 若是小于 则向左查找, 看看左侧是否已经存在子节点，
      if (parent.left) {
        this.insert(parent.left, node);
      } else {
        parent.left = node;
      }
    }
  }

  // 前序遍历
  preIterator() {
    const log = (node) => {
      if (!node) {
        return;
      }

      console.log(node.value);
      log(node.left);
      log(node.right);
    };

    log(this.root);
  }

  // 中序遍历
  midIterator() {
    const log = (node) => {
      if (!node) {
        return;
      }

      log(node.left);
      console.log(node.value);
      log(node.right);
    };

    log(this.root);
  }

  // 后序遍历
  nextIterator() {
    const log = (node) => {
      if (!node) {
        return;
      }

      log(node.left);
      log(node.right);
      console.log(node.value);
    };

    log(this.root);
  }
}

const t = new Tree();

t.add(22);
t.add(19);
t.add(26);
t.add(24);
t.add(8);
t.add(36);
t.add(21);
t.add(12);
t.add(30);

console.log(t);

// t.preIterator()
// t.midIterator();
t.nextIterator()


/** 
 * 【瑞慈医疗】您的体检报告已上传，请登陆到
 * www.rich-healthcare.com
 * 查询体检报告，或下载官方APP“帮忙医”查询并在线解读。
 *  查询用户名:
 *  903101693833 
 * 密钥: 
 *  39109E
*/


/** 
 * 【人才管理】【哈啰出行】王耀 ，恭喜您通过我司面试，体检说明已发送至简历上的邮箱,请注意查收!请在3个工作日之内完成体检并通过链接上传体检报告。
 * 上传地址：https://bsurl.cn/1Zqq6X6s ；登录密钥：69cWIllGc1e10TWoHjN+06GZCp7sv7BOR9+bHjB23FHyVfHYycYVBcD+9jojunQ3QgjOh9oPDwA= 如果链接无法点击，请复制至浏览器打开。
*/


/** 
 * 【人才管理】王耀 女士/先生，恭喜您正式被上海钧丰网络科技有限公司（哈啰出行）录用，聘用offer以及入职须知已发送至简历上的邮箱，请注意查收。请在3个工作日之内完成体检并通过链接上传体检报告，。
 * http://h.c3x.me/0aoabi 如果链接无法点击，请复制至浏览器打开。体检相关说明见邮件附件。以上信息，如有疑问请拨打4000720026，谢谢！
*/




let obj = {
  name: '',
  age:12
}

function reactive(o) {
  let keys = Object.keys(o)

  keys.forEach(key => {
    define(o, key, o[key])
  })
}

const define = (o, key, value) => {
  Object.defineProperty(o, key, {
    get() {
      console.log('触发 getter');
      
      return value
    },
    set(newValue) {
      console.log('触发 setter');
      o[key] = newValue
    }
  })
}

reactive(obj)
console.log(obj);
