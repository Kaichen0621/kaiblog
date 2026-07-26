// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KAI BLOG',
  favicon: 'img/favicon_io/favicon.ico',
  url: 'https://kaiblog.is-a.dev',
  baseUrl: '/',
  organizationName: 'kai980621',
  projectName: 'kaiblog',
  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-7916V6HGTV',
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          onInlineTags: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
      },
    ],

    // --- Microsoft Clarity、Favicon 與 Google 網站名稱優化 ---
    () => ({
      name: 'custom-metadata',
      injectHtmlTags() {
        return {
          headTags: [
            // 1. Microsoft Clarity 數據統計
            {
              tagName: 'script',
              innerHTML: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "vbv2g82ods");
              `,
            },
            // 2. 修正 Google 搜尋顯示 subdomain 的問題（加上結構化資料告訴 Google 網站名稱）
            {
              tagName: 'script',
              attributes: { type: 'application/ld+json' },
              innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "KAI BLOG",
                "url": "https://kaiblog.is-a.dev"
              }),
            },
            // 3. 完整對應 Favicon 尺寸（修正失真與死圖問題）
            {
              tagName: 'link',
              attributes: {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/img/favicon_io/apple-touch-icon.png',
              },
            },
            {
              tagName: 'link',
              attributes: {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/img/favicon_io/favicon-32x32.png',
              },
            },
            {
              tagName: 'link',
              attributes: {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/img/favicon_io/favicon-16x16.png',
              },
            },
            {
              tagName: 'link',
              attributes: {
                rel: 'manifest',
                href: '/img/favicon_io/site.webmanifest',
              },
            },
          ],
        };
      },
    }),
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurusd.png',
      colorMode: { respectPrefersColorScheme: false },

      navbar: {
        // 這是導覽列的文字
        title: 'KAI BLOG',
        logo: {
          alt: 'Logo',
          // 導覽列的 Logo 改用 512x512 圖檔，確保高解析度螢幕下清晰不模糊
          src: 'img/favicon_io/android-chrome-512x512.png'
        },
        items: [
          { to: '/blog', label: '📝 最新', position: 'left' },
          { to: '/blog/archive', label: '🗄️ 列表', position: 'left' },
          { to: '/random', label: '🎲 隨機', position: 'left' },
          { to: '/docs', label: '📚 筆記', position: 'left' },
          { to: '/videos', label: '🎬 影音 (Beta)', position: 'left' },
          //{ to: '/mayday-sim', label: '🎫 搶票練習', position: 'left' },
          { to: '/app', label: '📱 應用程式', position: 'left' },
          { to: '/email', label: '📩 聯絡我', position: 'left' },
          { to: '/about', label: '👤 關於', position: 'left' },
          { to: '/search', label: '🔍 全站搜尋', position: 'right' },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: '快速導覽',
            items: [
              { label: '最新', to: '/blog' },
              { label: '筆記', to: '/docs' },
              { label: '列表', to: '/blog/archive' },
              { label: '隨機', to: '/random' },
            ],
          },
          {
            title: '個人資訊',
            items: [
              { label: '關於我', to: '/about' },
              { label: '聯絡我', to: '/email' },
              // { label: '愛用', to: '/use' },
              { label: 'APP', to: '/app' },
              { label: '更新紀錄', to: '/docs/update' },
            ],
          },
          {
            title: '社群媒體',
            items: [
              { label: 'YouTube (KAI STUDIO)', href: 'https://youtube.com/@kaistudio-621' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} KAI BLOG`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },

      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
    }),
};

export default config;