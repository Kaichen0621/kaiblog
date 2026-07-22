---
slug: 2-2
title: 2-2 進階版互動啟動器 (Advanced TUI Launcher)
sidebar position: 4
authors: [Leo]
tags: [Vibe Coding]
date: 2026-03-15T08:00
---

## 💡 這是什麼？
如果你覺得 Shell Script 的選單太簡陋，這個版本使用了 Python 的 **Rich** 函式庫，製作出像駭客電影一樣的精美互動介面 (TUI - Text User Interface)。它可以支援鍵盤上下選擇、漂亮的表格與進度條。

---

## 📦 安裝需求
這個腳本需要 Python 以及 `rich` 和 `questionary` 兩個套件：

```bash
pip install rich questionary
```

---

## 🤖 AI 提示詞 (Prompt) Template

```text
請幫我用 Python 寫一個進階的專案啟動器 (Launcher)。

### 技術需求：
1. 使用 `rich` 函式庫來美化介面 (要有漂亮的標題 Header、Panel)。
2. 使用 `questionary` 函式庫來製作「可選單」的互動列表 (讓使用者用鍵盤上下鍵選擇，而不是輸入數字)。
3. 功能選項包含：
   - 🚀 Start Dev Server (執行 npm run dev)
   - 📂 Open Project (開啟當前資料夾)
   - 🐙 Git Sync (執行 git pull + push)
   - 📊 System Stat (顯示簡單的 CPU/記憶體資訊，如果太難可省略)
   - 🚪 Exit

### 視覺風格：
請給我一點 Cyberpunk 風格，使用霓虹配色 (Neon colors)，標題要夠帥。

請給我完整的 Python 程式碼 (`main.py`)。
```

---

## ⚡️ 範例代碼 (Python + Rich)
存成 `launcher_pro.py` 後執行 `python launcher_pro.py`。

### `launcher_pro.py`

```python
import sys
import os
import time
import subprocess
from rich.console import Console
from rich.panel import Panel
from rich.layout import Layout
from rich.text import Text
from rich.table import Table
import questionary

console = Console()

def print_header():
    console.clear()
    title = Text(" VIBE CODING HUB ", style="bold black on cyan", justify="center")
    subtitle = Text(" Advanced Project Controller v2.0 ", style="italic cyan", justify="center")
    
    header_panel = Panel(
        subtitle,
        title=title,
        border_style="cyan",
        padding=(1, 2)
    )
    console.print(header_panel)

def run_task(task_name, command):
    with console.status(f"[bold green]Working on {task_name}...", spinner="dots"):
        # 模擬執行時間
        time.sleep(1.5) 
        # 實際執行指令 (這裡用 echo 模擬)
        # subprocess.run(command, shell=True)
        console.print(f"[green]✔ {task_name} Completed![/green]")
        time.sleep(0.5)

def main():
    while True:
        print_header()
        
        # 使用 Questionary 建立選單
        action = questionary.select(
            "請選擇要執行的任務:",
            choices=[
                "🚀 啟動開發伺服器 (Start Dev)",
                "📂 開啟專案資料夾 (Open Dir)",
                "🐙 Git 同步 (Sync)",
                "🔧 執行測試 (Run Tests)",
                "🚪 離開 (Exit)"
            ],
            style=questionary.Style([
                ('qmark', 'fg:cyan bold'),
                ('question', 'fg:white bold'),
                ('answer', 'fg:green bold'),
                ('pointer', 'fg:cyan bold'),
                ('highlighted', 'fg:cyan bold'),
                ('selected', 'fg:green bold'),
            ])
        ).ask()

        if not action:
            break

        if "離開" in action:
            console.print("[bold cyan]See you space cowboy...[/bold cyan]")
            break
        
        elif "啟動開發" in action:
            # 範例：實際執行指令可以這樣寫
            # os.system("npm run dev")
            console.print("[yellow]正在啟動 Next.js Server...[/yellow]")
            run_task("Dev Server", "npm run dev")
            input("\n按 Enter 返回...")
            
        elif "開啟專案" in action:
            if sys.platform == 'darwin':
                os.system("open .")
            else:
                os.startfile(".")
                
        elif "Git" in action:
            run_task("Git Pull", "git pull")
            run_task("Git Push", "git push")
            input("\n按 Enter 返回...")
            
        else:
            run_task("Task", "echo 'test'")
            input("\n按 Enter 返回...")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        console.print("\n[red]已強制中斷[/red]")
```
