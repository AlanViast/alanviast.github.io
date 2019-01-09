---
layout: post
title:  "友盟第三方登录后的Token验证"
date:   2019-01-09 18:44:03
categories: java umeng weixin weibo qq
---

### 1. 微信AccessToken验证

[微信文档地址](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419317853&token=&lang=zh_CN)

##### 1. 微信获取用户信息接口

* https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID




```
# 错误返回数据
{
    "errcode": 40001,
    "errmsg": "invalid credential, access_token is invalid or not latest, hints: [ req_id: 2EeaNj0gE-1vkySA ]"
}
```

```
# 正确返回地址
{
  "city": "CITY",
  "country": "COUNTRY",
  "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
  "nickname": "NICKNAME",
  "openid": "OPENID",
  "privilege": [
    "PRIVILEGE1",
    "PRIVILEGE2"
  ],
  "province": "PROVINCE",
  "sex": 1,
  "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL"
}
```

### 2. 微博登陆

[微博用户信息文档](https://open.weibo.com/wiki/2/users/show)

#### 1. 微博

* https://api.weibo.com/2/users/show.json?access_token=ACCESS_TOKEN&uid=UID

```
# 错误返回数据
{
    "error": "source paramter(appkey) is missing",
    "error_code": 10006,
    "request": "/2/users/show.json"
}
```

```
# 正确返回的数据
{
    "id": 1404376560,
    "screen_name": "zaku",
    "name": "zaku",
    "province": "11",
    "city": "5",
    "location": "北京 朝阳区",
    "description": "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。",
    "url": "http://blog.sina.com.cn/zaku",
    "profile_image_url": "http://tp1.sinaimg.cn/1404376560/50/0/1",
    "domain": "zaku",
    "gender": "m",
    "followers_count": 1204,
    "friends_count": 447,
    "statuses_count": 2908,
    "favourites_count": 0,
    "created_at": "Fri Aug 28 00:00:00 +0800 2009",
    "following": false,
    "allow_all_act_msg": false,
    "geo_enabled": true,
    "verified": false,
    "status": {
        "created_at": "Tue May 24 18:04:53 +0800 2011",
        "id": 11142488790,
        "text": "我的相机到了。",
        "source": "<a href="http://weibo.com" rel="nofollow">新浪微博</a>",
        "favorited": false,
        "truncated": false,
        "in_reply_to_status_id": "",
        "in_reply_to_user_id": "",
        "in_reply_to_screen_name": "",
        "geo": null,
        "mid": "5610221544300749636",
        "annotations": [],
        "reposts_count": 5,
        "comments_count": 8
    },
    "allow_all_comment": true,
    "avatar_large": "http://tp1.sinaimg.cn/1404376560/180/0/1",
    "verified_reason": "",
    "follow_me": false,
    "online_status": 0,
    "bi_followers_count": 215
}

```


### 3. QQ登录获取用户信息

[QQ](http://wiki.connect.qq.com/get_user_info)


```
# 错误的数据
{
    "ret": -23,
    "msg": "token is invalid"
}
```

```
# 正确返回的数据
{
  "figureurl": "http://qzapp.qlogo.cn/qzapp/111111/942FEA70050EEAFBD4DCE2C1FC775E56/30",
  "figureurl_1": "http://qzapp.qlogo.cn/qzapp/111111/942FEA70050EEAFBD4DCE2C1FC775E56/50",
  "figureurl_2": "http://qzapp.qlogo.cn/qzapp/111111/942FEA70050EEAFBD4DCE2C1FC775E56/100",
  "figureurl_qq_1": "http://q.qlogo.cn/qqapp/100312990/DE1931D5330620DBD07FB4A5422917B6/40",
  "figureurl_qq_2": "http://q.qlogo.cn/qqapp/100312990/DE1931D5330620DBD07FB4A5422917B6/100",
  "gender": "男",
  "is_yellow_vip": "1",
  "is_yellow_year_vip": "1",
  "level": "7",
  "msg": "",
  "nickname": "Peter",
  "ret": 0,
  "vip": "1",
  "yellow_vip_level": "7"
}
```


### Java Utils 类

```java
/**
 * 第三方接口验证
 *
 * @author AlanViast
 */
public class UserThridPartyUtils {

    /**
     * 使用微信AccessToken和OPENID获取对应的用户数据
     *
     * @return 微信用户信息, 当errcode不为null时改Token为正确的
     */
    public static WechatUserInfo getWechatUserInfo(String accessToken, String openId) {
        String url = "https://api.weixin.qq.com/sns/userinfo";
        Map<String, String> params = new HashMap<>(2);
        params.put("access_token", accessToken);
        params.put("openid", openId);
        return HttpUtils.get(url, params, WechatUserInfo.class);
    }

    /**
     * 使用微信AccessToken和OPENID获取对应的用户数据
     *
     * @return 微信用户信息, 当errcode不为null时改Token为正确的
     */
    public static WeiboUserInfo getWeiboUserInfo(String accessToken, String uid) {
        String url = "https://api.weibo.com/2/users/show.json";
        Map<String, String> params = new HashMap<>(2);
        params.put("access_token", accessToken);
        params.put("uid", uid);
        return HttpUtils.get(url, params, WeiboUserInfo.class);
    }

    public static QqUserInfo getQqUserInfo(String accessToken, String openId, String appid) {
        String url = "https://graph.qq.com/user/get_user_info";
        Map<String, String> params = new HashMap<>(3);
        params.put("access_token", accessToken);
        params.put("openid", openId);
        params.put("oauth_consumer_key", appid);
        return HttpUtils.get(url, params, QqUserInfo.class);
    }
}

```


### Entity类

```java
@Data
public class QqUserInfo {

    private String nickname;
    private String figureurl;
    private String gender;
    private String year;

    @JsonProperty("ret")
    private Integer errcode;

    @JsonProperty("msg")
    private String errmsg;

}
```


```java
@Data
public class WeiboUserInfo {

    @JsonProperty("idstr")
    private String id;


    private String name;
    private String location;
    private String description;

    private String gender;

    @JsonProperty("avatar_hd")
    private String avatar;

    @JsonProperty("error_code")
    private Integer errcode;

    @JsonProperty("error")
    private String errmsg;

}

```

```java
@Data
public class WechatUserInfo {

    private String openid;
    private String nickname;
    private String language;
    private String city;
    private String province;
    private String country;
    private String headimgurl;
    private String unionid;
    private Integer sex;

    private Integer errcode;
    private String errmsg;

}
```