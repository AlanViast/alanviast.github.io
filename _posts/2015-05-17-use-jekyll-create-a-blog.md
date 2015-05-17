---
layout: post
title: "使用Jekyll搭建一个Blog"
date:  2015-05-17 19:08:00
categories: blog jekyll
---

### 基础知识 (来自 [阮一峰老师的博客](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html))
  1. Jekyll
    * 是一个静态站点生成器，它会根据网页源码生成静态文件。它提供了模板、变量、插件等功能，所以实际上可以用来编写整个网站。
    * [Jekyll 中文官网](http://jekyllcn.com/) - [Jekyll 英文官网](http://jekyllrb.com/)
  2. Github Page
    * Github Pages 可以被认为是用户编写的、托管在github上的静态网页。

### 安装Git 和 Jekyll (Ubuntu环境下, 其他环境自行guge)
  1. Git

    > sudo apt-get install git

  2. Jekyll [(需要安装Ruby环境)](https://gorails.com/setup/ubuntu/14.04):

    > gem install jekyll

  3. 创建一个Jekyll模板
    jekyll new blog

  4. 进入blog目录然后修改_config.yml文件中的配置

### 使用Bootstrap构建界面
  1. 下载Bootstrap SCSS, 然后将/assets/stylesheets/下的bootstrap文件夹和_bootstrap.scss文件复制到_sass文件夹下

    > git clone git@github.com:twbs/bootstrap-sass.git

  2. 引入bootstrap文件, 修改css目录下的main.scss文件, 添一行 `"bootstrap",`

    ```scss
    // Import partials from `sass_dir` (defaults to `_sass`)
    @import
      "base",
      "layout",
      "bootstrap",
      "syntax-highlighting"
    ;
    ```

  3. 目录结构为

    ```
    _sass/
    ├── _base.scss
    ├── bootstrap
    │   ├──  ... # 略
    ├── _bootstrap.scss
    ├── _layout.scss
    └── _syntax-highlighting.scss
    ```


### Jekyll 文件用途
```
.
├── about.md # 关于页面
├── _config.yml # 主要配置文件
├── css
│   └── main.scss # 主样式文件, 会去导入_sass文件下的其他样式文件
├── feed.xml # RSS文件
├── _includes # 公用文件
│   ├── footer.html
│   ├── header.html
│   └── head.html
├── index.html # 首页
├── _layouts # 布局文件
│   ├── default.html
│   ├── page.html
│   └── post.html
├── _posts # 文章存放的目录
│   ├──  ... # 文章格式为2015-05-13-title.md
├── _sass # SASS样式文件
     ├── _base.scss
     ├── bootstrap
     ├── _bootstrap.scss
     ├── _layout.scss
     └── _syntax-highlighting.scss # 语法高亮样式
```
