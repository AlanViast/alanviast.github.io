---
layout: post
title:  "IDEA Author 信息配置"
date:   2018-8-10 11:50:00
categories: idea config
---



### 1. 通过模板配置


> Setting > Editor > File And Code Templates > Inculdes > File Header


```
/**
 * @author AlanViast
 */
```


### 2. 通过修改IDEA Options

> 添加到 IDEA Home 目录下的 64位*\bin\idea64.exe.vmoptions* 或者 32位*idea.exe.vmoptions*

```
-Duser.name=AlanViast
```