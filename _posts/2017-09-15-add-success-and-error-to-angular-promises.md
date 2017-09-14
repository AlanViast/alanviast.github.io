---
layout: post
title:  "How to Add .success() and .error() to Angular Promises"
date:   2017-09-15 01:40:00
categories: angular promise
---


> 首先自己要创造一个 * Deferred *, 添加`success()`和`error()`的函数

```javascript
angular.module('App').factory('promiseFactory', function($q) {
  return {
    decorate: function(promise) {
      promise.success = function(callback) {
        promise.then(callback);

        return promise;
      };

      promise.error = function(callback) {
        promise.then(null, callback);

        return promise;
      };
    },
    defer: function() {
      var deferred = $q.defer();

      this.decorate(deferred.promise);

      return deferred;
    }
  };
});
```

> 然后使用 `promiseFactory.defer()` 去创建一个Deferred对象


```javascript
angular.module('App').factory('authManager', function($http, promiseFactory) {
  return {
    login: function(username, password) {
      var dfd = promiseFactory.defer();

      $http
        .post('/api/login', {username: username, password: password})
        .then(function(res) {
          return dfd.resolve(res);
        }, function(err) {
          return dfd.reject(err);
        });

      return dfd.promise;
    }
  };
});
```

> 使用自己的Deferred

```javascript
angular.module('App').factory('authManager', function($http, promiseFactory) {
  return {
    login: function(username, password) {
      var dfd = promiseFactory.defer();

      $http
        .post('/api/login', {username: username, password: password})
        .then(function(res) {
          return dfd.resolve(res);
        }, function(err) {
          return dfd.reject(err);
        });

      return dfd.promise;
    }
  };
});
```



> From [https://ericnish.io/blog/add-success-and-error-to-angular-promises/](https://ericnish.io/blog/add-success-and-error-to-angular-promises/)

