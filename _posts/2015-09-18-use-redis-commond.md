---
layout: post
title:  "Use Redis"
date:   2015-09-18 23:00:00
categories: redis cache
---


#### 1. Redis 支持的类型

* Binary-safe strings
* Lists
* Sets
* Sorted sets
* Hashes
* Bit arrays
* HyperLogLogs

#### 2. Redis keys

* Very long keys are not a good idea, for instance a key of 1024 bytes is a bad idea not only memory-wise, but also because the lookup of the key in the dataset may require several costly key-comparisons. Even when the task at hand is to match the existence of a large value, to resort to hashing it (for example with SHA1) is a better idea, especially from the point of view of memory and bandwidth.

* Very short keys are often not a good idea. There is little point in writing "u1000flw" as a key if you can instead write "user:1000:followers". The latter is more readable and the added space is minor compared to the space used by the key object itself and the value object. While short keys will obviously consume a bit less memory, your job is to find the right balance.

* Try to stick with a schema. For instance "object-type:id" is a good idea, as in "user:1000". Dots or dashes are often used for multi-word fields, as in "comment:1234:reply.to" or "comment:1234:reply-to".

* The maximum allowed key size is 512 MB.


#### 3. Install Redis in commond line

> $ wget http://download.redis.io/releases/redis-3.0.4.tar.gz # download redis

> $ tar xzf redis-3.0.4.tar.gz # unzip redis 

> $ cd redis-3.0.4 

> $ make

> $ src/redis-server # run server

> $ src/redis-cli # run a redis console 


#### 4. Redis Strings

* use string key/value

> $ SET key value

> $ GET key

* determine whether key exists

> $ SET key value nx # is key not exists, then save key/value

> $ SET key value xx # is key exists, then change key/value

* Integer type auto increment

> $ SET counter 10 # set a integer value

> $ INCR counter # auto increment

> $ INCRBY counter 20 # append value

> $ DECR counter # reduce value

> $ DECRBY counter 5  # reduce value 5

* Operating Multi value

> $ MSET a 10 b 20 c 30

> $ MGET a b c

* Determine whether key exists

> $ EXISTS key # if exists return 1, else return 0

* Delete key

> $ del key # if exists key, first delete key, return 1, else return 0

* key Type

> $ type key # if key not exists, return none, else return value type

* Set expire 

> $ EXPIRE key 5

* Set expire in set command

> $ SET key value ex time

> $ TTL key # get key check the remaining time


#### 5. Redis List

* LPUSH append element to list head

> $ LPUSH key value

* RPUSH append element to list tail

> $ RPUSH key value...

> $ RPUSH key value1 value2 value3 value4 # Push multi value to list

* Get sub list 

> LRANGE start end 

* In the pop-up list to the right

> $ RPOP key 

* In the pop-up list to the left

> $ LPOP key

* Trim Element, contain head and tail

> $ LTRIM key start end

* Get list length

> $ LLEN key # get list's length , when its key is not exists then return 0


#### 6. Blocking operations on lists

* BRPOP is a blocking list pop primitive. It is the blocking version of RPOP because it blocks the connection when there are no elements to pop from any of the given lists

> $ BRPOP key time 

* BRPOP listKey , if key exists element then return first element on right
* otherwise, wait elements append to list of return the first on element,
* If it returns Nil append elements without a specified time.

> $ RPUSH key value # Push a element

#### 7. Redis Hashes

* Hash set key/value

> $ HSET key sub-key value

* Hash set multi key/value

> $ HMSET key sub-key1 value1 sub-key2 value2....

* Hash get subkey's value

> $ HGET key subkey

* Hash get multi subkey's value

> $ HMGET key sub-key1 sub-key2

* Hash get all subkey

> $ HGETALL key

* Hash subkey Increment

> $ HINCRBY key sub-key value # HINCRBY key age 1



#### 8. Redis Sets

* append to set

> $ SADD key value1 value2....

* Set members

> $ SMEMBERS key

* Set contains key

> $ SISMEMBER key value

* which performs the intersection between different sets.

> $ SINTER key1 key2 key3

* Collection obtain several collections

> $ SUNION key1 key2 key3

> $ SUNIONSTORE key1 key2 key3 # Collection obtain several collections count

* SPOP first elements

> $ SPOP key

* Get set elements length

> $ SCARD key

#### 9. Redis Sorted sets

* Append element to ZSet

> $ ZADD key numberValue value

* Get all elements , withscores is show numberValue

> $ ZRANGE key start end [withscores]

* reverse all elements 

> $ ZREVRANGE key start end [withscores]

* Get score between in start and end, score is numberValue

> $ ZREMRANGEBYSCORE key start end

* Get element index

> $ ZRANK key value

* Lexicographical scores

> Demo

> $ ZADD hackers 0 "Alan Kay" 0 "Sophie Wilson" 0 "Richard Stallman" 0 "Anita Borg" 0 "Yukihiro Matsumoto" 0 "Hedy Lamarr" 0 "Claude Shannon" 0 "Linus Torvalds" 0 "Alan Turing"

> $ ZRANGEBYLEX hackers [B [P # Get all First Letter is B - P elements


#### 10. Bitmaps

* Set bitmap

> $ SETBIT key value bit # SETBIT bitKey 10 1

* Get bitmap

> $ GETBIT key value bit # if key exists , then return value, else return zero

* Get bitmap count

> $ BITCOUNT key 

#### 11. HyperLogLogs

* PFADD 

> $ PFADD key value1 value2 value3

* PFCOUNT 

> $ PFCOUNT key # get count