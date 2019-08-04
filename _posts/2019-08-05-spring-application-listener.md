---
layout: post
title:  "SpringApplicationRunListener 例子"
date:   2019-08-05 00:00:00
categories: spring
---


### SpringApplicationRunListener 生命周期例子

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringApplicationRunListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

import java.util.Arrays;

/**
 * 自定义监听器
 *
 * @author AlanViast
 */
public class MyApplicationListener implements SpringApplicationRunListener {


    public MyApplicationListener(SpringApplication application, String[] args) {
        System.out.println(Arrays.toString(args));
    }

    @Override
    public void starting() {
        System.out.println("[+] starting......");
    }

    @Override
    public void environmentPrepared(ConfigurableEnvironment environment) {
        System.out.println("[+] environmentPrepared......");
    }

    @Override
    public void contextPrepared(ConfigurableApplicationContext context) {
        System.out.println("[+] contextPrepared......");
    }

    @Override
    public void contextLoaded(ConfigurableApplicationContext context) {
        System.out.println("[+] contextLoaded......");
    }

    @Override
    public void started(ConfigurableApplicationContext context) {
        System.out.println("[+] started......");
    }

    @Override
    public void running(ConfigurableApplicationContext context) {
        System.out.println("[+] running......");
    }

    @Override
    public void failed(ConfigurableApplicationContext context, Throwable exception) {
        System.out.println("[+] failed......");
    }
}

```


* 需要在META-INF/spring.factories文件夹中添加以下配置文件, 使其自动加载到Spring容器中

```
# Run Listeners
org.springframework.boot.SpringApplicationRunListener=\
com.springlecture.lecture.listener.MyApplicationListener
```

* 输出结果


```
[]
[]
[+] starting......
[+] environmentPrepared......

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.1.3.RELEASE)

[+] contextPrepared......
2019-08-05 00:05:46.483  INFO 23784 --- [  restartedMain] c.s.lecture.LectureApplication           : Starting LectureApplication on Alan with PID 23784 (G:\Git\spring-lecture\out\production\classes started by Alan in G:\Git\spring-lecture)
2019-08-05 00:05:46.488  INFO 23784 --- [  restartedMain] c.s.lecture.LectureApplication           : No active profile set, falling back to default profiles: default
2019-08-05 00:05:46.554  INFO 23784 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : Devtools property defaults active! Set 'spring.devtools.add-properties' to 'false' to disable
2019-08-05 00:05:46.554  INFO 23784 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : For additional web related logging consider setting the 'logging.level.web' property to 'DEBUG'
[+] contextLoaded......
2019-08-05 00:05:48.157  INFO 23784 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2019-08-05 00:05:48.192  INFO 23784 --- [  restartedMain] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2019-08-05 00:05:48.192  INFO 23784 --- [  restartedMain] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.16]
2019-08-05 00:05:48.200  INFO 23784 --- [  restartedMain] o.a.catalina.core.AprLifecycleListener   : The APR based Apache Tomcat Native library which allows optimal performance in production environments was not found on the java.library.path: [D:\Program Files\Java\jdk1.8.0_191\bin;C:\WINDOWS\Sun\Java\bin;C:\WINDOWS\system32;C:\WINDOWS;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;%SYSTEMROOT%\System32\OpenSSH\;C:\Users\Alan\Desktop\Execute\;%JAVA_HOME%\bin;D:\Program Files\Git\cmd;C:\Android;C:\Windows\System32;C:\Users\Alan\AppData\Local\Microsoft\WindowsApps;;D:\Program Files\JetBrains\IntelliJ IDEA 2018.3\bin;;D:\Program Files\Microsoft VS Code\bin;.]
2019-08-05 00:05:48.392  INFO 23784 --- [  restartedMain] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2019-08-05 00:05:48.393  INFO 23784 --- [  restartedMain] o.s.web.context.ContextLoader            : Root WebApplicationContext: initialization completed in 1838 ms
2019-08-05 00:05:48.738  INFO 23784 --- [  restartedMain] o.s.s.concurrent.ThreadPoolTaskExecutor  : Initializing ExecutorService 'applicationTaskExecutor'
2019-08-05 00:05:48.949  INFO 23784 --- [  restartedMain] o.s.b.d.a.OptionalLiveReloadServer       : LiveReload server is running on port 35729
2019-08-05 00:05:49.025  INFO 23784 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2019-08-05 00:05:49.029  INFO 23784 --- [  restartedMain] c.s.lecture.LectureApplication           : Started LectureApplication in 2.998 seconds (JVM running for 13.161)
[+] started......
[+] running......
```


