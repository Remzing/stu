// 682. 棒球比赛

/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function (ops) {
  let totalArr = [],
    prev1 = 0,
    prev2 = 0;
  ops.forEach(ele => {
    switch (ele) {
      case "C":
        if (totalArr.length) {
          totalArr.pop()
        }
        break
      case "D":
        prev1 = totalArr[totalArr.length - 1]
        totalArr.push(prev1 * 2)
        break
      case "+":
        prev1 = totalArr[totalArr.length - 1]
        prev2 = totalArr[totalArr.length - 2]
        totalArr.push(prev1 + prev2)
        break
      default:
        totalArr.push(Number(ele))
        break
    }
  })
  console.log(totalArr)
  return totalArr.reduce((curr, next) => {
    return Number(curr) + Number(next)
  }, 0)
};
calPoints(["5", "2", "C", "D", "+"])

// 可不用定义prev1，prev2 ，减少内存使用