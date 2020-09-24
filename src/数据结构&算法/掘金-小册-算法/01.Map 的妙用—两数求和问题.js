/** 
 * 真题描述： 给定一个整数数组 nums 和一个目标值 target，
 * 请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
*/

/** 
 * 示例: 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
*/

const sum = (arr = [], target = 0) => {
  if(!Array.isArray(arr)) {
    throw new Error('arguments arr is must array')
  }

  let obj = {}

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    // 注意不能直接使用 obj[target - value]， 因为索引存在 0 的场景
    if(obj[target - value] !== undefined) { // 存在
      return [obj[target - value], i]
    }

    obj[value] = i
  }
}


console.log(sum([2, 7, 11, 15], 9));
