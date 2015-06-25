---
layout: post
title: "Shell 学习笔记"
date:  2015-06-25 16:00:00
categories: Linux, Shell
---


### 1. 常用命令


* cd 命令

> $ cd # 回到根目录
> $ cd ~ # 回到更目录
> $ cd - # 回到先前的工作目录
> $ cd ~alan # 回到用户为alan的目录

* ls 命令

> $ ls　 # 查看当前目录
> $ ls / # 查看根目录
> $ ls ~ /usr # 查看用户目录和usr用户
> $ ls -l ~ # 按照列表的形式输出目录
> $ ls -lt --reverse # 反过来输出目录结构

* file 命令

> file {file_path} # 确定文件类型

* less 命令

> less {file_path} # 浏览文件数据

|  命令        | 功能           |
| ------------- |:-------------:|
|  Page UP or b |  向后翻滚一页 |
|  Page Down or space  | 向前翻动一页 |
|  UP Arrow  | 向前移动一行 |
|  Down Arrow  | 向后移动一行 |
|G | 移动到最后一行 |
|1G or g | 移动到开头一行 |
| /charaters  | 向前查找指定的字符串 |
|n | 向前查找下一个出现的字符串，这个字符串是之前所指定查找的 |
|h | 显示帮助屏幕 |
|q | 退出 less  程序 |
