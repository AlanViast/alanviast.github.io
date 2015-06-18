---
layout: post
title: "搭建一个Ruby On Rails 的项目"
date:  2015-06-12 17:00:00
categories: Rail, Ruby
---


### 1. 创建一个应用框架

> $ rails new myProject


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


### 6. 创建控制器

> $ rails generate controller StaticPages home help
> $ rails destroy  controller StaticPages home help

### 7. 创建Model

> $ rails generate model User name:string email:string
> $ rails destroy model User

### 8. 数据库迁移
> $ bundle exec rake db:migrate
> $ bundle exec rake db:rollback

* 撤销前一个迁移的操作

> $ bundle exec rake db:migrate VERSION=0

* 回滚到一开始的版本

### 9. TDD

> $ bundle exec rake text

* 运行测试

### 10. debug gem

* 修改 test/test_helper.rb 文件

```
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
# 添加以下两行
require "minitest/reporters"
Minitest::Reporters.use!

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml
  # for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
```

### 11.重点
* 使用 `rails console` 可以进入console模式
* 可以使用 push 方法向数组中添加元素，或者使用等价的 << 操作符
* 在 Ruby 中，一切皆对象，包括字符串和 nil 都是。

### 12. 字符串类型

```
"" # 空字符串
puts "foo" + "bar" # 字符串拼接, puts 输出函数
first_name = "Moga"
last_name = "Viast"
puts "#{first_name} #{last_name}"

'#{first_name} last_name'     # 单引号字符串不能进行插值操作
```


### 13.

```
"foobar".length # 字符串length方法

foo = "foobar"
foo.empty? # 判断当前字符串是否为空字符串
# empty? 方法末尾有个问号，这是 Ruby 的约定，说明方法的返回值是布尔值，即 true 或 false。
foo.nil? # 判断foo对象是否为nil



```