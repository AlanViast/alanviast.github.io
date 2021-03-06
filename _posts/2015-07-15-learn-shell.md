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

> $ cat >> Temp.txt # 将输出添加到Temp.txt文件中

* | 管道命令

> ls /bin /usr/bin | less # 将/bin目录下和/usr/bin目录下的所有结果输出到less命令中.


* sort 命令

> $ ls /usr/bin | sort # 将/bin目录下和/usr/bin目录下的所有结果输出到sort命令中, 结果会输出一个有序的列表

> $ ls /bin /usr/bin | sort | less # 同上, 只是会将结果输入到less命令中

* uniq 命令

> $ ls /bin /usr/bin | uniq # 将结果忽略重复行, 就是不重复的集合

* wc 命令

> $ wc Temp.txt # 显示文件所包含的行, 字和字节数

* grep 命令

> $ grep pattern [file...] # grep 是个很强大的程序，用来找到文件中的匹配文本

> $ ls /bin /usr/bin | sort | uniq | grep zip

* head 命令

> & ls /usr/bin | head # 输出头部前10行, -n 参数选择输出的行数

* tail 命令

> $ ls /usr/bin | tail # 输出尾部前10行, -n 参数可以选择输出的行数. -f 允许事实显示内容

* tee 命令

> $ cat test.txt | tee demo.txt | grep 'Test' # 从 Stdin 读取数据，并同时输出到 Stdout 和文件

* echo 命令

> $ echo * # 将当前目录下所有文件名输出

> $ echo D* # 输出所有D开头所有文件名 echo /usr/*/share

> $ echo $(( 2 + 2 )) # 可以用 $(()) 的方式进行运算