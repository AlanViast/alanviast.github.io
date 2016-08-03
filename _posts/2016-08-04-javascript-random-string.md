---
layout: post
title:  "Javascript 随机生成字符串"
date:   2016-8-4 00:10
categories: javascript code random string
---

#### Javascript 根据长度随机生成字符串

``` Javascript
var randomString = function (length) {
    var arr = new Array(Math.ceil(length/4));
    for (var i = 0; i < arr.length; i++) {
        arr[i] = Math.random().toString(32).substring(2,4)
    };
    return arr.join('').substring(0,length);
}
```