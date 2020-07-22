// 递归  动态规划

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function (nums, k) {
  let total = nums.reduce((sum, curr, currIndex) => {
    return sum + curr
  })
  total = total / k
  if (total !== parseInt(total)) return false
  nums.sort()
  if (nums[nums.length - 1] > total) return false

  let search = () => {

  }
  return true
};

var canPartitionKSubsets1 = function (nums, k) {
  var sum = 0;
  for (var i = nums.length - 1; i >= 0; i--) {
    sum += nums[i];
  }
  nums.sort((a, b) => b - a)
  let sums = new Array(k).fill(0)
  return backtrace(nums, sums, 0, k, sum / k);
};
function backtrace(nums, sums, i, k, average) {
  if (i === nums.length) return true;
  for (let j = 0; j < k; j++) {
    if (sums[j] < average && nums[i] + sums[j] <= average) {
      sums[j] += nums[i];
      if (backtrace(nums, sums, i + 1, k, average)) {
        return true;
      }
      sums[j] -= nums[i]
    }
  }
  return false;
}