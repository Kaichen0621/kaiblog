---
slug: index
title: Vibe Coding 實戰工具包 (Vibe Coding Toolkit)
sidebar_position: 1
sidebar_label:  Vibe Coding 實戰工具包
authors: [Leo]
tags: [Vibe Coding]
date: 2026-03-15T08:00
---


歡迎來到 **Vibe Coding 實戰工具包**，現在開始把所有重複性的髒活交給電腦吧！
:::tip 目錄：
- 01 專案資料夾自動化
  - 01 基礎版 Shell腳本 
  - 02 進階版 Git與模板
- 02 互動指令啟動器
  - 01 基礎版 Shell選單
  - 02 進階版 Python TUI
- 03 Obsidian專案管理
  - 01 新專案自動Metadata
  - 02 進階腳本管理 CustomJS
:::
---

## 必備工具：Claude Code 安裝指南

影片中提到的強大 AI 終端助手是 **Claude Code** (Research Preview)。   
官方：[https://github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

### 安裝方式 (Recommended)

**MacOS/Linux:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

### 第一次啟動
在專案目錄中輸入 `claude` 即可。

---

## 另一個選擇：Google Antigravity (IDE)
如果你習慣在 IDE 內部直接協作，可以參考 Google 最新的 Agentic IDE：
[https://antigravity.google/](https://antigravity.google/)

**為什麼建議用 IDE 開啟專案？**
- **可視化 Git 操作**：這是一定要懂的技能！不用背指令也能輕鬆即時看見更動。
- **即時預覽 Markdown**：直接看到漂亮的排版效果，閱讀文件更舒服。

---

## 如何開始開發？

開發的第一步，永遠是「進入該專案的資料夾」。

1. **開啟終端機 (Terminal)**。
2. **進入你要開發的工具目錄**：
   例如，如果你想修改「CLI 啟動器」，請先輸入指令進入該目錄：
   ```bash
   cd 02 互動指令啟動器
   ```
3. **在該目錄下啟動 Claude Code**：
   ```bash
   claude
   ```
   這樣 AI 才能讀取到該目錄下的檔案，並針對你的需求進行開發。
4. **參考模板文件**：
   每個資料夾內都有 Markdown 文件，裡面包含：
   - **解決什麼問題**：適用情境。
   - **AI Prompt**：你可以直接複製貼給 AI 的提示詞。

祝你的 Coding 充滿 Vibe！
