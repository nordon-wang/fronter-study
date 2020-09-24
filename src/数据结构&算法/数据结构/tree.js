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

