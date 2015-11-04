---
layout: post
title: "学习C语言 (1) "
date:  2015-11-04 22:15:00
categories: C
---

#### 1. C语言代码结构

1. `#include` 指示和头文件
2. `main()` 函数
3. `/* 这是注释 */` 文档注释
4. `{....}` 代码主体
5. 声明语句 或 赋值
6. 逻辑代码

#### 2. 整型

* 整数类型 `int` 就是没有小数部分的数
* 浮点类型 `float` 包含了证书之间的数字, 以及带小数点的数, 指数也是浮点数
* short 占用16位 (范围是-32767 到 32767)
* int 占用16位或者32位\[按机器决定\] (范围是-2147483647 到 2147483647)
* long 占用32位 (范围是-2147483647 到 2147483647)
* long long 占用64位 (范围是 -9223372036854775807 到 9223372036854775807)
* unsigned short 表示没有负数的 short 类型 (范围 0 到 65535)
* unsigned int 表示没有负数的 int 类型
* unsigned long 表示没有负数的 long 类型 (范围 0 到 4294967295)
* unsigned long long 表示没有负数的　long long 类型 (范围是　0 到　18446744073709551615)

* `%hd` 表示接收一个 short 类型
* `%ld` 表示接收一个 long 类型
* `%lld` 表示接收一个 long long 类型

#### 3. char 类型

* char 类型表格单个字符
* `%c` 接收一个字符类型

#### 4. 浮点型

* double
* float

#### 知识点

* 声明支持多个声明, 如 `int a, b;`

* `scanf('%f' , &weight)` 接受一个浮点类型的值
* `printf('%f', weight)` 打印一个浮点类型的值

* 在程序运行钱预先设定并且整个运行过程中都不会改变的值叫做 `常量`
* 在程序中需要变化且去指定的值叫 `变量`

#### 关键字列表

* auto: 声明自动变量
* break: 跳出当前循环
* case: 开关语句分支
* char: 声明字符型变量或函数返回值类型
* const: 声明只读变量
* continue: 结束当前循环，开始下一轮循环
* default: 开关语句中的“其它”分支
* do: 循环语句的循环体
* double: 声明双精度浮点型变量或函数返回值类型
* else: 条件语句否定分支（与 if 连用）
* enum: 声明枚举类型
* extern: 声明变量或函数是在其它文件或本文件的其他位置定义
* float: 声明浮点型变量或函数返回值类型
* for: 一种循环语句
* goto: 无条件跳转语句
* if: 条件语句
* int: 声明整型变量或函数
* long: 声明长整型变量或函数返回值类型
* register: 声明寄存器变量
* return: 子程序返回语句（可以带参数，也可不带参数）
* short: 声明短整型变量或函数
* signed: 声明有符号类型变量或函数
* sizeof: 计算数据类型或变量长度（即所占字节数）
* static: 声明静态变量
* struct: 声明结构体类型
* switch: 用于开关语句
* typedef: 用以给数据类型取别名
* unsigned: 声明无符号类型变量或函数
* union: 声明共用体类型
* void: 声明函数无返回值或无参数，声明无类型指针
* volatile: 说明变量在程序执行中可被隐含地改变
* while: 循环语句的循环条件


#### 转义字符

* TIP 最后的`()`表示ASCII码值

* `\a` 响铃(BEL) (007)
* `\b` 退格(BS) ，将当前位置移到前一列 (008)
* `\f` 换页(FF)，将当前位置移到下页开头 (012)
* `\n` 换行(LF) ，将当前位置移到下一行开头 (010)
* `\r` 回车(CR) ，将当前位置移到本行开头 (013)
* `\t` 水平制表(HT) （跳到下一个TAB位置） (009)
* `\v` 垂直制表(VT) (011)
* `\\` 代表一个反斜线字符''\' (092)
* `\'` 代表一个单引号（撇号）字符 (039)
* `\"` 代表一个双引号字符 (034)
* `\?` 代表一个问号 (063)
* `\0` 空字符(NUL) (000)
* `\ddd` 1到3位八进制数所代表的任意字符 (三位八进制)
* `\xhh` 1到2位十六进制所代表的任意字符 (二位十六进制)





#### Hello World

```

#include<stdio.h>

int main(void) {
  printf("Hello World");
}

```


#### 进制
```
#include<stdio.h>

int main( void ) {

  int x = 100;
  printf(" dec = %d, octal = %o, hex = %x \n", x, x, x);
  printf(" dec = %d, octal = %#o, hex = %#x \n", x, x, x);
  return 0;
}
```

#### sizeof

```
#include <stdio.h>

int main( void ) {
  printf("Type int has a size of %zu bytes. \n", sizeof(int));
  printf("Type char has a size of %zu bytes.\n", sizeof(char));
  printf("Type long has a size of %zu bytes.\n", sizeof(long));
  printf("Type double has a size of %zu bytes. \n", sizeof(double));
  return 0;
}

```