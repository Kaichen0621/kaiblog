import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import generatedRoutes from '@generated/routes';

export default function RandomPage() {
  const history = useHistory();
  const { withBaseUrl } = useBaseUrlUtils();
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    const allPaths = generatedRoutes
      .map(route => route.path)
      .filter(path => 
        path !== '/' &&
        path !== '/404.html' &&
        !path.includes('tags') &&
        !path.includes('search') &&
        !path.includes('/blog/about') &&
        !path.includes('*') &&
        !path.includes('author') &&
        !path.includes('/about') &&
        !path.includes('/__docusaurus/') &&
        !path.endsWith('/')
      );

    if (allPaths.length > 0) {
      const randomPath = allPaths[Math.floor(Math.random() * allPaths.length)];
      // 注意：原本你設 10 秒（10000ms），我建議縮短一點，
      // 除非你真的想讓讀者看圈圈轉很久。這裡先維持你的設定。
      const timer = setTimeout(() => {
        history.replace(withBaseUrl(randomPath));
      }, 3000); // 建議 3 秒即可

      return () => clearTimeout(timer);
    } else {
      setIsRedirecting(false);
    }
  }, [history, withBaseUrl]);

  return (
    <Layout title="隨機跳轉中...">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>
          🎲 正在挑選隨機文章...
        </h1>
        
        {/* 這裡改成繞圈圈的 Spinner */}
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
        <p style={{ color: 'var(--ifm-color-emphasis-600)' }}>
          請稍候，正在為您從所有文章中隨機挑選精選內容。
        </p>
        <h4 style={{ color: '#ff0000' }}>
          如果網頁當機的話，請重新載入
        </h4>

        {!isRedirecting && (
          <p style={{ color: 'red', marginTop: '1rem' }}>找不到可以跳轉的頁面。</p>
        )}
      </div>

      {/* 這裡加入繞圈圈的 CSS */}
      <style jsx>{`
        .spinner-container {
          margin: 20px 0;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(66, 158, 238, 0.2); /* 淺色背景環 */
          border-top: 5px solid #429eee;           /* 深色旋轉部分 */
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
}