import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './mayday-sim.module.css';

const SESSIONS = [
  { id: 1, date: '2026/07/03 (五) 19:30', name: 'MAYDAY #5525 [ 回到那一天 ] 25週年巡迴演唱會' },
  { id: 2, date: '2026/07/04 (六) 18:30', name: 'MAYDAY #5525 [ 回到那一天 ] 25週年巡迴演唱會' },
  { id: 3, date: '2026/07/05 (日) 18:30', name: 'MAYDAY #5525 [ 回到那一天 ] 25週年巡迴演唱會' },
  { id: 4, date: '2026/07/08 (三) 19:30', name: 'MAYDAY #5525 [ 回到那一天 ] 25週年巡迴演唱會' },
  { id: 5, date: '2026/07/10 (五) 19:30', name: 'MAYDAY #5525 [ 回到那一天 ] 25週年巡迴演唱會' },
  { id: 6, date: '2026/07/11 (六) 18:30', name: 'MAYDAY #5525 [ 回到那一天 ] 25週年巡迴演唱會' },
  { id: 7, date: '2026/07/12 (日) 18:30', name: 'MAYDAY #5525 [ 回到那一天 ] 25週年巡迴演唱會' },
];

const AREAS = [
  {
    group: '搖滾站區', list: [
      { name: '瘋狂世界搖滾 A 區', price: 5525 }, { name: '瘋狂世界搖滾 B 區', price: 4525 },
      { name: '搖滾 C 區', price: 4225 }, { name: '搖滾 D 區', price: 3225 }
    ]
  },
  {
    group: '看台座位區', list: [
      { name: '東下 K 區', price: 2225 }, { name: '西下 J 區', price: 2225 },
      { name: '南下 G 區', price: 2225 }, { name: '東上 E 區', price: 2225 },
      { name: '西上 F 區', price: 2225 }, { name: '頂層 H 區', price: 1525 }
    ]
  },
  {
    group: '親子套票專區', list: [
      { name: 'B4 區', price: 4225 }, { name: '206 區', price: 3225 },
      { name: '105 區', price: 2225 }
    ]
  }
];

const MaydaySim = () => {
  // Phase: 0(倒數頁), 1(場次列表), 2(區域圖), 3(張數驗證), 4(結果)
  const [phase, setPhase] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isCounting, setIsCounting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [ticketQty, setTicketQty] = useState(0);
  const [captcha, setCaptcha] = useState('');
  const [captchaChars, setCaptchaChars] = useState([]);
  const [captchaInput, setCaptchaInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  // 驗證碼邏輯
  const generateCaptcha = () => {
    const chars = "abcdefhjkmnpqrstuvwxyz";
    let str = "";
    const charArr = [];
    for (let i = 0; i < 4; i++) {
      const char = chars.charAt(Math.floor(Math.random() * chars.length));
      str += char;
      charArr.push({
        char,
        rotate: Math.floor(Math.random() * 20) - 10,
        skew: Math.floor(Math.random() * 10) - 5
      });
    }
    setCaptcha(str);
    setCaptchaChars(charArr);
    setCaptchaInput('');
  };

  // 初始倒數
  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
    }
    return () => clearInterval(timer);
  }, [isCounting, countdown]);

  // 按下「立即購票」才開始正式計時 (搶票行為開始)
  const startBuying = () => {
    setStartTime(performance.now());
    setPhase(1);
    window.scrollTo(0, 0);
  };

  const handleSelectArea = (area) => {
    setSelectedArea(area);
    generateCaptcha();
    setPhase(3);
    window.scrollTo(0, 0);
  };

  const submitOrder = () => {
    if (ticketQty === 0) { alert("請選擇張數"); return; }
    if (captchaInput.toLowerCase().trim() !== captcha) {
      alert("驗證碼錯誤");
      generateCaptcha();
      return;
    }
    setIsLoading(true);
    const endTime = performance.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

    // 模擬伺服器負載，增加至 5 秒
    setTimeout(() => {
      setIsLoading(false);
      setResult({
        time: timeTaken,
        session: selectedSession.date,
        area: selectedArea.name,
        qty: ticketQty
      });
      setPhase(4);
    }, 5000);
  };

  const steps = [
    { name: '區域', completed: phase > 2, active: phase === 2 },
    { name: '張數', completed: phase > 3, active: phase === 3 },
    { name: '確認', completed: phase > 4, active: false },
    { name: '付款', completed: false, active: false },
    { name: '完成', completed: phase === 4, active: phase === 4 },
  ];

  return (
    <Layout title="拓元搶票練習">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <div className={styles.wrapper}>
        {phase > 0 && phase < 4 && (
          <div className={styles.progressBar}>
            <div className={styles.steps}>
              {steps.map((s, i) => (
                <div key={i} className={`${styles.step} ${s.active ? styles.active : ''} ${s.completed ? styles.completed : ''}`}>
                  <div className={styles.stepCircle}>{s.completed ? '✓' : i + 1}</div>
                  <div className={styles.stepText}>{s.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.appContainer}>

          {/* Phase 0: 倒數與啟動頁 */}
          {phase === 0 && (
            <div className={styles.landing}>
              <div className={styles.introContent}>
                <h1>MAYDAY #5525+2 [ 回到那一天 ]</h1>
                <p>地點：臺北大巨蛋 | 演出日期：2026/07/03 ~ 2026/07/12</p>

                <div className={styles.startZone}>
                  {!isCounting && countdown > 0 && !hasStarted && (
                    <button className={styles.btnStartCountdown} onClick={() => { setIsCounting(true); setHasStarted(true); }}>
                      開始練習 (點我開始倒數)
                    </button>
                  )}

                  {isCounting && countdown > 0 && (
                    <div className={styles.countdownDisplay}>{countdown}</div>
                  )}

                  {countdown === 0 && (
                    <button className={styles.btnBuyNow} onClick={startBuying}>立即購票</button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Phase 1: 場次選擇 */}
          {phase === 1 && (
            <div className={styles.sessionList}>
              <div className={styles.sectionTitle}>請選擇場次</div>
              <table className={styles.tixTable}>
                <thead>
                  <tr>
                    <th>演出日期</th>
                    <th className={styles.mobileHide}>演出名稱</th>
                    <th>狀態</th>
                  </tr>
                </thead>
                <tbody>
                  {SESSIONS.map(s => (
                    <tr key={s.id}>
                      <td className={styles.sessionDate}>{s.date}</td>
                      <td className={styles.mobileHide}>{s.name}</td>
                      <td>
                        <button className={styles.btnSelect} onClick={() => { setSelectedSession(s); setPhase(2); }}>立即訂購</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Phase 2: 區域選擇 */}
          {phase === 2 && (
            <div className={styles.areaSelection}>
              <div className={styles.areaHeader}>
                <strong>{selectedSession.name}</strong> | <span>{selectedSession.date}</span>
                <button className={styles.btnBack} style={{ float: 'right', padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => setPhase(1)}>返回場次</button>
              </div>
              <div className={styles.areaContent}>
                <div className={styles.mapBox}>
                  <img src="/img/mayday/mayday_map.png" alt="Map" />
                </div>
                <div className={styles.areaList}>
                  <div className={styles.areaListHeader}>請選擇區域</div>
                  <div className={styles.areaListScroll}>
                    {AREAS.map(group => (
                      <div key={group.group} className={styles.areaGroup}>
                        <div className={styles.groupLabel}>{group.group}</div>
                        {group.list.map(a => (
                          <div key={a.name} className={styles.areaItem} onClick={() => handleSelectArea(a)}>
                            <span className={styles.areaName}>{a.name}</span>
                            <span className={styles.areaPrice}>
                              <strong>${a.price}</strong>
                              <small className={styles.statusHot}>熱賣中</small>
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phase 3: 表單驗證 */}
          {phase === 3 && (
            <div className={styles.formPage}>
              <div className={styles.sectionTitle}>選擇張數</div>

              <div className={styles.summaryCard}>
                <strong>{selectedSession.date}</strong><br />
                <span>區域：{selectedArea.name} | 票價：${selectedArea.price}</span>
              </div>

              <div className={styles.qtyRow}>
                <label>全票 ${selectedArea.price}</label>
                <select value={ticketQty} onChange={(e) => setTicketQty(parseInt(e.target.value))}>
                  {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div className={styles.captchaContainer}>
                <div className={styles.captchaDisplay} onClick={generateCaptcha}>
                  {captchaChars.map((c, i) => (
                    <span key={i} style={{ transform: `rotate(${c.rotate}deg) skew(${c.skew}deg)` }}>
                      {c.char}
                    </span>
                  ))}
                </div>
                <input
                  className={styles.captchaInput}
                  type="text"
                  placeholder="輸入驗證碼"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitOrder()}
                />
                <p className={styles.hint}>※ 驗證碼請輸入英文，不分大小寫</p>
              </div>

              <div className={styles.agreement}>
                <input type="checkbox" id="ag" />
                <label htmlFor="ag">我已詳細閱讀並同意服務條款及節目資訊公告</label>
              </div>

              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button className={styles.btnBack} onClick={() => setPhase(2)}>返回選區</button>
                <button className={styles.btnConfirm} onClick={submitOrder}>確認張數</button>
              </div>
            </div>
          )}

          {/* Phase 4: 結果 */}
          {phase === 4 && result && (
            <div className={styles.resultPage}>
              <div className={styles.resultCard}>
                <div className={styles.successIcon}>✓</div>
                <h2>搶票練習完成！</h2>

                <div className={styles.resultDetails}>
                  <div className={styles.resRow}>
                    <span>花費時間</span>
                    <strong>{result.time} 秒</strong>
                  </div>
                  <div className={styles.resRow}>
                    <span>選擇場次</span>
                    <span>{result.session}</span>
                  </div>
                  <div className={styles.resRow}>
                    <span>選擇區域</span>
                    <span>{result.area}</span>
                  </div>
                  <div className={styles.resRow}>
                    <span>訂購張數</span>
                    <span>{result.qty} 張</span>
                  </div>
                </div>

                <button
                  className={styles.btnRestart}
                  onClick={() => window.location.reload()}
                >
                  再試一次
                </button>
              </div>
            </div>
          )}

        </div>

        {isLoading && (
          <div className={styles.overlay}>
            <div className={styles.loader}></div>
            <h2 style={{ fontSize: '1.1rem' }}>正在為您尋找座位...</h2>
            <p style={{ fontSize: '0.8rem' }}>請勿關閉或重新整理視窗</p>
          </div>
        )}
      </div>
    </Layout >

  );
};

export default MaydaySim;
