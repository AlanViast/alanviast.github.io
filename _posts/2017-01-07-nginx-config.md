---
layout: post
title:  "多域名服务器配置"
date:   2017-01-07 16:00:00
categories: apache domain multi nginx
---

#### 1. Apache Multi domain

-	把subDomain 的请求转发到8080端口

```
<VirtualHost *:80>
    ProxyPreserveHost On
    ProxyPass        "/" "http://127.0.0.1:8080/"
    ProxyPassReverse "/" "http://127.0.0.1:8080"
    ServerName subDomain.rootDomain.com
</VirtualHost>
```


#### 2. Nginx Multi Domain


```
server {
  listen       80;
  server_name  example.cn;
  
  root /root/WWW/build;

  location / {
    try_files $uri @fallback;
  }

  location @fallback {
    rewrite .* /index.html break;
  }
}

server {

  listen      80;
  server_name api.example.cn;
  
  location / {
      proxy_pass http://127.0.0.1:8080;
      proxy_set_header Host      $host;
      proxy_set_header X-Real-IP $remote_addr;
  }
}
```


#### 3. nginx command

> $ nginx -s reload # 重启服务器

> $ vim /etc/nginx/nginx.conf # 编辑配置文件

