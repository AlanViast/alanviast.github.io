---
layout: post
title:  "初级算法题"
date:   2018-07-18 17:00:00
categories: code algorithm leetcode
---


### 1. 从排序数组中删除重复项

```
class Solution {
    public int removeDuplicates(int[] nums) {
        int index = 1;
        for (int i = 1; i < nums.length; i++) {
            boolean flag = true;
            for (int j = 0; j < index; j++) {
                if (nums[i] == nums[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                nums[index++] = nums[i];
            }
        }
        return index;
    }
}
```


### 2. 买卖股票的最佳时机 II

```
class Solution {
    
    
    public int maxProfit(int[] prices) {
        if (prices.length == 0) {
            return 0;
        }
        int maxProfitMoney = 0;
        int buy, sell = 0;
        do {
            buy = findDown(prices, sell);
            sell = findTop(prices, buy);
            if (buy == sell) {
                break;
            }
            maxProfitMoney += prices[sell] - prices[buy];
        } while (true);
        return maxProfitMoney;
    }

    public int findTop(int[] prices, int start) {
        int max = prices[start];
        for (int i = start; i < prices.length; i++) {
            if (max < prices[i]) {
                max = prices[i];
            } else if (max > prices[i]) {
                return i - 1;
            }
        }
        return prices.length - 1;
    }

    public int findDown(int[] prices, int start) {
        int max = prices[start];
        for (int i = start; i < prices.length; i++) {
            if (max > prices[i]) {
                max = prices[i];
            } else if (max < prices[i]) {
                return i - 1;
            }
        }
        return prices.length - 1;
    }

}
```


### 3. 旋转数组


```
class Solution {
    public void rotate(int[] nums, int k) {

        for (int ki = 0; ki < k; ki++) {
            for (int i = nums.length - 2; i >= 0; i--) {
                int temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i + 1] = temp;
            }
        }
    }
}
```

> [Source](https://blog.csdn.net/biezhihua/article/details/79535021)

```
public class Solution {
    public void rotate(int[] nums, int k) {
        if (k == 0 || nums.length <= 0) {
            return;
        } else {

        }
        k = (k % nums.length);
        System.out.println("k=" + k);
        reversArray(nums, 0, nums.length - k - 1);
        reversArray(nums, nums.length - k, nums.length - 1);
        reversArray(nums, 0, nums.length - 1);
    }

    public void reversArray(int[] nums, int start, int end) {
        while (start < end) {
            int tmp = nums[start];
            nums[start++] = nums[end];
            nums[end--] = tmp;
        }
    }
}
```



### 4. 存在重复

```
class Solution {
    public boolean containsDuplicate(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
}
```


### 5. 只出现一次的数字

```
class Solution {
    public int singleNumber(int[] nums) {
        int temp = 0;
        for (int i : nums) {
            temp ^= i;
        }
        return temp;
    }
}
```

### 6. 两个数组的交集 II

```
class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return intersect(nums2, nums1);
        }
        int step = 0;
        Arrays.sort(nums1);
        Arrays.sort(nums2);
        ArrayList<Integer> result = new ArrayList<>();
        for (int i = 0; i < nums1.length; i++) {
            for (int y = step; y < nums2.length; y++) {
                if (nums1[i] == nums2[y]) {
                    step = y + 1;
                    result.add(nums1[i]);
                    break;
                }
            }
        }
        return result.stream().mapToInt(i -> i).toArray();
    }
}
```