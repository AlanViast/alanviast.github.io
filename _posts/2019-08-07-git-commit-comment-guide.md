---
layout: post
title:  "Git提交信息指南"
date:   2019-01-09 18:44:03
categories: git
---

# Git 提交规范


### Comment-Message

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

### Type类型
- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动
- release: 封版，版本号

### [个人添加] 解决版本之间的所有提交信息问题

* 通过新增 `release` 前缀打包, 生成日志的时候从后往前搜索 `release`。 中间的Commint Message作为新版本日志

[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)