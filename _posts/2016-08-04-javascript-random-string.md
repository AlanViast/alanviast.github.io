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


#### 一行代码的随机生成字符串

[open link](http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript)

``` Javascript
var randomString = function (length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}
```

#### 简单型随机字符串

``` Javascript
var randomString = function(length) {
    var text = '', possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
```