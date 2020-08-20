// 3.插入排序
// 算法原理
// 插入排序的基本操作就是将一个数据插入到已经排好序的有序数据中，
// 从而得到一个新的、个数加一的有序数据，算法适用于少量数据的排序

let nums = [3, 1]
function insertSort(nums) {
  for (let i = 1; i < nums.length; i++) { //从第二个元素开始插入，[0,i-1]都是有序数据
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
insertSort(nums)