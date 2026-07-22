import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// 導入 Docusaurus 自動生成的路由配置
import generatedRoutes from '@generated/routes';

// 修正關鍵：新增一個遞迴函式，把嵌套的 Docs 子路由全部打平攤開
const flattenRoutes = (routes) => {
  let flat = [];
  routes.forEach(route => {
    if (route.path) {
      flat.push(route.path);
    }
    if (route.subroutes) {
      flat = flat.concat(flattenRoutes(route.subroutes));
    }
  });
  return flat;
};

export default function RandomPage() {
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 1. 攤平所有路由，確保挖出 /docs/xxx 的子網址
    const allFlattenedPaths = flattenRoutes(generatedRoutes);

    // 2. 提取並過濾路徑
    const allPaths = allFlattenedPaths.filter(path => {
        // 判定是否為內容頁（部落格或筆記）
        const isBlog = path.startsWith('/blog/');
        const isDoc = path.startsWith('/docs/');

        if (!isBlog && !isDoc) return false;

        // 排除非文章頁面（如分頁、標籤、存檔、側邊欄分類頁等）
        const isExcluded =
          path.includes('/tags') ||
          path.includes('/archive') ||
          path.includes('/page/') ||
          path.includes('/author') || 
          path.includes('/category/') || 
          path === '/blog' || path === '/blog/' ||
          path === '/docs' || path === '/docs/' ||
          path === '/' ||
          path === '/404.html' ||
          path.includes('search') ||
          path.includes('*') ||
          path.includes('/__docusaurus/');

        return !isExcluded;
      });

    // 3. 隨機選取邏輯
    if (allPaths.length > 0) {
      const randomPath = allPaths[Math.floor(Math.random() * allPaths.length)];

      // 設定 1 秒延遲，增加儀式感並確保路由已就緒
      const timer = setTimeout(() => {
        history.replace(randomPath);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // 如果過濾後沒有任何路徑，停止跳轉並顯示錯誤
      setIsRedirecting(false);
      setError(true);
    }
  }, [history]);

  return (
    <Layout title="隨機推薦文章">
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
        {!error ? (
          <>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              🎲 正在為您挑選精選內容...
            </h1>
            <p style={{ color: 'var(--ifm-color-emphasis-600)', fontSize: '1.2rem' }}>
              請稍候，正在從部落格與筆記中隨機挑選。
            </p>

            {/* 加載動畫 */}
            <div className="loading-container">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          </>
        ) : (
          <div>
            <h1 style={{ color: '#ff4d4f' }}>抱歉，找不到任何內容</h1>
            <p>請確認您的 blog 或 docs 資料夾下是否有文章，或路徑設定是否正確。</p>
            <button
              onClick={() => history.push('/')}
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--ifm-color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              回首頁
            </button>
          </div>
        )}

        <p style={{ marginTop: '2rem', color: '#ff0000', fontSize: '0.9rem', opacity: 0.7 }}>
          提示：如果網頁沒有自動跳轉，請點擊重新整理。
        </p>
      </div>

      <style jsx>{`
        .loading-container {
          font-size: 4rem;
          color: var(--ifm-color-primary);
          height: 60px;
        }
        .dot {
          animation: blink 1.4s infinite both;
          margin: 0 1px;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes blink {
          0% { opacity: 0.2; transform: translateY(0); }
          20% { opacity: 1; transform: translateY(-10px); }
          100% { opacity: 0.2; transform: translateY(0); }
        }
      `}</style>
    </Layout>
  );
}