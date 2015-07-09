---
layout: post
title: "搭建一个Ruby On Rails 的项目(一)"
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
```
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

> $ bundle exec rake test

* 运行测试

> $ bundle exec rake test:integration

* 运行集成测试

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



### 11. 字符串类型

```
"" # 空字符串
puts "foo" + "bar" # 字符串拼接, puts 输出函数
first_name = "Moga"
last_name = "Viast"
puts "#{first_name} #{last_name}"

'#{first_name} last_name'     # 单引号字符串不能进行插值操作
```

### 12.

```
"foobar".length # 字符串length方法

foo = "foobar"
foo.empty? # 判断当前字符串是否为空字符串
# empty? 方法末尾有个问号，这是 Ruby 的约定，说明方法的返回值是布尔值，即 true 或 false。
foo.nil? # 判断foo对象是否为nil


x = "foo"
y = ""

puts "Bost Str are is empty" if x.empty? && y.empty?
puts "One of the strings is empty" if x.empty? || y.empty?
puts "x is not empty" if !x.empty?


puts nil.to_s # nil 转换成字符串会 == ""


"foo".nil?
"".nil?
nil.nil?

string = "foobar"
puts "The string '#{string}' is nonempty." unless string.empty?

string = ""
puts "The string '#{string}' is nonempty." unless string.empty?

!!nil # 将nil 转换为Boolean值
!!0


# 定义方法
# 如命令所示，可以完全不指定参数（这种情况可以省略括号）。
# 因为 def string_message(str = '') 中提供了参数的默认值，即空字符串。
# 所以，str 参数是可选的，如果不指定，就使用默认值。
# Ruby 方法不用显式指定返回值，方法的返回值是最后一个语句的计算结果。
def string_message(str = '')
  if str.empty?
    "It's an empty string!"
  else
    "The string is nonempty."
  end
end


def string_message(str = '')
  return "It's an empty string!" if str.empty?
  return "The string is nonempty."
end


"foo bar     baz".split     # 把字符串拆分成有三个元素的数组
"fooxbarxbazx".split('x')

array = []
puts array.empty?
array = [42, 8, 17]
puts array.empty?
array.include?(42) # 判断array数组中是否包含42
array.sort # 对array数组排序, 返回一个新的数组
array.reverse # 反转数组
array.shuffle # 随机数组

array.push(6) # 加入元素
array << 18 # 同上
array << "foo" << "bar" # 加入多个元素

array.join # 将数组合并合成字符串
array.join(",") # 合并数据, 用逗号分隔

# 数字值域
(1..9).to_a


a = %w[foo bar baz quux]         # %w 创建一个元素为字符串的数组
a[0..2]

a = (0..9).to_a
a[2..(a.length-1)]                 # 显式使用数组的长度
a[2..-1]                                # 小技巧，索引使用 -1

# 字母值域
('a'..'e').to_a


#　块
(1..5).each { |i| puts 2 * i }


(1..5).each do |number|
  puts 2 * number
  puts number
end

3.times { puts "Betelgeuse!" }   # 3.times 后跟的块没有变量

(1..5).map { |i| i**2 }          # ** 表示幂运算, 返回一个新的数组

%w[a b c]                        # 再说一下，%w 用来创建元素为字符串的数组
%w[a b c].map { |char| char.upcase }
%w[A B C].map { |char| char.downcase }
```

### 13. 生成随机数
```
charArray = ('a'..'z').to_a
numberArray = (0..9).to_a

charArray.shuffle[0..numberArray.sample].join
```


### 14. 哈希和符号
```
user = {}
user["first_name"] = "Alan"
user["last_name"] = "Viast"

#  通过方括号的形式每次定义一个元素的方式不太敏捷，
# 使用 ⇒ 分隔的键值对这种字面量形式定义哈希要简洁得多
user = { "first_name" => "Alan", "last_name" => "Viast" }

# 在 Rails 中用“符号”（Symbol）当键很常见。符号看起来有点儿像字符串，
# 只不过没有包含在一对引号中，而是在前面加一个冒号。
# 例如，:name 就是一个符号。你可以把符号看成没有约束的字符串
"name".split('')

:name.split('') # NoMethodError

# 用符号当键，我们可以按照如下的方式定义一个 user 哈希：
user = {:name => "Alan",  :last_name => "Viast"}
user[:name]

# 在哈希字面量中，:name ⇒ 和 name: 作用一样。
# 因此，{ :name ⇒ "Michael Hartl" } 和 { name: "Michael Hartl" } 是等效的。
# 如果要表示符号，只能使用 :name（冒号在前面）
user = {name: "Alan", last_name: "Viast"}

# 哈希循环

user.each do |key, value|
  puts "key = #{key}"
  puts "value = #{value}"
end

param = {}
param = user

# 直接输出哈希字面量
puts user

# 输出所有值
puts (1..9).to_a

# 输出值域的字面量
puts (1..9).to_a.inspect

puts :name, :name.inspect
puts 'It worked!', 'It worked!'.inspect

# p方法会直接调用参数的.inspect方法
p :name

```


### 15. 类
```
s = "foobar"
s.class

s = String.new("foobar")
s.class

# 创建数组
a = Array.new([1, 3, 2])
a.class

# 创建一个Hash
h = Hash.new
h[:foo]

# 创建一个带默认值的Hash
h = Hash.new(0)
h[:foo]

# 类的继承
s = String.new("foobar")
s.class
s.class.superclass


class Word
    def palindrome?(string)
        string == string.reverse
    end
end

w = Word.new

w.palindrome?("foobar") # => false
w.palindrome?("level") # => true

class Word < String
    def palindrome?
        self == self.reverse
    end
end

s = Word.new("foobar")
s.palindrome? # => false

s = Word.new("level")
s.palindrome? # => true

# 给 String 类添加方法
class String
    def palindrome?
        self == self.reverse
    end
end

# 判断字符串是否为空, 除空格
"    ".blank? # => true
nil.blank? # => ture


# 合并哈希
{ "a" => 100, "b" => 200 }.merge({ "b" => 300 })


# 打乱字符串
def string_shuffle(s)
   s.split('').shuffle.join
end

# 修改字符串shuffle方法
class String
    def shuffle
        self.split('').shuffle.join
    end
end

```

### 16.

<table id="table-assert-select" class="tableblock frame-all grid-all" style="width: 100%;">
  <caption><span class="title-label">表 5.2：</span><code>assert_select</code> 的一些用法</caption>
  <colgroup>
  <col style="width: 50%;">
  <col style="width: 50%;">
  </colgroup>
  <thead>
    <tr>
      <th class="tableblock halign-left valign-top">代码</th>
      <th class="tableblock halign-left valign-top">匹配的 HTML</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>assert_select "div"</code></p></td>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;div&gt;foobar&lt;/div&gt;</code></p></td>
    </tr>
    <tr>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>assert_select "div", "foobar"</code></p></td>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;div&gt;foobar&lt;/div&gt;</code></p></td>
    </tr>
    <tr>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>assert_select "div.nav"</code></p></td>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;div class="nav"&gt;foobar&lt;/div&gt;</code></p></td>
    </tr>
    <tr>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>assert_select "div#profile"</code></p></td>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;div id="profile"&gt;foobar&lt;/div&gt;</code></p></td>
    </tr>
    <tr>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>assert_select "div[name=yo]"</code></p></td>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;div name="yo"&gt;hey&lt;/div&gt;</code></p></td>
    </tr>
    <tr>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>assert_select "a[href=?]", ’/’, count: 1</code></p></td>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;a href="/"&gt;foo&lt;/a&gt;</code></p></td>
    </tr>
    <tr>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>assert_select "a[href=?]", ’/’, text: "foo"</code></p></td>
      <td class="tableblock halign-left valign-top"><p class="tableblock"><code>&lt;a href="/"&gt;foo&lt;/a&gt;</code></p></td>
    </tr>
  </tbody>
</table>


### last. 重点
* Ruby 中的一切都是对象
* Ruby 不会对单引号字符串进行插值操作
* empty? 方法末尾有个问号，这是 Ruby 的约定，说明方法的返回值是布尔值，即 true 或 false。
* to_s 方法基本上可以把任何对象转换成字符串
* %w 用来创建元素为字符串的数组 `%w[a b c]`
* 使用 `rails console` 可以进入console模式d
* 可以使用 push 方法向数组中添加元素，或者使用等价的 << 操作符
* 在 Ruby 中，一切皆对象，包括字符串和 nil 都是。
* 哈希中的元素没有特定的顺序
* 在Ruby 中, 括号是可以省略的
* 在Ruby 中, 如果哈系是最后一个参数的情况下可以省略花括号
* Ruby中的变量不能使用 `-` ,(符号也一样)
* 一行代码尽量不要超过80个字符
