---
layout: post
title: "Shell 学习笔记 ( 二 ) "
date:  2015-07-15 17:00:00
categories: Linux, Shell
---


### 1. 重定向

> $ ls -l /usr/bin > ls-output.txt

> $ ls -l . >> ls-output.txt # 向文本文件后面添加内容

> $ ls -l > ls-output.txt 2>&1 # 将错误和输出输入到同一个文件中

> $ ls -l /bin/usr/ 2> /dev/null # 将错误输出 重定向到

* 通过重定向输出结果 到一个特殊的叫做"/dev/null"的文件。
* 这个文件是系统设备，叫做位存储桶，它可以 接受输入，并且对输入不做任何处理。


### 2. 基本命令

* cat 命令

> $ cat fileName # 输出文件内容

> $ cat targetFile > target # 合并文件

> $ cat movie.mpeg.0* > movie.mpeg

> $ cat # 如果不加任何参数, cat则等待我们的输入, 使用 Ctrl + D 通知程序结束输入

> $ cat > temp.txt # 会将我们的输入输出到temp.txt文件

