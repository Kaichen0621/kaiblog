import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

export default function VerifyButton() {
  const location = useLocation();
  const [isClaimed, setIsClaimed] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('kai_studio_verified') === 'true') {
      setIsClaimed(true);
    }

    const params = new URLSearchParams(location.search);
    if (params.get('status') === 'success') {
      setCanSubmit(true);
    }
  }, [location]);

  const handleVerify = () => {
    if (!canSubmit) return;
    setIsClaimed(true);
    localStorage.setItem('kai_studio_verified', 'true');
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <div style={{ margin: '2rem 0', textAlign: 'center' }}>
      {/* 1. 綠色 Tip 框：完全回歸 Docusaurus 預設樣式，移除圖示 */}
      {!isClaimed && !canSubmit && (
        <div 
          className="admonition admonition-tip alert alert--success" 
          style={{ 
            textAlign: 'left', 
            marginBottom: '1.5rem',
            borderLeftWidth: '6px'
          }}
        >
          <div className="admonition-heading">
            <h5 style={{ margin: 0 }}>填寫表單</h5>
          </div>
          <div className="admonition-content" style={{ marginTop: '0.5rem' }}>
            <p>
              請先前往 <a href="https://opnform.com/forms/kai-studio-discord-yiqsu6" target="_blank" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>OpnForm 表單</a> 完成填寫。提交後系統會自動將您導回此頁面解鎖按鈕。
            </p>
          </div>
        </div>
      )}

      {/* 2. 認證按鈕：深色模式優化配色 */}
      <button 
        onClick={handleVerify}
        disabled={isClaimed || !canSubmit}
        style={{
          padding: '12px 40px',
          fontSize: '1rem',
          fontWeight: '600',
          borderRadius: '8px',
          border: 'none',
          transition: 'all 0.3s ease',
          
          // 文字顏色：確保深色模式看得見
          color: isClaimed
            ? 'var(--ifm-color-emphasis-600)' 
            : !canSubmit
              ? '#ffffff' // 鎖定時用白色文字，對比度最高
              : '#ffffff',
              
          // 背景顏色：禁用時用明顯的深灰色，啟用時用主題色
          background: isClaimed 
            ? 'var(--ifm-color-emphasis-300)' 
            : !canSubmit 
              ? '#333333' // 禁用狀態：深灰色（在深色模式很明顯，白色模式也像按鈕）
              : 'var(--ifm-color-primary)', 
              
          cursor: (isClaimed || !canSubmit) ? 'not-allowed' : 'pointer',
          boxShadow: (!canSubmit && !isClaimed) ? 'none' : '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        {isClaimed 
          ? '✓ 認證申請已送出' 
          : canSubmit 
            ? '🚀 點擊完成最後認證' 
            : '🔒 需先完成表單提交'}
      </button>
      
      <p style={{ 
        fontSize: '0.85rem', 
        marginTop: '12px', 
        color: 'var(--ifm-color-emphasis-700)'
      }}>
        {isClaimed 
          ? '申請已送出，管理員將人工審核。' 
          : canSubmit 
            ? '偵測到提交紀錄！請點擊上方按鈕送出。' 
            : '提交表單前，此按鈕將保持鎖定狀態。'}
      </p>
    </div>
  );
}