let nums = [-22, 2, 3, 1, 12, 23, 22]

// 冒泡
// function sortSet1(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = 0; j < nums.length - i; j++) {
//       if (nums[i] < nums[j]) {
//         let temp = nums[i]
//         nums[i] = nums[j]
//         nums[j] = temp
//       }
//     }
//   }
//   console.log(nums)
//   return nums
// }
// 选择排序
// function sortSet1(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     let sel = i
//     for (let j = i + 1; j < nums.length - i; j++) {
//       if (nums[sel] > nums[j]) {
//         sel = j
//       }
//     }
//     let temp = nums[i]
//     nums[i] = nums[sel]
//     nums[sel] = temp
//   }
//   console.log(nums)
//   return nums
// }
// 插入排序
function sortSet1(nums) {
  for (let i = 1; i < nums.length; i++) {
    let temp = nums[i]
    let j
    for (j = i - 1; j >= 0 && temp < nums[j]; j--) {
      nums[j + 1] = nums[j]
    }
    nums[j + 1] = temp

  }
  console.log(nums)
  return nums
}
sortSet1(nums)