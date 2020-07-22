let nums = [4, 5, 7, 7, 4, 2, 2, 5, -2, 4, 2, 1, 9, 99]

function maopaoSort(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 0; j < nums.length - i - 1; j++) {
      console.log
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