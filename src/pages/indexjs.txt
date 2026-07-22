import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


function HomepageHero() {
  return (
    <div className="homepage_hero">
      <h1>KAI BLOG</h1>
      <p>這裡是我發廢文的地方。這個網站分為以下幾個區域：</p>
    </div>
  );
}


function Feature({ icon, title, description, to }) {
  return (
    <Link to={to} className="feature_card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

function InfoSection() {
  return (
    <section className="info_section">
      <div className="info_grid">
        <div className="info_card">
          <h3>🛠️ 其他小技巧！</h3>
          <ul className="info_list">
            <li>
              <b>RSS 訂閱</b>：你可以用 RSS 追蹤我（<code>https://kaiblog.is-a.dev/blog/rss.xml</code>）
            </li>
            <li>
              <b>全站搜尋</b>：按下 <code>Ctrl + K</code> 即可搜尋關鍵字！
            </li>
            <li>
              <b>聯繫我</b>：有任何建議，歡迎寫信至 <code>kaigithub0621@gmail.com</code>
            </li>
          </ul>
        </div>
        <div className="info_card">
          <h3>🌐 其他資訊</h3>
          <ul className="info_list">
            <li>
              <Link to="/docs/resolve/resolvepackV4">🎬 達芬奇模板：ResolveV4Pack 重磅更新</Link>
            </li>
            <li>
              <Link to="https://blogblog.club/">📜 BlogBlog.Club：一起來寫部落格</Link>
            </li>
            <li>
              <Link to="/verify">🪩 Discord 社群驗證區</Link>
            </li>
            <li>
              <Link to="/docs/update">📜 網站更新紀錄</Link>
            </li>
            <li>
              <Link to="https://www.youtube.com/@kaistudio-621">📺 YouTube (KAI STUDIO)</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`首頁 | ${siteConfig.title}`}
      description="KAI BLOG - 分享貼文、筆記、應用程式與達芬奇模板">
      <main className="container">
        <HomepageHero />

        <div className="features_grid">
          <Feature
            icon="🌟"
            title="貼文"
            description="你可以把這裡想像成我的社群媒體頁面，從 2026 年起，主要會把一些文章發在這裡"
            to="/blog"
          />
          <Feature
            icon="📚"
            title="筆記"
            description="這裡會是記錄筆記的地方"
            to="/docs"
          />
          <Feature
            icon="📱"
            title="應用程式"
            description="這裡會顯示我在 Mac 上的軟體清單，看看有沒有你喜歡的"
            to="/app"
          />
          <Feature
            icon="🎲"
            title="隨機"
            description="按一下會有隨機貼文，看看運氣好不好有沒有機會抽到曾老師"
            to="/random"
          />
          <Feature
            icon="🖨️"
            title="所有貼文列表"
            description="這裡放了我所有寫過的 Blog"
            to="/blog/archive"
          />
          <Feature
            icon="🫂"
            title="關於"
            description="歡迎認識我！"
            to="/about"
          />
        </div>





        <section>
          <div className="section_title">
            <span>📺</span>
            <span>最新 Youtube 影片</span>
          </div>
          <div className="youtube-s">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/bD7kN9YuHj0?si=waWCmYFeOGNVCMSd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <p style={{ marginTop: '1.5rem', fontWeight: '800', fontSize: '1.2rem', textAlign: 'center', color: 'var(--ifm-color-primary)' }}>我把 MAYDAY 變成 鋼琴練習曲了？</p>
          </div>
        </section>

        <InfoSection />

        <div className="contact_section">
          <div className="contact_info">
            <h2>加入 KAI STUDIO</h2>
            <p>歡迎搶先加入 Discord 搶先體驗會員</p>
          </div>
          <Link className="contact_btn" to="https://discord.gg/ze9rM8pEPy">
            ⋈ 加入 Discord
          </Link>
        </div>
      </main>

    </Layout>
  );
}


