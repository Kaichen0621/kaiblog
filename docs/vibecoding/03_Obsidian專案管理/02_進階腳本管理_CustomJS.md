---
slug: 3-2
title: 3-2 進階腳本管理 (CustomJS)
sidebar position: 6
authors: [Leo]
tags: [Vibe Coding]
date: 2026-03-15T08:00
---
## 這是什麼？

當你的 Dataviewjs 腳本變得很複雜，或者你想在多個筆記重複使用同一個功能（例如：生成按鈕、複雜的日期計算）時，**CustomJS** 是最佳解法。
它允許你將 JavaScript 寫成獨立的 `.js` 檔案，然後在 Obsidian 任何地方呼叫它。

我們將這個流程拆解為簡單的「三步驟提示詞」，請依照需求複製貼給 AI。

---

## 提示詞 A：環境設定 (Setup)

*如果你是第一次使用，請先用這個 Prompt 讓 AI 教你設定插件與資料夾。*

```text
我想要開始使用 Obsidian 的 CustomJS 插件。

請教我基礎設定：
1. **資料夾設定**：請問我的 .js 腳本應該放在哪個資料夾？需要在插件設定裡手動指定嗎？(通常建議 scripts/customjs)
2. **測試是否成功**：請給我一個最簡單的 `HelloWorld.js` 範例。
3. **如何執行**：在 Dataviewjs 裡，我要用什麼語法來呼叫它？(是 `customJS.ClassName` 嗎？)
```

---

## 提示詞 B：撰寫腳本 (Coding)

*環境設定好後，用這個 Prompt 請 AI 幫你寫出實用的功能 (例如：萬用按鈕)。*

```text
我已經設定好 CustomJS 了。請幫我寫一個 `ViewUtils.js`，功能是產生一顆「漂亮的按鈕」。

### 腳本需求 (ViewUtils.js)：
請寫一個 class 叫做 `ViewUtils`，裡面有一個 `renderButton` 方法：
- 接收參數：`container` (HTML容器), `text` (按鈕文字), `callback` (點擊後的 async 動作)。
- **重要**：請使用 `container.createEl("button")` 來建立按鈕，不要用 `dv.el` (避免 ReferenceError)。
- 請幫我加上簡單的 CSS 讓按鈕好看一點 (圓角、滑鼠懸停效果)。

### 呼叫範例 (Dataviewjs)：
請給我一段在筆記中呼叫它的範例代碼：
- 使用解構賦值寫法：`const { ViewUtils } = customJS;`
- 在按鈕點擊後，跳出一個 `new Notice("測試成功")`。
```

---

## 提示詞 C：功能延伸 (Extension)

*如果你想修改樣式或增加功能，請用這個 Prompt。*

```text
這顆按鈕功能正常，但我想改一下外觀與功能：

1. **換顏色**：請把按鈕背景改成「紫色漸層」風格，文字改為白色。
2. **加圖示**：能不能在按鈕文字前面加上一個 emoji？
3. **點擊後行為**：原本是跳出通知，改成「點擊後自動去建立一個新筆記」，標題叫 `Demo_Note`，內容隨意。
```
