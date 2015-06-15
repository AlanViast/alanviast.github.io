---
layout: post
title: "搭建一个Ruby On Rails 的项目"
date:  2015-06-12 17:00:00
categories: Rail, Ruby
---


### 1. 创建一个应用框架
> $ rails new myProject
l

### 2. 创建数据模型
> $ rails generate scaffold User name:string email:string
> $ bundle exec rake db:migrate



### 3. Rake

* Rake 是 Ruby 版的 make，用 Ruby 语言编写的类 make 程序。
* Rails 灵活的运用了 Rake 的功能，提供了很多开发基于数据库的 Web 应用所需的管理任务。
* rake db:migrate 或许是最常用的。除此之外还有很多其他命令，运行 rake -T db 可以查看所有数据库相关的任务：

> $ bundle exec rake -T db

* 如果想查看所有 Rake 任务

> $ bundle exec rake -T


### 4. 数据验证
```Ruby on rails
class Micropost < ActiveRecord::Base
  validates :content, length: { maximum: 140 }
  # 长度不能超过140个字
end
```



### 5. 修改model模型

> $ rails generate migration RanemeMicropostsUserid

```Ruby
class RanemeMicropostsUserid < ActiveRecord::Migration
  def change
    rename_column :microposts, :user_id, :user_id
  end
end
```