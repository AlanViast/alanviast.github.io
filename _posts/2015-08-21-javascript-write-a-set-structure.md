---
layout: post
title: "使用Javascript来编写一个Set结构"
date:  2015-08-21 16:00:00
categories: structure set javascript
---


#### 1. 具体代码

```javascript

var Alion = {};

Alion.Set = function(){};

Alion.Set.prototype = {
  elements: [],
  add: function() {
    var targetArr = this;
    var arg = this._toArray(arguments);
    arg.forEach(function(value) {
      if (!targetArr.contains(value)) {
        targetArr.push(value);
      }
    });
  },
  push: function(item) {
    this.elements.push(item);
  },
  remove: function() {
    var arg = this._toArray(arguments);
    this.elements = this.elements.filter(function(value) {
      return -1 === arg.indexOf(value);
    });
  },
  contains: function(item) {
    return -1 !== this.elements.indexOf(item);
  },
  toList: function() {
    return this._toArray(this.elements);
  },
  size: function() {
    return this.elements.length;
  },
  forEach: function(fn) {
    this.elements.forEach(fn);
  },
  _toArray: function(args) {
    var arg = Array.prototype.slice.call(args);
    return arg;
  }
};

```


#### 2. Demo

``` javascript

var set = new Alion.Set();

// 能一次性添加多个元素, 重复元素会被过滤掉
set.add(10, 10, 20);

set.size(); // => 2

// 判断是否包含元素
set.contains(10); // => true

// 可以一次性删除多个元素
set.remove(10);

set.contains(10); // => false

// push方法只能添加一个元素
set.push(10);

```