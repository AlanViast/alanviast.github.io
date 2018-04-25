---
layout: post
title:  AC自动机-Java
date:   2018-04-25 11:00:00
categories: ac java code
---

## AC算法

```
import java.util.*;
import java.util.stream.IntStream;

public final class MySensitiveWordFilter {

    private static AoMap AOMAP = new AoMap();

    private static AoMap appendNote(AoMap aoMap, char item, boolean end) {
        Map<Character, AoMap> next = Optional.ofNullable(aoMap.getNext()).orElse(new HashMap<>());
        AoMap aoMap1 = Optional.ofNullable(next.get(item)).orElse(new AoMap());

        aoMap1.setEnd(end);

        next.put(item, aoMap1);
        aoMap.setNext(next);
        return aoMap1;
    }

    private static void buildTree(Set<String> keyword) {
        for (String item : keyword) {
            append(item);
        }
    }

    public static void append(String keyword) {
        AoMap next = AOMAP;
        for (int i = 0; i < keyword.length(); i++) {
            char ichar = keyword.toCharArray()[i];
            next = appendNote(next, ichar, i == keyword.length() - 1);
        }
    }

    /**
     * 根据内容搜索, 存在的敏感字
     */
    public static Map<Integer, String> search(String content) {
        char[] arrays = content.toCharArray();
        Map<Integer, String> keywordMap = new TreeMap<>(); // 违禁字的位置

        IntStream.range(0, content.length()).forEach(index -> {
            Map<Character, AoMap> next = AOMAP.getNext();
            int innerIndex = index;
            while (next.containsKey(arrays[innerIndex])) {
                AoMap node = next.get(arrays[innerIndex]);
                if (node.isEnd()) {
                    keywordMap.put(index, new String(arrays, index, (innerIndex + 1) - index));
                    break;
                }
                next = node.getNext();
                innerIndex++;
            }
        });
        return keywordMap;
    }

    public static boolean verify(String content) {
        char[] arrays = content.toCharArray();
        return IntStream.range(0, content.length()).anyMatch(index -> {
            Map<Character, AoMap> next = AOMAP.getNext();
            while (next.containsKey(arrays[index])) {
                AoMap node = next.get(arrays[index]);
                if (node.isEnd()) {
                    return true;
                }
                next = node.getNext();
                index++;
            }
            return false;
        });
    }

    public static void main(String[] args) {

        Set<String> set = new HashSet<>();
        set.add("打倒ABC");
        buildTree(set);

        System.out.println(search("xxxxxxxxxxxx打倒ABCxxxx打倒ABCxxxx"));
        System.out.println(verify("xxxxxxxxxxxx打倒ABCxxxxxxxxxxx"));
    }

}

```