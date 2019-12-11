function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

Node.prototype = {
  show: function() {
    console.log(this.data);
  }
};

function Tree() {
  this.root = null;
}

Tree.prototype = {
  insert: function(data) {
    var node = new Node(data, null, null);
    if (!this.root) {
      this.root = node;
      return;
    }
    var current = this.root;
    var parent = null;
    while (current) {
      parent = current;
      if (data < parent.data) {
        current = current.left;
        if (!current) {
          parent.left = node;
          return;
        }
      } else {
        current = current.right;
        if (!current) {
          parent.right = node;
          return;
        }
      }
    }
  },
  preOrder: function(node) {
    if (node) {
      node.show();
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  },
  middleOrder: function(node) {
    if (node) {
      this.middleOrder(node.left);
      node.show();
      this.middleOrder(node.right);
    }
  },
  laterOrder: function(node) {
    if (node) {
      this.laterOrder(node.left);
      this.laterOrder(node.right);
      node.show();
    }
  },
  getMin: function() {
    var current = this.root;
    while (current) {
      if (!current.left) {
        return current;
      }
      current = current.left;
    }
  },
  getMax: function() {
    var current = this.root;
    while (current) {
      if (!current.right) {
        return current;
      }
      current = current.right;
    }
  },
  getDeep: function(node, deep) {
    deep = deep || 0;
    if (node == null) {
      return deep;
    }
    deep++;
    var dleft = this.getDeep(node.left, deep);
    var dright = this.getDeep(node.right, deep);
    return Math.max(dleft, dright);
  },
  getNode: function(data, node) {
    if (node) {
      if (data === node.data) {
        return node;
      } else if (data < node.data) {
        return this.getNode(data, node.left);
      } else {
        return this.getNode(data, node.right);
      }
    } else {
      return null;
    }
  }
};

var t = new Tree();
t.insert(3);
t.insert(8);
t.insert(1);
t.insert(2);
t.insert(5);
t.insert(7);
t.insert(6);
t.insert(0);

console.log('-----', t);

// t.middleOrder(t.root);
// console.log(t.getMin(), t.getMax());
// console.log(t.getDeep(t.root, 0));
// console.log(t.getNode(5, t.root));

var inorderTraversal = function(root, array = []) {
  if (root) {
    inorderTraversal(root.left, array);
    array.push(root.data);
    inorderTraversal(root.right, array);
  }

  return array;
};

var preorderTraversal = function(root, array = []) {
  if (root) {
    array.push(root.data);
    preorderTraversal(root.left, array);
    preorderTraversal(root.right, array);
  }
  return array;
};

var postorderTraversal = function(root, array = []) {
  if (root) {
    postorderTraversal(root.left, array);
    postorderTraversal(root.right, array);
    array.push(root.data);
  }
  return array;
};

console.log('中序', inorderTraversal(t.root));
console.log('前序', preorderTraversal(t.root));
console.log('后序', postorderTraversal(t.root));

function reConstructBinaryTree(pre, vin) {
  if (pre.length === 0) {
    return null;
  }
  if (pre.length === 1) {
    return new Node(pre[0]);
  }
  const value = pre[0];
  const index = vin.indexOf(value);
  const vinLeft = vin.slice(0, index);
  const vinRight = vin.slice(index + 1);
  const preLeft = pre.slice(1, index + 1);
  const preRight = pre.slice(index + 1);
  const node = new Node(value);
  node.left = reConstructBinaryTree(preLeft, vinLeft);
  node.right = reConstructBinaryTree(preRight, vinRight);
  return node;
}

// let res1 = reConstructBinaryTree(
//   [1, 2, 4, 7, 3, 5, 6, 8],
//   [4, 7, 2, 1, 5, 3, 8, 6]
// );
// console.log(res1);
function Mirror(root) {
  if (root) {
    const temp = root.right;
    root.right = root.left;
    root.left = temp;
    Mirror(root.right);
    Mirror(root.left);
  }
}

Mirror(t.root);
console.log(t);
