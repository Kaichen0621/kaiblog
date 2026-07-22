---
slug: ai-code-0618
title: 隨機輪盤網頁生成與優化
description: "這篇要寫什麼？的附錄"
tags: [AI]
unlisted: true
---

### 總共嘗試了三次～

<a href="/blog/random01" className="custom-btn" target="">點我返回</a>

#### 往上捲可返回原始文章
- 生成內容如下：

你可以將以下程式碼複製並貼到任何文字編輯器（如 VS Code、記事本），並將檔案儲存為 index.html，雙擊即可在瀏覽器中直接執行：

(可下載檔案 😍)


```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>幸運隨機大輪盤</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        body {
            background-color: #121212;
            color: #e0e0e0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 15px;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 25px;
            width: 100%;
            max-width: 360px; /* 限制小工具的最大寬度 */
            margin: 0 auto;
        }

        /* 輪盤外框縮小 */
        .wheel-container {
            position: relative;
            width: 300px;
            height: 300px;
        }

        /* 頂部正中央指針 */
        .pointer {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-top: 24px solid #ff4757;
            z-index: 10;
            filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.5));
        }

        /* 輪盤 Canvas */
        canvas {
            border-radius: 50%;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 0 8px #2f3542;
            display: block;
            transform: rotate(0deg);
            transition: transform 4s cubic-bezier(0.1, 0.8, 0.1, 1);
        }

        /* 控制面板結構緊湊化 */
        .control-panel {
            background: #1e1e1e;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            width: 100%;
            border: 1px solid #2f3542;
        }

        .input-group {
            margin-bottom: 12px;
        }

        label {
            display: block;
            font-size: 13px;
            margin-bottom: 6px;
            color: #a4b0be;
        }

        textarea {
            width: 100%;
            height: 90px;
            background: #2f3542;
            border: 1px solid #57606f;
            border-radius: 6px;
            color: #ffffff;
            padding: 8px;
            font-size: 13px;
            resize: none;
            outline: none;
            transition: border-color 0.3s;
        }

        textarea:focus {
            border-color: #1e90ff;
        }

        button {
            width: 100%;
            padding: 10px;
            background: #1e90ff;
            border: none;
            border-radius: 6px;
            color: white;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s, transform 0.1s;
            margin-bottom: 5px;
        }

        button:hover {
            background: #3742fa;
        }

        button:active {
            transform: scale(0.98);
        }

        button:disabled {
            background: #57606f;
            cursor: not-allowed;
        }

        .result-display {
            margin-top: 10px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            min-height: 24px;
            color: #2ed573;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="wheel-container">
            <div class="pointer"></div>
            <canvas id="wheelCanvas" width="300" height="300"></canvas>
        </div>

        <div class="control-panel">
            <div class="input-group">
                <label for="itemsInput">輸入選項（每行一個）：</label>
                <textarea id="itemsInput">大乾麵
滷肉飯
麥當勞
健康沙拉
牛肉麵
壽司便當</textarea>
            </div>
            <button id="spinBtn">開始抽籤！</button>
            <div class="result-display" id="resultBox"></div>
        </div>
    </div>

    <script>
        const canvas = document.getElementById('wheelCanvas');
        const ctx = canvas.getContext('2d');
        const itemsInput = document.getElementById('itemsInput');
        const spinBtn = document.getElementById('spinBtn');
        const resultBox = document.getElementById('resultBox');

        let items = [];
        const colors = [
            '#ff4757', '#2ed573', '#1e90ff', '#ffa502', 
            '#9b59b6', '#34495e', '#16a085', '#d35400'
        ];

        let currentRotation = 0;
        let isSpinning = false;

        function drawWheel() {
            items = itemsInput.value.split('\n').map(item => item.trim()).filter(item => item !== '');
            
            const numSegments = items.length;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = centerX - 8;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (numSegments === 0) {
                ctx.fillStyle = '#57606f';
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.fill();
                return;
            }

            const segmentAngle = (2 * Math.PI) / numSegments;

            for (let i = 0; i < numSegments; i++) {
                const startAngle = i * segmentAngle;
                const endAngle = startAngle + segmentAngle;

                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.fillStyle = colors[i % colors.length];
                ctx.fill();
                ctx.stroke();
                ctx.strokeStyle = '#1e1e1e';
                ctx.lineWidth = 2;

                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(startAngle + segmentAngle / 2);
                ctx.textAlign = 'right';
                ctx.fillStyle = '#ffffff';
                // 微調字體大小適應 300px 畫布
                ctx.font = 'bold 14px sans-serif';
                
                let text = items[i];
                if (text.length > 6) text = text.substring(0, 5) + '...';
                
                ctx.fillText(text, radius - 15, 4);
                ctx.restore();
            }

            ctx.beginPath();
            ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.stroke();
        }

        function spin() {
            if (isSpinning || items.length === 0) return;

            isSpinning = true;
            spinBtn.disabled = true;
            resultBox.innerText = '轉動中...';

            const numSegments = items.length;
            const segmentAngle = 360 / numSegments;
            
            const randomDegrees = Math.floor(Math.random() * 360);
            const totalSpin = 360 * Math.floor(Math.random() * 5 + 5) + randomDegrees;
            
            currentRotation += totalSpin;
            canvas.style.transform = `rotate(${currentRotation}deg)`;

            setTimeout(() => {
                isSpinning = false;
                spinBtn.disabled = false;

                const actualDegrees = currentRotation % 360;
                let pointerAngle = (270 - actualDegrees) % 360;
                if (pointerAngle < 0) pointerAngle += 360;

                const selectedIndex = Math.floor(pointerAngle / segmentAngle);
                resultBox.innerText = `🎉 恭喜抽中：${items[selectedIndex]}`;
            }, 4000); 
        }

        itemsInput.addEventListener('input', drawWheel);
        spinBtn.addEventListener('click', spin);
        drawWheel();
    </script>
</body>
</html>
```

### 💡 專案亮點與特色：

1. **即時同步（Dynamic UI）**：在右側的輸入框內隨意新增、刪除或修改選項，左側的輪盤會在零延遲的情況下自動重新計算角度、分配顏色與重繪文字。
2. **完美物理動畫（Smooth Physics）**：捨棄了生硬的 JavaScript 計時器旋轉，改用 CSS `cubic-bezier` 進行轉動，完美模擬了真實世界中輪盤「**啟動快、結尾緩慢停下**」的視覺慣性。
3. **精準絕對定位（Precise Calculation）**：指針固定在輪盤正上方，演算法會根據最終轉動的弧度，精確計算出停在指針下的選項，絕對不畫大餅、不失準。
4. **精美深色模式（Modern Dark Theme）**：採用現代網頁最受歡迎的極簡深色系（Dark Mode），搭配低飽和度但高對比的色彩，即便是夜間使用也不傷眼。

<a href="/blog/ai-code-0618#back" className="custom-btn" target="">點我回到最上面</a>