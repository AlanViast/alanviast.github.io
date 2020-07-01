---
layout: post
title:  "友盟 ReactNative 分享小程序"
date:   2020-07-01 14:00:00
categories: umeng react-native wechat share
---

# 友盟分享小程序卡片


* IOS提供原生的方式, 把下面的方法放到 **UMShareModule.m** 文件中

```objective-c

/**
 分享到微信小程序

 @param shareText 分享文本
 @param icon 分享的icon图标
 @param link 分享的链接
 @param path 分享的小程序路径
 @param title 分享的标题
 @param platform 平台id 详情见官方平台id文档
 @param appId APP_KEY
 @return completion 结束回调
 */
RCT_EXPORT_METHOD(shareToMinProgram:(NSString *)shareText icon:(NSString *)icon link:(NSString *)link path:(NSString *) path title:(NSString *)title platform:(NSInteger)platform appId:(NSString *)appId completion:(RCTResponseSenderBlock)completion)
{
  UMSocialPlatformType plf = [self platformType:platform];
  if (plf == UMSocialPlatformType_UnKnown) {
    if (completion) {
      completion(@[@(UMSocialPlatformType_UnKnown), @"invalid platform"]);
      return;
    }
  }
  
  
  id img = nil;
  if(icon.length > 0){
    if ([icon hasPrefix:@"http"]) {
      img = icon;
    } else {
      if ([icon hasPrefix:@"/"]) {
        img = [UIImage imageWithContentsOfFile:icon];
      } else {
        img = [UIImage imageWithContentsOfFile:[[NSBundle mainBundle] pathForResource:icon ofType:nil]];
      }
    }
  }
  
  //创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  UMShareMiniProgramObject *shareObject = [UMShareMiniProgramObject shareObjectWithTitle:title descr:shareText thumImage:img];
  shareObject.webpageUrl = link;
  shareObject.userName = appId;  // 当前使用小程序的原始id  需修改为配置文件中
  shareObject.path = path;
  messageObject.shareObject = shareObject;
  //调用分享接口
  
  [[UMSocialManager defaultManager] shareToPlatform:plf messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
      if (error) {
        NSString *msg = error.userInfo[@"NSLocalizedFailureReason"];
        if (!msg) {
          msg = error.userInfo[@"message"];
        }if (!msg) {
          msg = @"share failed";
        }
        NSInteger stcode =error.code;
        if(stcode == 2009){
          stcode = -1;
        }
        RCTLog(@"response error message is %@", msg);
        completion(@[@(stcode), msg]);
      }else{
        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
          UMSocialShareResponse *resp = data;
          //分享结果消息
          RCTLog(@"response message is %@",resp.message);
          completion(@[@(0), resp.message]);
          //第三方原始返回的数据
          RCTLog(@"response originalResponse data is %@",resp.originalResponse);
        }else{
          RCTLog(@"response data is %@",data);
          completion(@[@0, @"share success"]);
        }
      }
  }];
}

```


* Android, 修改ShareModule.java文件, 添加下面的方法


```java
/**
 * 分享到微信小程序
 *
 * @param shareText 分享文本
 * @param icon      分享的icon图标
 * @param link      分享的链接// 兼容旧版本
 * @param path      分享的小程序路径
 * @param title     分享的标题
 * @param platform  平台id 详情见官方平台id文档
 * @param appId     APP_KEY
 * @return completion 结束回调
 */
@ReactMethod
public void shareToMinProgram(final String shareText, final String icon, final String link, final String path, final String title, final int platform, final String appId, final Callback successCallback) {
    runOnMainThread(new Runnable() {
        @Override
        public void run() {

            //兼容低版本的网页链接
            UMMin umMin = new UMMin(link);

            if (!StringsKt.isBlank(icon)) {
                // 小程序消息封面图片
                umMin.setThumb(getImage(icon));
            }
            // 小程序消息title
            umMin.setTitle(title);

            // 小程序消息描述
            umMin.setDescription(shareText);

            //小程序页面路径
            umMin.setPath(path);

            umMin.setUserName(appId);
            // 小程序原始id,在微信平台查询

            new ShareAction(ma)
                    .withMedia(umMin)
                    .setPlatform(getShareMedia(platform))
                    .setCallback(getUMShareListener(successCallback)).share();
        }
    });

}
```




* 最后在 React-Native 中调用方法


```javascript

ShareUtil.shareToMinProgram(
  content,
  image,
  url,
  minProgramPath,
  title,
  type,
  '[appId] gh开头的',
  (code, message) => {
    // dosomething
  }
)
```