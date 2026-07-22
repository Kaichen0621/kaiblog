---
sidebar_position: 3
---

# 建立部落格文章

Docusaurus 會為 **每一篇部落格文章建立專屬頁面**，同時也會自動產生 **部落格首頁**、**標籤系統**、**RSS** 訂閱源等功能。

## 建立你的第一篇文章

在 `blog/2021-02-28-greetings.md` 建立一個檔案：

```md title="blog/2021-02-28-greetings.md"
---
slug: greetings
title: 歡迎！
authors:
  - name: Joel Marcey
    title: Docusaurus 1 共同創作者
    url: [https://github.com/JoelMarcey](https://github.com/JoelMarcey)
    image_url: [https://github.com/JoelMarcey.png](https://github.com/JoelMarcey.png)
  - name: Sébastien Lorber
    title: Docusaurus 維護者
    url: [https://sebastienlorber.com](https://sebastienlorber.com)
    image_url: [https://github.com/slorber.png](https://github.com/slorber.png)
tags: [greetings]
---

恭喜你，你已經完成了第一篇文章！

隨意嘗試並根據你的喜好編輯這篇文章吧。

現在可以透過 http://localhost:3000/blog/greetings 瀏覽新的部落格文章。
