---
layout: post
title:  "Mongodb 学习笔记"
date:   2018-01-26 09:00:00
categories: mongodb
---


### 1. 安装 Mongodb

> $ brew install mongodb


### 2. 启动 Mongodb

* 需要先创建一个目录, 指定数据存放的位置

> $ mkdir /data/db
> $ mongod --dbpath /data/db

### 3. 启动一个命令行连接工具

> $ mongod

### 4. Document

* Mongodb 中的 documents 都是以 **对象** 的形式表现, 依照BSON的形式存储的(类似JSON)

```
{
   field1: value1,
   field2: value2,
   field3: value3,
   ...
   fieldN: valueN
}
```


### 5. 命名方式

```
1. The field name _id is reserved for use as a primary key; its value must be unique in the collection, is immutable, and may be of any type other than an array.
2. The field names cannot start with the dollar sign ($) character.
3. The field names cannot contain the dot (.) character.
4. The field names cannot contain the null character.
```


### 6. 新建插入一个对象

* **insertOne** 插入一个对象, 同时插入多个对象可以使用 **insertMany**.

```
db.user.insertOne({
  name: "AlanViast",
  age: 28,
  sex: "Male",
  item: {
    height: 175,
    weight: 70
  }
})
```



### 7. 查找

* 查找单个对象使用 **db.user.findOne({})**.
* 查找所有对象时可以传入一个空白的集合 **db.user.find({})**.
* 按条件查找对象时, 可以以 <field>:<value> 的形式传入. **db.user.find({name: "AlanViast"})**
* 多条件 **且** 查询的时候使用. **db.inventory.find({status:"A",qty:{$lt:30}})**
* 多条件 **或** 查询使用. **db.inventory.find({$or:[{status:"A"},{qty:{$lt:30}}]})**
* 更多复杂的条件查询 (https://docs.mongodb.com/manual/tutorial/query-documents/#read-operations-query-argument)[https://docs.mongodb.com/manual/tutorial/query-documents/#read-operations-query-argument]


### 8. 更新

* **db.user.updateOne** 第一个参数接受需要修改对象的查询条件, $set表示需要修改的内容. item.height表示子集中的内容.
* updateMany 更新多个对象中的值
* replaceOne 会直接替换掉整个对象

```
db.user.updateOne(
   { name: "AlanViast" },
   {
     $set: { "item.height": 160, weight: 66 },
     $currentDate: { lastModified: true }
   }
)

db.user.replaceOne(
   { name: "AlanViast" },
   { name: "AlanViast", hello: "World" }
)
```


### 9. 删除

* db.user.deleteOne({ name: "AlanViast"}) 删除掉单个对象
* db.user.deleteMany 删除多个


#### 10. 创建唯一索引

* db.members.createIndex( { "user_id": 1 }, { unique: true } )

