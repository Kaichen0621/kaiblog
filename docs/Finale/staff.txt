---
title: 譜表屬性工具
slug: staff-tool
date: 2026-01-14T04:30
sidebar_position: 5
sidebar_label: 譜表屬性工具
authors: [KAI]
tags: [Finale]
---

:::danger 在小節選中的狀態，選中該工具可使用 `Enter` 來開啟設定視窗
:::

<details>
<summary>該工具可以調整 `樂譜 (譜表) 屬性`</summary>

![](staff/page.jpeg)
</details>

- - -


<details>
<summary>名詞解釋</summary>


![](staff/StaffAttributes_SET.png)
</details>




- Staff Attributes：譜表屬性
用來控制「單一譜表 要顯示哪些元素、如何顯示」
- Staff Attributes For：套用對象（譜表）
例如：Staff 1、Staff 2，只會影響選到的那一行譜

- - - 

Behaviors（行為設定）
- Allow Hiding When Empty：空小節時允許隱藏譜表
常見於合唱、管弦樂，沒聲部就自動收起
- Break Barline Between Staves：不同譜表的小節線分開
- Break Repeat Barlines Between Staves：重複記號小節線分開
- Display Rests in Empty Measures：空小節顯示休止符
    - 🌟 教學、考試譜一定要開

- Flat Beams：水平符桿
- Force Hide Staff：強制隱藏譜表
即使有音符也不顯示（進階）
- Ignore Key Signatures：忽略調號
- Redisplay Accidentals in Other Layers Within Measures : 
同小節不同 Layer 重新顯示臨時記號

- - -

Independent Elements（獨立元素）
- Key Signature：調號獨立
- Time Signature：拍號獨立
- Notehead Font：音符頭字型

- - -

Appearance（外觀）
- Alternate Notation：替代記譜法
- Use Note Shapes：音符形狀記譜
- Full Staff Name Position：完整譜名位置
- Abbr. Staff Name Position：縮寫譜名位置

---

Items to Display（顯示項目）

控制「這一行譜 要不要顯示什麼」
- Augmentation Dots：附點
- Barlines：小節線
- Chords：和弦
- Clefs：譜號
- Endings and Text Repeats：反覆記號
- Fretboards：指板圖
- Key Signatures：調號
- Lyrics：歌詞
- Measure Numbers：小節號
- Repeat Bars：反覆小節
- Rests：休止符
- Staff Lines：五線
- Staff Name in Score：總譜顯示譜名
- Staff Name in Parts：分譜顯示譜名
- Stems：符桿
- Ties：延音線
- Time Signatures in Score：總譜拍號
- Time Signatures in Parts：分譜拍號

---

### 移動！

<details>
<summary>可以透過紫色點移動每一行！</summary>

![](staff/control.jpeg)
</details>

:::tip 教學小技巧
- 做「聽寫譜」： 保留 Rests + Measure Numbers
- 做「簡化教學譜」： 關掉 Staff Lines
- 合唱總譜一定要開 Allow Hiding When Empty
:::


