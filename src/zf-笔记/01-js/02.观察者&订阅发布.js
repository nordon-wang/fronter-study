
/** 
 * 被观察者
*/
class Subject {
  constructor(name) {
    this.name = name
    this.arr = []
    this.state = '正常'
  }

  attach(o) {
    this.arr.push(o)
  }

  setState (newState){
    this.state = newState;
    
    this.arr.forEach(o => {
      o.update(newState);
    });
  }
}

/** 
 * 观察者
*/
class Observer {
  constructor(name) {
    this.name = name;
  }

  update(newState) {
    console.log(`观察者${this.name}接收到了被观察者的信息${newState}`);
  }
}

const s = new Subject()
const o1 = new Observer('nordon')
const o2 = new Observer('wy')

s.attach(o1)
s.attach(o2)

s.setState('新的状态')
