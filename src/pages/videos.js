import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import CustomPlayer from '@site/src/components/CustomPlayer';

const CHANNEL_ID = 'UCO46ZMleJZsNyZnpKYVYWLw';
const CACHE_KEY = 'kai_youtube_full_videos_cache_v12';

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);

  const applyFilterAndSort = (list, term, sort) => {
    let result = [...list];

    if (term.trim()) {
      const lower = term.toLowerCase();
      result = result.filter((v) => v.title.toLowerCase().includes(lower));
    }

    if (sort === 'latest') {
      result.sort((a, b) => b.publishedRaw - a.publishedRaw);
    } else if (sort === 'oldest') {
      result.sort((a, b) => a.publishedRaw - b.publishedRaw);
    }

    setFilteredVideos(result);
  };

  const fetchAllVideos = async () => {
    let hasData = false;

    // 1. 優先從本機快取渲染（達到線上秒開效果）
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setVideos(parsed);
            applyFilterAndSort(parsed, searchTerm, sortBy);
            setLoading(false);
            hasData = true;
          }
        }
      } catch (e) {}
    }

    if (!hasData) setLoading(true);

    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    
    // 調整代理順序，優先使用限制較少的代理伺服器
    const fetchEndpoints = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
      `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`,
    ];

    const fetchSingle = async (url) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 4000); // 4秒超時
      try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        if (!res.ok) throw new Error('Network response bad');
        const text = await res.text();
        if (!text.includes('<entry') && !text.includes('<feed')) throw new Error('Invalid feed content');
        return text;
      } catch (e) {
        clearTimeout(id);
        throw e;
      }
    };

    try {
      const xmlText = await Promise.any(fetchEndpoints.map(fetchSingle));
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, 'text/xml');
      const entries = Array.from(xml.querySelectorAll('entry'));

      const parsedList = entries
        .map((entry) => {
          const title = entry.querySelector('title')?.textContent || '';
          const link = entry.querySelector('link')?.getAttribute('href') || '';
          const videoId = entry.querySelector('videoId')?.textContent || (link.includes('v=') ? link.split('v=')[1] : '');
          const published = entry.querySelector('published')?.textContent || '';

          return {
            id: videoId,
            title,
            publishedRaw: published ? new Date(published).getTime() : 0,
            date: published ? new Date(published).toLocaleDateString() : '',
            thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          };
        })
        .filter((v) => v.id);

      if (parsedList.length > 0) {
        setVideos(parsedList);
        applyFilterAndSort(parsedList, searchTerm, sortBy);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(parsedList));
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Network fetch failed, using cached list if available.', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlVid = params.get('v');
      if (urlVid) {
        const found = videos.find((v) => v.id === urlVid);
        setActiveVideo(found || { id: urlVid, title: '' });
      } else {
        setActiveVideo(null);
      }
    }
  }, [videos]);

  const handleSelectVideo = (vid) => {
    setActiveVideo(vid);
    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.pathname}?v=${vid.id}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToGallery = () => {
    setActiveVideo(null);
    if (typeof window !== 'undefined') {
      window.history.pushState({ path: window.location.pathname }, '', window.location.pathname);
    }
  };

  return (
    <Layout title="影音專區" description="KAI BLOG 影音劇院">
      <style>{`
        .kai-grid-container {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 20px !important;
          width: 100% !important;
        }
        @media (max-width: 992px) {
          .kai-grid-container { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .kai-grid-container { grid-template-columns: 1fr !important; }
        }
        .kai-pill-btn {
          padding: 6px 16px;
          border-radius: 20px;
          border: 1px solid var(--ifm-color-emphasis-300, #cbd5e1);
          background: var(--ifm-color-emphasis-100, #f1f5f9);
          color: var(--ifm-font-color-base, #0f172a);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }
        .kai-pill-btn.active {
          background: var(--ifm-color-primary, #0284c7) !important;
          color: #ffffff !important;
          border-color: var(--ifm-color-primary, #0284c7) !important;
        }
      `}</style>

      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '24px 16px', minHeight: '85vh' }}>
        {activeVideo ? (
          <div style={{ maxWidth: '880px', width: '100%', margin: '0 auto' }}>
            <button
              onClick={handleBackToGallery}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ifm-font-color-base, #333)',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '14px',
                padding: 0,
              }}
            >
              ← 返回影片列表
            </button>

            <CustomPlayer videoId={activeVideo.id} />
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <h1 style={{ margin: 0, fontSize: '1.8rem' }}>🎬 影音專區</h1>
                <input
                  type="text"
                  placeholder="🔍 搜尋影片..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    applyFilterAndSort(videos, e.target.value, sortBy);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid var(--ifm-color-emphasis-300, #ccc)',
                    background: 'var(--ifm-background-surface-color, #fff)',
                    color: 'inherit',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id: 'latest', label: '最新' },
                  { id: 'oldest', label: '最早' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSortBy(tab.id);
                      applyFilterAndSort(videos, searchTerm, tab.id);
                    }}
                    className={`kai-pill-btn ${sortBy === tab.id ? 'active' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div style={{ padding: '80px 0', textAlign: 'center' }}>⚡ 正在載入影片...</div>
            ) : (
              <div className="kai-grid-container">
                {filteredVideos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => handleSelectVideo(vid)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: 'var(--ifm-card-background-color, #fff)',
                      border: '1px solid var(--ifm-color-emphasis-200, #eee)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <div style={{ width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
                      <img src={vid.thumbnail} alt={vid.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '12px' }}>
                      <h3 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', lineHeight: '1.4', height: '2.8em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {vid.title}
                      </h3>
                      <div style={{ fontSize: '0.78rem', opacity: 0.7 }}>
                        <span>📅 {vid.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}