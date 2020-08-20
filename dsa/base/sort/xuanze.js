// 2 选择排序
// 算法原理
// 比较未排序区域的元素，每次选出最大或最小的元素放到排序区域。
// 一趟比较完成之后，再从剩下未排序的元素开始比较。
// 反复执行以上步骤，只到排序完成。

// 时间复杂度 O(n^2)

let nums = [4, 5, 7, 7, 4, 2, 2, 5, -2, 4, 2, 1, 9, 99]
function xuanzeSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    let set = i
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[set]) {
        set = j
      }
    }
    let temp = nums[set]
    nums[set] = nums[i]
    nums[i] = temp
  }
  console.log(nums)
  return nums
}
xuanzeSort(nums)