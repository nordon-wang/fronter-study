/**
 * 两个数组的交集
 * 输入: nums1 = [1,2,2,1], nums2 = [2,2]
 *  输出: [2,2]
 * 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 *  输出: [4,9]
 */
const intersect = (arr1 = [], arr2 = []) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error("arguments is must array");
  }

  let result = {};

  arr1.forEach((key, index) => {
    if (arr2.includes(key)) {
      result[index] = key;
    }
  });

  return Object.values(result);
};
// let nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// let nums1 = [1,2,2,1], nums2 = [2,2]
// intersect(nums1, nums2)

/**
 * 题目在进阶问题中问道：如果给定的数组已经排好序呢？你将如何优化你的算法？我们分析一下，假如两个数组都是有序的，分别为：arr1 = [1,2,3,4,4,13]，arr2 = [1,2,3,9,10]
 *  双指针
 *  1,2,3,4,4,13
 *  1,2,3,9,10
 */
const doublePoint = (arr1 = [], arr2 = []) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error("arguments is must array");
  }

  let i = 0,
    j = 0; //
  let iLen = arr1.length;
  let jLen = arr2.length;
  let result = [];

  while (i < iLen && j < jLen) {
    if (arr1[i] === arr2[j]) {
      // 如果相等 就添加到 result, i j ++
      result.push(arr1[i]);
      i++
      j++
    } else if (arr1[i] < arr2[j]) {
      // 若是小于 则移动 i， j不动
      i++
    } else if (arr1[i] > arr2[j]) {
      // 若是大于 则移动j，i不动
      j++
    }
  }

  console.log(result);
};

let arr1 = [1,2,3,4,4,13], arr2 = [1,2,3,9,10]
doublePoint(arr1, arr2)