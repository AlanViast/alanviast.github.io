---
layout: post
title: “CnetOS 服务器配置教程”
date: 2018-04-23 00:45:00
---

### 1. 安装软件

> $ yum install vim
> $ yum install wget


### 2. 添加用户

> $ useradd [username]

> $ passwd [username]


### 3. 安装JRE

> $ wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u171-b11/512cd62ec5174c3487ac17c61aaa89e8/jre-8u171-linux-x64.tar.gz
> $ tar zxvf jre-8u171-linux-x64.tar.gz
> $ sudo mv jre1.8.0_171/ /opt/jre/

> $ vim ~/.bashrc # 加入下面代码

```
export JAVA_HOME=/opt/jre/
export CLASSPATH=.:$JAVA_HOME/lib:$CLASSPATH
export PATH=$JAVA_HOME/bin:$PATH
```

> $ source ~/.bashrc
> $ java -version


### 4. 安装Maven

> $ wget http://mirrors.hust.edu.cn/apache/maven/maven-3/3.5.3/binaries/apache-maven-3.5.3-bin.tar.gz

> $ tar zxvf apache-maven-3.5.3-bin.tar.gz

> mv apache-maven-3.5.3 /opt/maven/

```
# 添加下面两行到 ~/.bashrc文件中
export MAVEN_HOME=/opt/maven
export PATH=$MAVEN_HOME/bin:$PATH
```

### 5. 安装Redis

> $ sudo yum install redis

> $ sudo systemctl start redis.service

> $ sudo systemctl enable redis.service # 开机自动启动

