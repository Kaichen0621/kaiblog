---
sidebar_position: 1
---

# 建立頁面

將 **Markdown 或 React** 檔案新增至 `src/pages` 目錄，即可建立 **獨立頁面**：

- `src/pages/index.js` → `localhost:3000/`

- `src/pages/foo.md` → `localhost:3000/foo`

- `src/pages/foo/bar.js` → `localhost:3000/foo/bar`

## 建立你的第一個 React 頁面

在 `src/pages/my-react-page.js` 建立一個檔案：

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>我的 React 頁面</h1>
      <p>這是一個 React 頁面</p>
    </Layout>
  );
}
```

現在可以透過 http://localhost:3000/my-react-page 瀏覽新頁面。

建立你的第一個 Markdown 頁面
在 src/pages/my-markdown-page.md 建立一個檔案：

# 我的 Markdown 頁面

這是一個 Markdown 頁面

現在可以透過 http://localhost:3000/my-markdown-page 瀏覽新頁面。

