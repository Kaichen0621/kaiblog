---
slug: 3-1
title: 3-1 Obsidian 專案結構自動產生器 (Project Generator)
sidebar position: 5
authors: [Leo]
tags: [Vibe Coding]
date: 2026-03-15T08:00
---


# 解決什麼問題？
在 Obsidian 裡開新專案時，通常需要手動建立一個資料夾，再建立各種子資料夾（如 `Notes`, `Assets`, `Scripts`），最後才建立一張主筆記。

這個腳本利用 **Templater** 的強大功能，讓你「一鍵」完成所有動作：
1.  跳出視窗詢問「專案名稱」。
2.  自動建立專屬**資料夾結構**。
3.  自動在裡面新增一張**專案主筆記 (Main Note)**。
4.  自動填入 Metadata (YAML)。

---
## AI 提示詞 (Prompt) Template

*複製下面的文字，貼給 AI 幫你寫這個進階腳本*

```text
我正在使用 Obsidian 的 Templater 插件。
請幫我寫一個進階的 JavaScript 腳本 (Templater Script)，功能如下：

1. **詢問專案名稱**：執行時，使用 `tp.system.prompt` 彈出視窗詢問我「Project Name」。
2. **建立資料夾結構**：
   - 在目前的目錄下，建立一個以「Project Name」為名的主資料夾。
   - 在主資料夾內，自動建立子資料夾：`01_Notes`, `02_Assets`, `03_Scripts`。
3. **建立主筆記**：
   - 在主資料夾內，建立一個同名的 markdown 檔案 (例如 `ProjectName.md`)。
   - 檔案內容要包含基本的 Frontmatter (YAML)：
     - `created`: 當下時間
     - `tags`: project
     - `status`: 🟢 進行中
   - 並自動開啟這個新建立的檔案。

請給我一段可以直接貼入 Templater 使用的完整程式碼。
```

---

## 提示詞 B：新手教學 (Prompt 2)

如果你是第一次使用 Templater，不知道腳本要貼在哪裡，請用這個 Prompt 問 AI：

```text
我已經安裝好 Obsidian Templater 插件。
請教我怎麼設定，才能讓剛剛的 JavaScript 腳本正常運作？

請一步一步教我：
1. **開啟設定**：我需要在設定裡開啟 "User System Scripts" 嗎？
2. **存放位置**：這個腳本檔案應該放在 Obsidian 的哪個資料夾？
3. **如何執行**：我要怎麼透過快捷鍵或按鈕來觸發這個腳本？
```


---

## 常見錯誤 (Common Errors)

這類自動化腳本最容易失敗的地方，通常是 **YAML 格式** 問題。

**1. YAML 縮排極嚴格**
Frontmatter (筆記最上面的 `---`) 內的格式只要多一個空格或少一個換行，就會出問題。

**2. 解決方法**
如果執行失敗，請直接把你的腳本代碼貼給 AI，並附上這句話：
「我執行時發生錯誤，請幫我嚴格檢查這段代碼生成的 YAML 格式，確認換行與縮排是否符合標準。」

**3. 進階除錯 (Console Log)**
如果錯誤訊息很不清楚，可以開啟開發人員工具查看詳細紀錄：
*   **Mac 快捷鍵**：`Option + Command + i` (開啟後切換到 Console 分頁)。
*   **AI 提示詞**：你可以請 AI 在腳本中加入 `console.log` 來印出變數，方便找錯。
   「請幫我在腳本的關鍵步驟加入 `console.log`，讓我能從開發者工具看到它執行到哪裡、變數值是什麼。」
