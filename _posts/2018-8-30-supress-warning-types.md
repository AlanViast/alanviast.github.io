---
layout: post
title:  "SupressWarnings列表"
date:   2018-8-30 15:30
categories: java code
---

# 异常压制类型

```java
/**
 * @author AlanViast
 */
public interface SuppressWarningType {

    /**
     * to suppress all warnings
     */
    String ALL = "all";
    /**
     * to suppress warnings relative to boxing/unboxing operations
     */
    String BOXING = "boxing";
    /**
     * to suppress warnings relative to cast operations
     */
    String CAST = "cast";
    /**
     * to suppress warnings relative to deprecated annotation
     */
    String DEP_ANN = "dep-ann";
    /**
     * to suppress warnings relative to deprecation
     */
    String DEPRECATION = "deprecation";
    /**
     * to suppress warnings relative to missing breaks in switch statements
     */
    String FALLTHROUGH = "fallthrough";
    /**
     * to suppress warnings relative to finally block that don’t return
     */
    String FINALLY = "finally";
    /**
     * to suppress warnings relative to locals that hide variable
     */
    String HIDING = "hiding";
    /**
     * to suppress warnings relative to missing entries in a switch statement (enum case)
     */
    String INCOMPLETE_SWITCH = "incomplete-switch";
    /**
     * to suppress warnings relative to non-nls string literals
     */
    String NLS = "nls";
    /**
     * to suppress warnings relative to null analysis
     */
    String NULL = "null";
    /**
     * to suppress warnings relative to un-specific types when using generics on class params
     */
    String RAWTYPES = "rawtypes";
    /**
     * to suppress warnings relative to usage of discouraged or forbidden references
     */
    String RESTRICTION = "restriction";
    /**
     * to suppress warnings relative to missing serialVersionUID field for a serializable class
     */
    String SERIAL = "serial";
    /**
     * o suppress warnings relative to incorrect static access
     */
    String STATIC_ACCESS = "static-access";
    /**
     * to suppress warnings relative to unoptimized access from inner classes
     */
    String SYNTHETIC_ACCESS = "synthetic-access";
    /**
     * to suppress warnings relative to unchecked operations
     */
    String UNCHECKED = "unchecked";
    /**
     * to suppress warnings relative to field access unqualified
     */
    String UNQUALIFIED_FIELD_ACCESS = "unqualified-field-access";
    /**
     * to suppress warnings relative to unused code
     */
    String UNUSED = "unused";
}

```