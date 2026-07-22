---
slug: 2-1
title: 2-1 互動式終端啟動器
sidebar position: 3
authors: [Leo]
tags: [Vibe Coding]
date: 2026-03-15T08:00
---
# 02. 互動式終端啟動器

##  這個腳本能做什麼？

這是一個「專案傳送門」腳本。它的邏輯很單純，分為兩層：
1.  **第一層 (Where)**：你要去哪個專案？ (Ex: VibeCoding, 網站開發, 腳本企劃...)
2.  **第二層 (Who)**：你要帶哪個 AI 進去？ (Ex: Claude Code, Gemini CLI, Copilot...)

不用再手動 `cd` 到深層目錄，也不用怕忘記怎麼啟動特定的 AI 工具。

---

## AI 提示詞 (Prompt) Template

複製下面的文字，貼給 AI

```text
請幫我寫一個「兩層式」的自動化啟動腳本 (Launcher)。
請分別給我 **Mac (Shell Script)** 與 **Windows (Batch)** 兩個版本。

### 核心邏輯：
這個腳本執行後，要依序進行兩個步驟的選單選擇：

#### 第一層：選擇專案 (Project Selection)
請在腳本開頭預留一個顯眼的「設定區」，讓我填入我的常用專案路徑。
格式類似：
- 專案A: /Users/leo/Projects/App
- 專案B: /Users/leo/Projects/Website
- 專案C: /Users/leo/Obsidian/Notes

執行時，請列出這些專案名稱讓我選擇 (1, 2, 3...)。
選擇後，腳本自動 `cd` 進入該目錄。

#### 第二層：選擇 AI 工具 (AI Tool Selection)
進入目錄後，顯示第二層選單，讓我選擇要啟動的 AI 工具：
1. **Claude Code**
2. **Gemini CLI** 
3. **Github Copilot**
4. **純終端機** (不啟動 AI，留在該目錄)

### 介面要求：
- 使用簡單的數字選單即可。
- 進入某個專案或啟動工具前，印出一行綠色的提示文字 (ex: "🚀 Launching Claude in Project A...")。
- 執行完畢後，請暫停畫面 (Pause)，不要直接關閉視窗。

### 附加請求：
請在程式碼的註解中簡單說明如何執行這個腳本。

```

---

## 提示詞 B：腳本設定與優化 (Prompt 2)

寫完腳本後，你可以用這個 Prompt 請 AI 教你如何把它設定成「一鍵啟動」。

複製下面的文字，貼給 AI

```text
我已經把剛剛的腳本存好了。
現在請教我怎麼設定，讓我能最快速地啟動它：

### Mac 用戶 (推薦使用 Ghostty 終端機)：
1. 我正在使用 **Ghostty** 終端機。
2. 請教我如何設定 Ghostty 的 config，或是建立一個專屬的 Command，讓我打開 Ghostty 時可以直接選單啟動這個腳本？
3. 或者教我設定 `alias` (例如輸入 `go` 就執行)。

### Windows 用戶：
1. 請教我如何把這個 `.bat` 檔設定到 **Windows Terminal** 的設定檔 (settings.json) 中。
2. 我想要在 Windows Terminal 的下拉選單中，直接看到「Vibe Coding Launcher」這個選項。
```