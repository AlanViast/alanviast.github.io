---
layout: post
title: "搭建一个Ruby On Rails 的项目(二)"
date:  2015-06-12 17:00:00
categories: Rail, Ruby
---


### 1. 创建用户模型

>　$ rails generate controller Users new

* 迁移

>  $ bundle exec rake db:migrate

* 回滚

> $ bundle exec rake db:rollback


### 2. 控制台沙箱
* 在沙箱环境中, 对不会对数据库操作
* 在沙盒模式下使用控制台, 退出当前会话后, 对数据库做的所有改动都会回归到原来的状态。
* 如果任何一个数据验证失败了, 例如存储记录时需要密码
* `update_attributes` 操作就会失败. 如果只需要更新单个属性, 可以使用 `update_attribute`,跳过验证

> $ rails console --sandbox


### 3. 数据操作
```
User.new

user = User.new(name: "Alan", email: "AlanViast@gmail.com")

user.valid? # 验证用户是否有效的

user.save # 保存到数据库

# user 的属性
user.name
user.email
user.created_at
user.updated_at

# 直接插入数据

user = User.create(name: "Alan", email: "AlanViast")
user.destroy # 删除当前用户对象

User.find(1) # 查找到 ID 为 1 的 User 对象
User.find(3) # Couldn't find User with 'id'=3 查找不到 ID 为 3 的数据

User.find_by(name:"Alan") # 按某个属性查找\

User.first # 获得数据库中第一条数据
User.all # 获得数据库中所有的数据


user = User.first
user.name = "AlanViast # 更新用户数据
user.save  # 更新到数据库

user.email = "AlanViast@163.com"
user.reload.email # 重新加载数据库中的某个字段

# 更新某些字段
user.update_attributes(name: "Alan", email: "AlanViast@163.com")

user.update_attribute(:name, "AlanViast")
```

### 4. 数据验证

* 修改 `app/models/user.rb`

```
class User < ActiveRecord::Base
  validates :name, presence: true
end
```

* 重启沙箱控制台

> $ rails console --sandbox

```
user = User.new(name: "", email: "test@163.com")
user.valid?

user.errors.full_messages # 获得完整错误提示
user.save # => false


user.dup # 返回新创建一个相同的对象
```


### 5.　创建索引

> $ rails generate migration add_index_to_users_email



### 6. 使用安全密码
* 在数据库中的 password_digest 列存储安全的密码哈希值;
* 获得一对“虚拟属性” , `password` 和 `password_confirmation` , 而且创建用户对象时会执行存在性验证和匹配验证;
* 获得 `authenticate` 方法, 如果密码正确, 返回对应的用户对象, 否则返回 false.

```
class User < ActiveRecord::Base
  .
  .
  .
  has_secure_password
end
```


```
user.authenticate("test1") # 验证密码是否正确, 如果正确会返回数据库中对应的用户, 如果不正确返回false

!!user.authenticate("test1") # 验证结果转换为布尔值

email.downcase! # 操作结果会赋给自己
```



### 7. Debug 环境

```
<%= debug(params) if Rails.env.development? %>
```

* Rails.env.development? 的返回值只在开发环境中才是 true, 所以上面这行代码不会在生产环境和测试环境起作用


```
  def show
    @user = User.find(params[:id])
    debugger # 在代码中加入debugger指令的话, 当执行到该行命令的情况下会输出命令行调试界面, 退出按 Ctrl + D
  end
```












### Last. 注意
* `bundle exec rake db:migrate:reset` 重置数据库
* pluralize(int, string), 如果 int 参数大于1, 则 string 参数按照复数的形式输出 `pluralize(2, "woman")` => "2 women"
* any? 方法就是取反 empty? 的返回值, 如果对象中有内容就返回 true, 没内容则返回 false.

