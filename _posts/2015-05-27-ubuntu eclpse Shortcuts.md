---
layout: post
title: "Ubuntu 下 Alt+/ 自动补全键失效解决方法 "
date: 2015-05-27 10:25:00
categories: ["Java", "Eclipse", "Shortcuts"]
---

#### 解决方法
* (eclipse) window --> preferences --> General --> keys或者直接在preferences中输入keys, 把“word completion”所对应的快捷解`(alt+/)`去掉(选择需要改变的快捷键行，在binding中用backspace删除).
* 找到 `Content Assist`, 在binding中按住alt+/


