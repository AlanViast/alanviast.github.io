---
layout: post
title:  "Collectors.toMap() 之 IllegalStateException 异常"
date:   2018-12-18 15:00:00
categories: stream java exception
---

### 问题 list.stream().collect(Collectors.toMap()) 报 `java.lang.IllegalStateException: Duplicate key` 异常

```
Exception in thread "main" java.lang.IllegalStateException: Duplicate key java.lang.Object@41a4555e
    at ysh.comapp.router.TeamControlTest.lambda$main$0(TeamControlTest.java:45)
    at java.util.HashMap.merge(HashMap.java:1254)
    at ysh.comapp.router.TeamControlTest.main(TeamControlTest.java:44)
```


### 修改方法


```java
Map<Integer, Voteitem> map = new HashMap<>(voteitems.size());

list.forEach(item -> {
    map.put(item.getTeamId(), item);
});
```


### 原因

```java
// 例子代码
public static void main(String[] args) {
    Map<String, Object> map = new HashMap<>();
    map.put(null, new Object());

    Map<String, Object> map2 = new HashMap<>();
    map2.put(null, new Object());

    map.merge(null, new Object(), (u, v) -> {
        throw new IllegalStateException(String.format("Duplicate key %s", u));
    });
}
```

* Collectors.toMap()方法源代码

```java
public static <T, K, U>
Collector<T, ?, Map<K,U>> toMap(Function<? super T, ? extends K> keyMapper,
                                Function<? super T, ? extends U> valueMapper) {
    return toMap(keyMapper, valueMapper, throwingMerger(), HashMap::new);
}

public static <T, K, U, M extends Map<K, U>>
    Collector<T, ?, M> toMap(Function<? super T, ? extends K> keyMapper,
                            Function<? super T, ? extends U> valueMapper,
                            BinaryOperator<U> mergeFunction,
                            Supplier<M> mapSupplier) {
    BiConsumer<M, T> accumulator
            = (map, element) -> map.merge(keyMapper.apply(element),
                                          valueMapper.apply(element), mergeFunction);
    return new CollectorImpl<>(mapSupplier, accumulator, mapMerger(mergeFunction), CH_ID);
}

private static <K, V, M extends Map<K,V>>
BinaryOperator<M> mapMerger(BinaryOperator<V> mergeFunction) {
    return (m1, m2) -> {
        for (Map.Entry<K,V> e : m2.entrySet())
            m1.merge(e.getKey(), e.getValue(), mergeFunction);
        return m1;
    };
}


/**
 * Returns a merge function, suitable for use in
 * {@link Map#merge(Object, Object, BiFunction) Map.merge()} or
 * {@link #toMap(Function, Function, BinaryOperator) toMap()}, which always
 * throws {@code IllegalStateException}.  This can be used to enforce the
 * assumption that the elements being collected are distinct.
 *
 * @param <T> the type of input arguments to the merge function
 * @return a merge function which always throw {@code IllegalStateException}
 */
private static <T> BinaryOperator<T> throwingMerger() {
    return (u,v) -> { throw new IllegalStateException(String.format("Duplicate key %s", u)); };
}
```

* Map.java中的merge方法在当某个key已经存在时候则抛出异常

```java
default V merge(K key, V value,
        BiFunction<? super V, ? super V, ? extends V> remappingFunction) {
    Objects.requireNonNull(remappingFunction);
    Objects.requireNonNull(value);
    V oldValue = get(key);
    V newValue = (oldValue == null) ? value :
               remappingFunction.apply(oldValue, value);
    if(newValue == null) {
        remove(key);
    } else {
        put(key, newValue);
    }
    return newValue;
}
```