---
layout: post
title:  "Redis ArrayIndexOutOfBoundsException 异常解决方法"
date:   2018-03-28 10:00:00
categories: Redis Work Error
---

### 1. 错误问题

> 工作中使用到Jedis保存Session信息时, 报ArrayIndexOutOfBoundsException错误


### 2. 原因 Jedis 是非线程安全的, 所以使用的时候必须让它 sync化

```
At first, your implementation is dangerous.
If jedis.pipelined() is success, getPipeline() returns Pipeline coupled with Jedis instance, but Jedis instance is returned to pool within finally statement in getPipeline().
That means Jedis instance is re-gettable by "another thread" from Pool, while origin thread is using Pipeline.
Jedis instance is not thread-safe.

You should change your implementation to get Jedis instance, get Pipeline, use, sync, return Jedis instance in a row.
```

### 3. 实现方法

```Java
public static <T> T consumer(Function<Jedis, T> function) {
	// 获取Redis实例
	Jedis redis = jedisPool.getResource();
	T result = function.apply(redis);
	// 释放线程池
	jedisPool.returnResource(redis);
	return result;
}
```

### 4. 使用方法

> consumer((jedis -> jedis.exists(key)))