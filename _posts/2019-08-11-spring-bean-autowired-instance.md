---
layout: post
title:  "Spring @Bean 注入对象的方式对比"
date:   2019-08-11 14:10:00
categories: spring autowired
---

# Spring @Bean注解被调用和注入的对象测试


```
@SpringBootApplication
public class LectureApplication {

    public static void main(String[] args) {
        SpringApplication.run(LectureApplication.class, args);
    }

    @Bean
    public MySqlLoader mySqlLoader() {
        return new MySqlLoader();
    }

    @PostConstruct
    public void init() {
        System.out.println(mySqlLoader());
    }

}
```

* 注入代码

```
@Component
public class InitTest {


    @Autowired
    private MySqlLoader mySqlLoader;


    @PostConstruct
    public void init() {
        System.out.println(mySqlLoader);
    }
}


```

* 输出

```
com.springlecture.lecture.test.MySqlLoader@4fc849c8
com.springlecture.lecture.test.MySqlLoader@4fc849c8
```

由此可以看出,  当 LectureApplication 类调用mySqlLoader()方法的时候和注入的类是属于同一个类对象