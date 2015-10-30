---
layout: post
title:  "CentOS 搭建 Maven 项目环境"
date:   2015-10-30 14:45:00
categories: maven log mongodb redis cache mysql
---

1. 创建用户

> $ useradd username

2. 加入密码

> $ passwd username

3. 添加到sudo组

> & vi /etc/sudoers

添加 `username ALL=(ALL) ALL`

4. 安装Java环境

> $ wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie"  http://download.oracle.com/otn-pub/java/jdk/7u79-b15/jdk-7u79-linux-x64.tar.gz

> $ tar zxvf jdk-7u79-linux-x64.tar.gz

> $ sudo mv jdk-7u79-linux-x64/ /opt/jdk-7u79-linux-x64/


> $ vim ~/.bashrc

```
# 加入以下三行
export JAVA_HOME=/opt/jdk1.7.0_79/
export CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib:$CLASSPATH
export PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH
```

5. 安装Tomcat

> $ wget http://mirrors.cnnic.cn/apache/tomcat/tomcat-7/v7.0.65/bin/apache-tomcat-7.0.65.tar.gz

> $ tar zxvf apache-tomcat-7.0.65.tar.gz

> $ sudo mv apache-tomcat-7.0.65/ /opt/apache-tomcat-7.0.65/

> $ vim ~/.bashrc

```
# 加入以下两行
export TOMCAT=/opt/apache-tomcat-7.0.65/
export PATH=$TOMCAT/bin:$PATH
```

* 重启Tomcat

> $ sudo /opt/apache-tomcat-7.0.65/bin/shutdown.sh

> $ sudo /opt/apache-tomcat-7.0.65/bin/startup.sh

6. 安装Maven

> $ wget http://apache.fayea.com/maven/maven-3/3.3.3/binaries/apache-maven-3.3.3-bin.tar.gz

> $ tar zxvf apache-maven-3.3.3-bin.tar.gz

> $ sudo mv apache-maven-3.3.3/ /opt/apache-maven-3.3.3/

> $ vim ~/.bashrc

```
# 加入下面两行
export MAVEN_HOME=/opt/apache-maven-3.3.3
export PATH=$MAVEN_HOME/bin:$PATH
```

7. 安装MySQL

> $ sudo yum -y install mysql-server

> $ vim /etc/my.cnf

```
# set chatset
character-set-server=utf8
```

[Config Mysql](http://www.server-world.info/en/note?os=CentOS_6&p=mysql)

8. 安装Redis

> $ wget https://github.com/antirez/redis/archive/2.8.23.tar.gz

> $ tar zxvf 2.8.23.tar.gz redis-2.8.23

> $ cd redis-2.8.23

> $ sudo make install

* [uninstall Redis](http://grainier.net/how-to-uninstall-redis-server-from-ubuntu/)

9. 配置Redis

> cp redis-2.8.23/redis.conf ~/.redis.conf

> $ vim ~/.redis.conf

```
# 后台运行
daemonize yes
# 只能在当前服务器链, 集群的时候应该取消
bind 127.0.0.1
```


> $ vim ~/.bashrc

```
# 添加别名
alias redis="redis-server ~/.redis.conf"
```

10. Tomcat 自动部署

> $ vim /opt/<tomcat-dir>/conf/tomcat-user.xml

```
<!-- 加入以下用户 -->
<user username="username" password="password" roles="tomcat, manager, manager-gui, manager-script" />
```

> $ sudo mvn tomcat7:redeploy


11. sudo mvn command not found

* [http://superuser.com/questions/709515/command-not-found-when-using-sudo](http://superuser.com/questions/709515/command-not-found-when-using-sudo)

> $ sudo vim /etc/sudoers

```
# secure_path 加上
:/opt/apache-maven-3.3.3/bin:/opt/jdk1.7.0_79/bin:/opt/jdk1.7.0_79/jre/bin
```
