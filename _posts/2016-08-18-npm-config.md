---
layout: post
title:  "Npm 在国内下载速度过慢的解决方法"
date:   2016-04-29 01:30
categories: node npm
---


#### 1.设置 npm source 为淘宝源

> $ vim ~/.npmrc

```
# .npmrc
registry=https://registry.npm.taobao.org/
disturl=https://npm.taobao.org/dist
```

#### 2. 设置node-sass 和 electron 源

```
export ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
export SASS_BINARY_SITE="https://npm.taobao.org/mirrors/node-sass"
```
