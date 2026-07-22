---
slug: install-mac-app
title: 怎麼安裝 Mac 應用程式 ?
date: 2026-02-09T11:00
---

## 前言

之前不是說過我設計了 [Youtube 下載神器 ↺](/blog/YTdownload) 嗎 ? 結果意外發現更好用的 :

:::danger 🔗 https://github.com/aandrew-me/ytDownloader
:::

安裝的時候居然跳出 `「YTDownloader」已損毀，無法打開。 你應該將其丟到「垃圾桶」。`
- Brave在今天12:37下載此檔案。

{/* truncate */}


### 到這裡選擇有兩個

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`)
    }}>
    {children}
  </span>
);

<Highlight color="#454c4a">取消</Highlight>  |  <Highlight color="#3c3d3f">丟到垃圾桶</Highlight> 

### 慌張的我

當然馬上找朋友求救啊 ～

:::tip 親愛的朋友
不好意思 ～ 我不懂您的意思
:::

我知道現在 AI 很厲害 ... 但是 AI 不會告訴你怎麼 (違法) 下載 YouTube 影片

## Google 一下

:::warning 先說方法好了 :

1. 打開 Ternimal
2. 輸入以下指令

``` sh
sudo xattr -r -c 
```
        ※ -c 後面要有 `空白鍵一格`

3. 直接把 **要解鎖的應用程式** 移動到終端機

4. 當你看到：`「sudo」正在嘗試以管理者身分執行指令。使用Touch ID 或輸入密碼來允許此項目。`
- 輸入密碼 / 指紋

5. 試著打開軟體
:::

## 詳細教學影片

這邊有更詳細的教學影片

<div class="youtube">
<iframe width="560" height="315" src="https://www.youtube.com/embed/4m9HRB0WrhE?si=9Gqa_9-AgZAtbjCd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>在 Mac 上裝軟體，要學會和蘋果鬥智鬥勇</p>
</div>

最近回國好累...