---
slug: 1-2
title: 1-2 進階版模組 (Git & Templates)
sidebar position: 1
authors: [Leo]
tags: [Vibe Coding]
date: 2026-03-15T08:00
---


這裡提供兩個獨立的「功能模組」，你可以根據需求，選擇要把哪個功能加進你的自動化腳本中。

---

## 模組 A：Git 版本控制 (Git Init)

**給新手的小建議：**
強烈建議每個人都要稍微懂一點 Git！不要覺得「只是小專案」或「我只是自己一個人做」就不用版本控制。
養成習慣非常重要，它就是你專案的時光機。如果覺得觀念很難懂，可以直接問 AI：
> 「請用最簡單的比喻，教我什麼是 Git？為什麼我需要它？」

讓 AI 帶你入門，你會發現新世界！！！！！！！

### 📋 AI 提示詞 (Git 模組)

```text
這是我目前的專案工作流程，請幫我寫一個自動化腳本 (Shell/Batch)。

### 需求：Git 初始化
1. 在新專案資料夾建立後，請自動執行 `git init`。
2. 接著，自動建立一個 `.gitignore` 檔案。
3. 寫入以下影像製作常見的忽略清單，避免 Git 備份到大檔：
   - 系統檔 (.DS_Store)
   - 原始素材 (*.mp4, *.mov, *.mxf, *.wav)
   - Render Cache (Render Files/, Cache/, Audio Previews/)
   - 自動存檔 (Auto-Save/)
   - 輸出檔 (Exports/)
```

---

## 模組 B：模板檔案複製 (Template Cloning)

如果你希望新專案建立時，直接複製好你的 Pr / Ae 模板檔。

### 📋 AI 提示詞 (模板模組)

```text
這是我目前的專案工作流程，請幫我寫一個自動化腳本 (Shell/Batch)。

### 需求：模板複製
1. 我有一個存放模板的資料夾，路徑是 `/_Templates` (請預留這個變數讓我修改)。
2. 腳本執行時，請去偵測裡面有沒有 `Template.prproj` (Premiere)。
3. 如果有，把它們複製到新專案的 `02_ProjectFiles` 資料夾內。
4. **關鍵**：複製過去後，請把檔名自動更改為 `[專案編號]_[專案名稱].prproj`。
```

