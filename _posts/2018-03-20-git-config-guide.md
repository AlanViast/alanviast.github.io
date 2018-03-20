---
layout: post
title:  "Git 配置指南"
date:   2018-03-20 10:00:00
categories: Git
---

### 1. 生成SSH Key

> $ ssh-keygen -C "email@gmail.com"

### 2. 全局配置用户信息

> $ git config --global user.name "Username"
> $ git config --global user.email "email@email.com"

### 3. 配置缩写

> $ git config --global alias.co checkout
> $ git config --global alias.br branch
> $ git config --global alias.ci commit
> $ git config --global alias.st status