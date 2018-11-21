---
layout: post
title:  "Elasticsearch笔记"
date:   2018-10-23 14:53:59
categories: elasticsearch
---


# Elasticsearch 阅读笔记


### 1. 创建

* `megacorp` 是索引的名称
* `employee` 是类型的名称
* `1` 是该文档的ID

```
PUT /megacorp/employee/1
{
    "first_name" : "John",
    "last_name" :  "Smith",
    "age" :        25,
    "about" :      "I love to go rock climbing",
    "interests": [ "sports", "music" ]
}
```

```
{
    "_index": "megacorp",
    "_type": "employee",
    "_id": "1",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```



### 2. 获取文档

```
GET /megacorp/employee/1

{
  "_index" :   "megacorp",
  "_type" :    "employee",
  "_id" :      "1",
  "_version" : 1,
  "found" :    true,
  "_source" :  {
      "first_name" :  "John",
      "last_name" :   "Smith",
      "age" :         25,
      "about" :       "I love to go rock climbing",
      "interests":  [ "sports", "music" ]
  }
}
```

### 3. 搜索

* `GET /megacorp/employee/_search?q=last_name:Smith` q=last_name:Smith, 搜索last_name字段等于Smith的文档


```
POST /megacorp/employee/_search
{
    "query" : {
        "match" : {
            "last_name" : "Smith"
        }
    }
}
```

```
POST /megacorp/employee/_search
{
    "query" : {
        "bool": {
            "must": {
                "match" : {
                    "last_name" : "smith"
                }
            },
            "filter": {
                "range" : {
                    "age" : { "gt" : 30 }
                }
            }
        }
    }
}
```

* 多字段匹配

```
POST localhost:9200/megacorp/employee/_search
{
  "query": {
    "multi_match" : {
      "query":    "like",
      "fields": [ "last_name", "about" ]
    }
  }
}
```


### 4. 坐标搜索

[Geo搜索](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-distance-query.html#query-dsl-geo-distance-query)

```
PUT /my_locations
{
    "mappings": {
        "_doc": {
            "properties": {
                "pin": {
                    "properties": {
                        "location": {
                            "type": "geo_point"
                        }
                    }
                }
            }
        }
    }
}
```

```
PUT /my_locations/_doc/1
{
    "pin" : {
        "location" : {
            "lat" : 40.12,
            "lon" : -71.34
        }
    }
}
```

```
GET /my_locations/_search
{
    "query": {
        "bool" : {
            "must" : {
                "match_all" : {}
            },
            "filter" : {
                "geo_distance" : {
                    "distance" : "200km",
                    "pin.location" : {
                        "lat" : 40,
                        "lon" : -70
                    }
                }
            }
        }
    }
}
```


### 文档数量

> $ GET localhost:9200/_count


```
{
    "count": 920,
    "_shards": {
        "total": 28,
        "successful": 28,
        "skipped": 0,
        "failed": 0
    }
}
```