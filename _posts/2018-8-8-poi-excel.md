---
layout: post
title:  "POI 操作 excel"
date:   2018-8-8 16:40:12
categories: java code poi
---

### 从 Maven 导入

```
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>3.17</version>
</dependency>
```

### 读取

```
try (FileInputStream fileInputStream = new FileInputStream(FileUtils.getFile("test.xlsx"));
     Workbook workbook = new XSSFWorkbook(fileInputStream)) {
    Sheet sheet = workbook.getSheetAt(0);
    for (Row row : sheet) {
        for(Cell cell : row) {
            cell.setCellType(CellType.STRING);
            String cellValue = cell.getStringCellValue();
            // 输出所有列内容
            System.out.println(cellValue);
        }
    }
} catch (Exception e) {
    e.printStackTrace();
    throw new RuntimeException(e);
}
```


### 写入

```
try (FileOutputStream fileOutputStream = new FileOutputStream(FileUtils.getFile("test.xlsx"));
     Workbook workbook = new XSSFWorkbook()) {

    Sheet sheet = workbook.createSheet();

    Row row = sheet.createRow(0);

    Cell cell = row.createCell(0);
    cell.setCellType(CellType.STRING);
    cell.setCellValue("test");

    workbook.write(fileOutputStream);

} catch (Exception e) {
    e.printStackTrace();
    throw new RuntimeException(e);
}
```

