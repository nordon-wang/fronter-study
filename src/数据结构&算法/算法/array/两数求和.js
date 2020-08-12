// 示例: 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

const sum = (arr, target) => {
  if (arr === undefined || target === undefined) {
    throw new Error("arr is must");
  }

  if (!Array.isArray(arr)) {
    throw new Error("arr is not Array");
  }

  const res = {};

  for (let i = 0, len = arr.length; i < len; i++) {
    let current = arr[i];
    if (res[target - current] !== undefined) {
      return [res[target - current], i];
    } else {
      res[arr[i]] = i;
    }
    console.log("a", len);

    return [];
  }
};
const nums = [2, 11, 7, 15];
const t = 9;
// console.log(sum(nums, t));

// 真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
// 说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
// 示例: 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6], n = 3
// 输出: [1,2,2,3,5,6]
const merge = function (nums1, m, nums2, n) {
  // 初始化两个指针的指向，初始化 nums1 尾部索引k
  let i = m - 1,
    j = n - 1,
    k = m + n - 1;
  // 当两个数组都没遍历完时，指针同步移动
  while (i >= 0 && j >= 0) {
    // 取较大的值，从末尾往前填补
    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i];
      i--;
      k--;
    } else {
      nums1[k] = nums2[j];
      j--;
      k--;
    }
  }

  // nums2 留下的情况，特殊处理一下
  while (j >= 0) {
    nums1[k] = nums2[j];
    k--;
    j--;
  }

  console.log(nums1);
};

var nums1 = [1, 2, 3, 0, 0, 0],
  m = 3;
var nums2 = [2, 5, 6],
  n = 3;
merge(nums1, m, nums2, n);

// 真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
// 示例： 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  // 用于存放结果数组
  let res = [];
  // 目标值为0
  let sum = 0;
  // 给 nums 排序
  nums = nums.sort((a, b) => {
    return a - b;
  });
  // 缓存数组长度
  const len = nums.length;
  // 注意我们遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
  for (let i = 0; i < len - 2; i++) {
    // 左指针 j
    let j = i + 1;
    // 右指针k
    let k = len - 1;
    // 如果遇到重复的数字，则跳过
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    while (j < k) {
      // 三数之和小于0，左指针前进
      if (nums[i] + nums[j] + nums[k] < 0) {
        j++;
        // 处理左指针元素重复的情况
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }
      } else if (nums[i] + nums[j] + nums[k] > 0) {
        // 三数之和大于0，右指针后退
        k--;

        // 处理右指针元素重复的情况
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      } else {
        // 得到目标数字组合，推入结果数组
        res.push([nums[i], nums[j], nums[k]]);

        // 左右指针一起前进
        j++;
        k--;

        // 若左指针元素重复，跳过
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }

        // 若右指针元素重复，跳过
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      }
    }
  }

  // 返回结果数组
  return res;
};


const threeSum2 = arr => {
  let res = [] // 存储结果

  // 排序
  arr = arr.sort((a,b) =>  a - b)

  // 遍历
  for (let i = 0, len = arr.length; i < len - 2; i++) {
    let l = i + 1 // left point
    let r = len - 1 // right point
    
    // if same, continue
    if(i > 0 && arr[i] === arr[i - 1]) {
      continue;
    }


    while (l < r) {
      if(arr[i] + arr[l] + arr[r] < 0) { // < 0, 左边的小了 l++
        l++
        
        // 处理左元素重复
        while (l < r && arr[l] === arr[l-1]) {
          l++
        }
      } else if(arr[i] + arr[l] + arr[r] > 0) { // > 0, 右边的大了 r--
        r--

        // 处理右元素重复
        while (l < r && arr[r] === arr[r - 1]) {
          r--
        }
      } else { // 添加结果
        res.push([arr[i], arr[l], arr[r]])

        l++
        j--

        // 处理左元素重复
        while (l < r && arr[l] === arr[l-1]) {
          l++
        }

        // 处理右元素重复
        while (l < r && arr[r] === arr[r - 1]) {
          r--
        }
      }
    }

  }

  return res
}
