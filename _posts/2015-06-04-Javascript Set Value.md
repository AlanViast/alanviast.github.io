---
layout: post
title: "JavaScript 多值赋值问题"
date:  2015-06-04 11:00:00
categories: ["JavaScript"]
---

#### 1.问题代码
```
var foo = {n: 1};
foo.x = foo = {n: 2};
```

#### 2.返回的结果
* foo.x输出的结果是Undefined


#### 3. 代码
```
var a = {n: 1};
var b = a;
a.x = a = {n: 2};
console.log( a.x );
console.log( b.x );
```

#### 4.输出结果
* a.x = Undefined
* b.x = {n: 2}


#### 5. 答案
* 个人觉得应该是 `a.x = a = {n: 2};` 执行的时候, `a.x`变量指向的是 `a` 的内存地址, 所以赋值改变的是原先的内存地址中的值