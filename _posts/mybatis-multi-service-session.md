---
layout: post
title:  "使用ThreadLocal<T> 解决多个SqlSession不同事务的问题"
date:   2018-11-21 15:54:25
categories: java refactor
---

### 使用ThreadLocal<T> 解决多个SqlSession不同事务的问题

问题: 项目中使用了Mybatis版本比较低, 没有使用Spring, 导致每个表操作都使用了单独的SqlSession


1. 在取SqlSession时候判断是否第一个进入的Service, 如果不存在则新建一个session放入ThreadLocal<T>. 否则取上一个Service中的session

```
/**
 * @author AlanViast
 */
@Log4j2
public class BaseService {


    private static final ThreadLocal<SqlSession> sqlSessionThreadLocal = new ThreadLocal<>();

    /**
     * 查询方法， 不需要提交事务
     *
     * @param serviceFunction lambda执行表达式
     */
    public static <T> T select(ServiceFunction<SqlSession, T> serviceFunction) {
        return select(null, serviceFunction);
    }

    /**
     * 根据线程获取对应的SqlSession
     *
     * @param connection 第三方数据库连接
     * @return 对应的SQLSession
     */
    public static SqlSession getByThread() {
        SqlSession sqlSession = sqlSessionThreadLocal.get();
        if (sqlSession == null) {
            sqlSession = MySqlDao.openSession(null);
            sqlSessionThreadLocal.set(sqlSession);
        }
        return sqlSession;
    }

    public static void clearCurrentThread() {
        sqlSessionThreadLocal.set(null);
    }

    public static boolean isHead() {
        return sqlSessionThreadLocal.get() == null;
    }

    /**
     * 自定义链接
     */
    public static <T> T select(ServiceFunction<SqlSession, T> serviceFunction) {
        // 使用 AutoClose 特性
        boolean head = isHead();
        SqlSession session = getByThread();
        try {
            return serviceFunction.handle(session);
        } catch (LogicException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        } finally {
            if (head) {
                // 如果执行到头部则手动关闭资源, 并且清除掉当前线程绑定的Session
                MySqlDao.close(session);
                BaseService.clearCurrentThread();
            }
        }
    }

    public static <T> T execute(ServiceFunction<SqlSession, T> serviceFunction) {

        boolean head = isHead();
        SqlSession session = getByThread();
        try {
            T result = serviceFunction.handle(session);
            if (head) {
                session.commit();
            }
            return result;
        } catch (LogicException ex) {
            if (head) {
                MySqlDao.rollback(session);
            }
            throw ex;
        } catch (Exception ex) {
            // 事务回滚
            if (head) {
                MySqlDao.rollback(session);
            }
            throw new RuntimeException(ex);
        } finally {
            if (head) {
                MySqlDao.close(session);
                BaseService.clearCurrentThread();
            }
        }
    }
}

```


