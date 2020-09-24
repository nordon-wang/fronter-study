
/** 
 * 求一个对象的深度 -- 可以转换为求二叉树的高度
*/

let root = { // 1
  deep: 1,
  left: { // 2
    deep: 2,
    left: { // 3
      deep: 3,
      left: { // 4
        deep: 4,
        left: { // 5
        },
      },
      right: {},
    },
    right: {},
  },
  right: {},
};

const maxDepth = node => {
  if(!node) {
    return 0
  }else {
    let maxLeft = maxDepth(node.left)
    let maxRight = maxDepth(node.right)
    // let maxRight = 0

    return Math.max(maxLeft, maxRight) + 1
  }
}

console.log(maxDepth(root));
