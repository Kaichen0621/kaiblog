---
sidebar_position: 2
---

# 建立文件

文件是透過以下功能連結的 **頁面群組**：

- **側邊欄 (Sidebar)**
- **上一頁/下一頁導覽**
- **版本控制**

## 建立你的第一份文件

在 `docs/hello.md` 建立一個 Markdown 檔案：

```md title="docs/hello.md"
# 哈囉

這是我的 **第一份 Docusaurus 文件**！

現在可以透過 http://localhost:3000/docs/hello 瀏覽新文件。
設定側邊欄
Docusaurus 會自動根據 docs 資料夾 產生側邊欄。
你可以加入元數據（metadata）來自訂側邊欄的標籤與排序位置：
---
sidebar_label: '嗨！'
sidebar_position: 3
---

# 哈囉

這是我的 **第一份 Docusaurus 文件**！

你也可以在 sidebars.js 中明確地定義你的側邊欄：
``` md
export default {
  tutorialSidebar: [
    'intro',
    // highlight-next-line
    'hello',
    {
      type: 'category',
      label: '教學',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
};
```
