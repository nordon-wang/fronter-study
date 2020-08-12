/** 
 * 链表
 *  操作数据, 不需要破坏数据的原有数据
 *  单向链表 双向链表 循环链表
*/


/** 
 * 单项链表
*/
class Node {
  constructor(element) {
    this.element = element
    this.next = null
    // this.prev = null
  }
}

class LinkList {
  constructor() {
    this.header = null
    this.length = 0
  }

  /** 
   * 添加元素
  */
  append(element) {
    const node = new Node(element)

    if (!this.header) { // 存在头部
      this.header = node
    } else {
      let index = 0 // 从0项开始查找
      let current = this.header // 先获取链表的header 开始查找

      // 查找最后一项
      while (++index < this.length) {
        // 若不是最后一项, 一直向后找, 一直找到最后一项
        current = current.next
      }

      current.next = node
    }

    this.length++
  }

  /** 
   * 插入
   *  position 插入的位置
   *  element 插入的元素
  */
  insert(position, element) {
    if (position > this.length) throw new Error('指针移除');
    
    const node = new Node(element)
    if(!this.header) {
      this.header = node
    } else {
      let index = 0
      let current = this.header
      let prev = null

      while (index++ < position) {
        prev = current
        current = current.next
      }

      prev.next = node
      node.next = current
    }
  }
}

const ll = new LinkList()

ll.append(1)
ll.append(2)
ll.append(3)

ll.insert(1, 100)
console.log(JSON.stringify(ll));
