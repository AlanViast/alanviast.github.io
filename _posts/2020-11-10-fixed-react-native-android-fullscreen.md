---
layout: post
title:  "Android刘海屏 顶部状态栏隐藏"
date:   2020-11-10 16:00:00
categories: android react-native
---


# Android全屏设置

* 在 app/src/main/res/values-v28/ 添加 ``<item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>``

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        ...
        <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
    </style>
</resources>

```


