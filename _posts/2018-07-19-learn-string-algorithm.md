---
layout: post
title:  "初级字符串算法题(3)"
date:   2018-07-20 19:00:00
categories: code algorithm leetcode string
---


### 1. 反转字符串
```
class Solution {
    public String reverseString(String s) {
        char[] chars = s.toCharArray();
        char[] newString = new char[chars.length];
        for (int i = chars.length - 1, t = 0; i >= 0; i--, t++) {
            newString[t] = chars[i];
        }
        return new String(newString);
    }
}
```


### 2. 颠倒整数

```
class Solution {
    public int reverse(int x) {
        long level = 0;
        int sign = x == Math.abs(x) ? 1 : -1;
        x = Math.abs(x);
        while (x > 0) {
            level = level * 10 + x % 10;
            x = x / 10;
        }
        return level < Integer.MAX_VALUE ? (int) (sign * level) : 0;
    }
}
```


### 3. 字符串中的第一个唯一字符


```
class Solution {
    public int firstUniqChar(String s) {
        if (s.length() == 1) {
            return 0;
        }
        char[] chars = s.toCharArray();
        for (int index = 0; index < chars.length; index++) {
            boolean flag = false;
            for (int innerIndex = 0; innerIndex < chars.length; innerIndex++) {
                if (index != innerIndex && chars[index] == chars[innerIndex]) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                return index;
            }
        }
        return -1;
    }
}
```

> [优化代码, 使用简易的Hash表](https://blog.csdn.net/biezhihua/article/details/79720346)

```
class Solution {
    public int firstUniqChar(String s) {
        int index = 0;
        int[] count = new int[26];
        char[] charArr = s.toCharArray();
        for (char i : charArr) {
            count[i - 'a']++;
        }
        while (index < charArr.length) {
            if (count[charArr[index++] - 'a'] == 1) {
                return index - 1;
            }
        }
        return -1;
    }
}
```


### 4. 有效的字母异位词

```
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }
        char[] sArr = s.toCharArray();
        char[] tArr = t.toCharArray();
        Arrays.sort(sArr);
        Arrays.sort(tArr);
        for (int i = 0; i < sArr.length; i++) {
            if (sArr[i] != tArr[i]) {
                return false;
            }
        }
        return true;
    }
}
```