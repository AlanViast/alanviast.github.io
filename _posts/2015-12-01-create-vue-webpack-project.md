---
layout: post
title:  "使用Vue + Webpack "
date:   2015-12-01 10:00:00
categories: vue webpack
---

#### 1 创建项目

* 创建目录
> $ mkdir VueDemo
> $ cd VueDemo

* 初始化项目
> $ npm init

* 添加依赖
> $ npm install

* 创建源代码目录以及构建目录
> $ mkdir static src

* 创建 Webpack 配置文件
> $ touch webpack.config.js


#### 文件目录

```
.
├── node_modules
│   ├── .......
├── public
│   ├── main.js
│   └── main.js.map
├── src
│   ├── app.vue
│   └── main.js
└── webpack.config.js
├── package.json
├── index.html
```


#### 文件源代码

* package.json

```
{
  "name": "VueDemo",
  "version": "0.0.1",
  "description": "vue project demo",
  "main": "src/index.js",
  "scripts": {
    "dev": "webpack --watch",
    "build": "webpack"
  },
  "keywords": [
    "vue"
  ],
  "author": "AlanViast",
  "license": "MIT",
  "devDependencies": {
    "babel-core": "^6.1.2",
    "babel-loader": "^6.1.0",
    "babel-plugin-transform-runtime": "^6.1.2",
    "babel-preset-es2015": "^6.1.2",
    "babel-preset-stage-0": "^6.1.2",
    "babel-runtime": "^6.0.14",
    "bower": "^1.6.5",
    "css-loader": "^0.21.0",
    "style-loader": "^0.13.0",
    "vue": "^1.0.8",
    "vue-hot-reload-api": "^1.2.1",
    "vue-html-loader": "^1.0.0",
    "vue-loader": "^7.0.3",
    "vue-resource": "^0.1.17",
    "vue-router": "^0.7.6",
    "webpack": "^1.12.6",
    "webpack-dev-server": "^1.12.1"
  },
  "dependencies": {
  }
}

```

* webpack.config.js

```
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
        path: './public',
        publicPath: 'public/',
        filename: 'main.js' // 可以多点切入
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=[name].[ext]?[hash]'
      }
    ]
  },
  // example: if you wish to apply custom babel options
  // instead of using vue-loader's default:
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
```


* index.html

``` HTML
<!DOCTYPE html>
<html>
<head>
  <title>Index</title>
</head>
<body>
  <app></app>
  <script src="./public/main.js"></script>
</body>
</html>
```

* main.js

``` javascript
var Vue = require('vue');
var App = require('./app.vue');


var mainApp = new Vue({
  el: 'body',
  components: {
    app: App
  }
});
```

* app.vue

```
<style>
.text-center {
  text-align: center;
}
</style>

<template>
  <h1 class="text-center">{{msg}}</h1>
</template>

<script>
module.exports = {
  data: function(){
    return {
      msg: 'Hello World'
    };
  }
};
</script>
```