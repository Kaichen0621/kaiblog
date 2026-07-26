import React, { useEffect, useState, useRef } from 'react';

export default function CustomPlayer({ videoId }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const progressBarRef = useRef(null);
  const timerRef = useRef(null);

  const formatTime = (sec) => {
    if (isNaN(sec) || sec < 0) return '00:00';
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    const handleFS = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFS);
    return () => document.removeEventListener('fullscreenchange', handleFS);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !videoId) return;

    const createPlayer = () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player(`edclub-yt-${videoId}`, {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          controls: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          showinfo: 0,
          fs: 0,
          autoplay: 1,
        },
        events: {
          onReady: (e) => setDuration(formatTime(e.target.getDuration())),
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              startTracker();
            } else {
              setIsPlaying(false);
              stopTracker();
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }

    return () => stopTracker();
  }, [videoId]);

  const startTracker = () => {
    stopTracker();
    timerRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const curr = playerRef.current.getCurrentTime();
        const total = playerRef.current.getDuration();
        setCurrentTime(formatTime(curr));
        if (total > 0 && progressBarRef.current) {
          progressBarRef.current.style.width = `${(curr / total) * 100}%`;
        }
      }
    }, 250);
  };

  const stopTracker = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const handleSeek = (e) => {
    if (!playerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const total = playerRef.current.getDuration();
    playerRef.current.seekTo(total * percent, true);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleVolume = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (playerRef.current) {
      playerRef.current.setVolume(val);
      if (val === 0) setIsMuted(true);
      else if (isMuted) setIsMuted(false);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    document.fullscreenElement ? document.exitFullscreen() : containerRef.current.requestFullscreen();
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        position: 'relative',
        background: '#000',
        borderRadius: isFullscreen ? '0' : '12px',
        overflow: 'hidden',
        boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
      }}
    >
      {/* 強制壓制 YouTube API 注入的預設寬高 */}
      <style>{`
        .edclub-frame-wrapper iframe,
        .edclub-frame-wrapper div {
          width: 100% !important;
          height: 100% !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
        }
      `}</style>

      {/* 滿版 16:9 畫面 */}
      <div
        className="edclub-frame-wrapper"
        style={{
          width: '100%',
          position: 'relative',
          paddingTop: '56.25%',
          background: '#000',
        }}
      >
        <div id={`edclub-yt-${videoId}`} />
        <div
          onClick={togglePlay}
          style={{ position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 2 }}
        />
      </div>

      {/* EdClub 極簡滿寬控制列 */}
      <div
        style={{
          width: '100%',
          height: '48px',
          background: '#2b2c30',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '16px',
          color: '#e2e8f0',
          userSelect: 'none',
          boxSizing: 'border-box',
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '0 4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={toggleMute}
            style={{
              background: 'none',
              border: 'none',
              color: '#a0aec0',
              fontSize: '14px',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {isMuted || volume === 0 ? '🔇' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
            style={{ width: '65px', accentColor: '#cbd5e1', cursor: 'pointer' }}
          />
        </div>

        <div
          onClick={handleSeek}
          style={{
            flex: 1,
            height: '4px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              width: '0%',
              height: '100%',
              background: '#38bdf8',
              borderRadius: '2px',
            }}
          />
        </div>

        <span style={{ fontSize: '0.82rem', color: '#cbd5e1', fontFamily: 'monospace' }}>
          {currentTime} / {duration}
        </span>

        <button
          onClick={toggleFullscreen}
          style={{
            background: 'none',
            border: 'none',
            color: '#a0aec0',
            fontSize: '14px',
            cursor: 'pointer',
            padding: '0 4px',
          }}
        >
          ⛶
        </button>
      </div>
    </div>
  );
}