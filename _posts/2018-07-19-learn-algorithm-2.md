---
layout: post
title:  "初级算法题(2)"
date:   2018-07-19 17:00:00
categories: code algorithm leetcode
---

### 1. 加一

```
class Solution {
    public int[] plusOne(int[] digits) {
        boolean addValue = false;
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] + 1 == 10) {
                digits[i] = 0;
            } else {
                digits[i] += 1;
                return digits;
            }
        }
        int[] newDigits = new int[digits.length + 1];
        System.arraycopy(digits, 0, newDigits, 1, digits.length);
        newDigits[0] = 1;
        return newDigits;
    }
}
```

### 2. 移动零

> [参考例子](https://www.jianshu.com/p/0b69d11cb550)

```
class Solution {
    public void moveZeroes(int[] nums) {
        int j = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                nums[j++] = nums[i];
            }
        }
        while (j < nums.length) {
            nums[j++] = 0;
        }
    }
}
```

### 3. 两数之和

```
class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            int hopeValue = target - nums[i];
            for(int j = i + 1; j < nums.length; j++) {
                if(nums[j] == hopeValue) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[0];
    }
}
```


### 4. 

```
class Solution {
    public boolean isValidSudoku(char[][] board) {
        if (!isValidSudokuRow(board) || !isValidSudokuCol(board) || !isValidSudokuBlock(board)) {
            return false;
        }
        return true;
    }

    public boolean isValidSudokuBlock(char[][] board) {
        int total = 9;
        for (int row = 0; row < total; row += 3) {
            for (int col = 0; col < total; col += 3) {
                ArrayList arrayList = new ArrayList();
                for (int item = 0; item < 3; item++) {
                    for (int colItem = 0; colItem < 3; colItem++) {
                        char value = board[row + item][col + colItem];
                        if (!hasItem(arrayList, value)) {
                            return false;
                        }
                        System.out.print(value + ",");
                    }
                }
                System.out.println();
            }

        }
        return true;
    }

    public boolean hasItem(List list, char value) {
        if (value == '.') {
            // 忽略
        } else if (list.contains(value)) {
            return false;
        } else {
            list.add(value);
        }
        return true;
    }

    public boolean isValidSudokuCol(char[][] board) {
        int total = 9;
        for (int row = 0; row < total; row++) {
            ArrayList arrayList = new ArrayList();
            for (int col = 0; col < total; col++) {
                char value = board[col][row];
                if (!hasItem(arrayList, value)) {
                    return false;
                }
            }
        }
        return true;
    }

    public boolean isValidSudokuRow(char[][] board) {
        int total = 9;
        for (int row = 0; row < total; row++) {
            ArrayList arrayList = new ArrayList();
            for (int col = 0; col < total; col++) {
                char value = board[row][col];
                if (!hasItem(arrayList, value)) {
                    return false;
                }
            }
        }
        return true;
    }
}
```
