/**
 * 快排
 *  1.随机选择数据中的一个数字Num，以这个数为基准
 *  2.其他数与这个数进行比较，小于的放在左边，大于的放到右边
 *  3.经过一次循环遍历周后，Num左边的都是小于Num的，Num右边的都是大于Num的
 *  4.将左边和右边的数递归进行上述过程
 */

// 划分操作函数
function partition(array, left, right) {
  // 用index取中间值而非splice
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (compare(array[i], pivot) === -1) {
      i++;
    }
    while (compare(array[j], pivot) === 1) {
      j--;
    }
    if (i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}

// 原地交换函数，而非用临时数组
function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}

// 比较函数
function compare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

function quick(array, left, right) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right);
    if (left < index - 1) {
      quick(array, left, index - 1);
    }
    if (index < right) {
      quick(array, index, right);
    }
  }
  return array;
}
function quickSort(array) {
  return quick(array, 0, array.length - 1);
}

const Arr = [85, 24, 63, 45, 17, 31, 96, 66, 50];
console.log(quickSort(Arr));
