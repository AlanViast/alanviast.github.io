
---
layout: post
title:  "ReactNative自定义字体"
date:   2020-11-16 20:00:00
categories: react-native font
---


1. 在assets文件夹下创建一个fonts目录，将字体放进该文件夹中

2. 打开XCode -> Resources 右键 Add File To [ProjectName]

3. 添加导入文件夹

![导入](/images/ReactNative/import-font.png)

4. 在AppDelegate.m文件夹中执行以下代码获取 familyName 

```
for(NSString *fontfamilyname in [UIFont familyNames]) {

      NSLog(@"family:'%@'",fontfamilyname);

      for(NSString *fontName in [UIFont fontNamesForFamilyName:fontfamilyname]) {
           NSLog(@"\tfont:'%@'",fontName);
      }
          NSLog(@"-------------");
  }
```


* 输出 `DIN Alternate` 则为我导入的字体名

```
..... family:'DIN Alternate'

```


5. Android：直接复制字体文件(我的字体文件为[DINRegular.ttf]) 到 `android/app/src/main/assets/fonts/` 文件夹中


6. 使用方式
```
textDinFont: {
  fontFamily: V.platform.isAndroid ? 'DINRegular' : 'DIN Alternate'
}
```


