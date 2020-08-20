
// 1 冒泡排序
// 算法原理
// 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
// 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
// 针对所有的元素重复以上的步骤，除了最后一个。
// 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
// 这个算法的名字由来是因为越大的元素会经由交换慢慢“浮”到数列的顶端（升序或降序排列），就如同碳酸饮料中二氧化碳的气泡最终会上浮到顶端一样，故名“冒泡排序”。

// 时间复杂度 O(n^2)

let nums = [4, 5, 7, 7, 4, 2, 2, 5, -2, 4, 2, 1, 9, 99]
function maopaoSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i; j++) {
      if (nums[j] > nums[j + 1]) {
        let temp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = temp
      }
    }
  }
  console.log(nums)
  return nums
}
maopaoSort(nums)