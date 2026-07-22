import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function UtterancesComments() {
  const containerRef = useRef(null);
  const { colorMode } = useColorMode();
  const utterancesTheme = colorMode === 'dark' ? 'github-dark' : 'github-light';

  useEffect(() => {
    console.log("=== Utterances 組件已成功觸發 useEffect ===");
    console.log("當前設定的 Repo:", 'Kaichen0621/kaiblogcommentsystem');

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'Kaichen0621/kaiblogcommentsystem');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', utterancesTheme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    if (containerRef.current) {
      containerRef.current.innerHTML = ''; 
      containerRef.current.appendChild(script);
      console.log("Script 標籤已成功插入 DOM");
    }
  }, [utterancesTheme]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        marginTop: '3rem', 
        paddingTop: '2rem', 
        borderTop: '2px solid red', /* 👈 變成明顯的紅線 */
        minHeight: '100px'
      }} 
    >
      {/* 👈 加上測試文字 */}
      <p style={{ color: 'red', textBreak: 'break-all' }}>⚠️ 這裡應該要顯示 Utterances 留言板（測試字串）</p>
    </div>
  );
}