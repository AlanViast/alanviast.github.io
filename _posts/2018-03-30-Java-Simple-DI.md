---
layout: post
title:  "自己实现一个简单的DI(控制反转)"
date:   2018-03-30 11:00:00
categories: java di
---

```java
import java.lang.reflect.Constructor;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

public class SimpleDI {


    private final static Map<String, Object> DI_MAP = new HashMap<>();

    @SuppressWarnings("unchecked")
    public static <T> T DI(Class<T> tClass) {
        synchronized (DI_MAP) {
            if (DI_MAP.containsKey(tClass.getName())) {
                return (T) DI_MAP.get(tClass.getName());
            } else {
                T tInstance = newInstance(tClass);
                DI_MAP.put(tClass.getName(), tInstance);
                return tInstance;
            }
        }
    }

    public static <T> T newInstance(Class<T> tClass) {
        try {
            Constructor[] constructors = tClass.getConstructors();
            long zoreParamsConstructor = Stream.of(constructors).filter(item -> item.getParameterCount() == 0).count();
            if (1L == zoreParamsConstructor)
                return tClass.newInstance();
            else
                throw new RuntimeException("该类没有不接受参数的构造方法");
        } catch (InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```