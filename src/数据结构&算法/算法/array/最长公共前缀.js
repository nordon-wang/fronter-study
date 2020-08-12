/**
 * 最长公共前缀
 * 编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，则返回""
 * 输入: ["flower","flow","flight"]
 *  输出: "fl"
 * 输入: ["dog","racecar","car"]
 *  输出: ""
 */

// const strArr = ["flow", "flight", "flower"];
const strArr = ["dog","racecar","car"]
const publicPre = (arr = []) => {
  if (!Array.isArray(arr)) {
    throw new Error("argument arr is must Array");
  }

  // 若是arr长度为0 则返回 ''
  if (!arr.length) {
    return "";
  }

  /**
   * 如果strings.Index(x1,x) == 0，则直接跳过（因为此时x就是x1的最长公共前缀），对比下一个元素。（如flower和flow进行比较）
   * 如果strings.Index(x1,x) != 0, 则截取掉基准元素x的最后一个元素，再次和x1进行比较，直至满足string.Index(x1,x) == 0，此时截取后的x为x和x1的最长公共前缀。（如flight和flow进行比较，依次截取出flow-flo-fl，直到fl被截取出，此时fl为flight和flow的最长公共前缀）
   */
  let str = arr.shift(); // 将第一个当作基准
  arr.forEach((item) => {
    while (!item.includes(str) && str !== '') {
      // 将str依次移除最后一位， 直到为true 或者 ''
      str = str.substring(0, str.length -1)
    }

  });
  console.log("str", str);
};

publicPre(strArr);
