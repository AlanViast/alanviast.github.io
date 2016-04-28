---
layout: post
title:  "使用 Angular Material 遇到的Bug 解决方法"
date:   2016-04-29 01:30
categories: angularjs material jquery bug
---


# 1. 工作中使用 Angular Material 遇到的问题

> [Stack Overfollow Questions](http://stackoverflow.com/questions/33676075/angular-material-datepicker-causing-type-property-cant-be-changed-under-ngview)

* 问题如上.
* 通过搜索 [Github 中的源代码](https://github.com/angular/material/search?utf8=%E2%9C%93&q=JQuery&type=Code) 发现 [gesture.js](https://github.com/angular/material/blob/master/src%2Fcore%2Fservices%2Fgesture%2Fgesture.js#L76) 文件的描述
* In some scenarios on Mobile devices (without jQuery), the click events should NOT be hijacked. 看到第76行.
* 看得出项目中 `var hasJQuery =  (typeof window.jQuery !== 'undefined') && (angular.element === window.jQuery);` 虽然不直接依赖JQuery, 但是会判断是否存在并且主动去使用的
* 所以默默的去找JQuery的错误, 搜索 ** type property can't be changed **  找到一个 [issues](https://github.com/mbenford/ngTagsInput/issues/405#)
* 看人家4楼大神的回答, 点击超链接到 [JQuery Bug](https://bugs.jquery.com/ticket/13011)

默默的给自己的项目更换了一个1.9.0的JQuery...........
