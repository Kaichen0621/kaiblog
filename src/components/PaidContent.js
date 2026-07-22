import React, { useState, useEffect, useRef } from 'react';

export default function PaidContent({ children, id = 'default' }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const contentRef = useRef(null);
  const localStorageKey = `kai_blog_unlocked_${id}`;
  const CORRECT_PASSCODE = '0621';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(localStorageKey);
      if (savedState === 'true') {
        setIsUnlocked(true);
      }
    }
  }, [localStorageKey]);

  // Handle TOC visibility via CSS class on html element
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (!isUnlocked) {
      document.documentElement.classList.add('lock-paid-content');
    } else {
      document.documentElement.classList.remove('lock-paid-content');
    }

    return () => {
      document.documentElement.classList.remove('lock-paid-content');
    };
  }, [isUnlocked]);

  const handleUnlock = () => {
    if (passcode === CORRECT_PASSCODE) {
      setIsUnlocked(true);
      localStorage.setItem(localStorageKey, 'true');
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  return (
    <div style={{
      position: 'relative',
      margin: '2rem 0',
      borderRadius: '12px',
      overflow: isUnlocked ? 'visible' : 'hidden',
      minHeight: isUnlocked ? '0' : '450px',
      display: 'flex',
      flexDirection: 'column',
      border: isUnlocked ? 'none' : '1px solid var(--glass-border)',
      background: isUnlocked ? 'transparent' : 'var(--glass-bg)'
    }}>
      {!isUnlocked && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'var(--glass-bg)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            maxWidth: '400px',
            width: '100%',
            transition: 'all 0.3s ease',
            borderColor: error ? '#ff4d4f' : isInputFocused ? 'var(--ifm-color-primary)' : 'var(--glass-border)'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              🔏
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              marginBottom: '0.8rem',
              color: 'var(--ifm-color-primary)'
            }}>
              付費內容已鎖定
            </h3>
            <p style={{
              fontSize: '0.95rem',
              opacity: 0.8,
              marginBottom: '1.5rem',
              fontWeight: '500',
              lineHeight: '1.5'
            }}>
              輸入專屬解鎖碼以閱覽完整內容<br />
              <span style={{ fontSize: '0.85rem', color: 'var(--ifm-color-primary)', fontWeight: 'bold' }}>
                💡 提示：我的生日
              </span>
            </p>

            <div style={{ marginBottom: '1rem', position: 'relative' }}>
              <input
                type="password"
                placeholder="4 位數字密碼"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(0,0,0,0.05)',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'all 0.2s',
                  color: 'inherit'
                }}
              />
              {error && (
                <p style={{
                  color: '#ff4d4f',
                  fontSize: '0.85rem',
                  marginTop: '8px',
                  fontWeight: '700'
                }}>
                  ❌ 密碼錯誤
                </p>
              )}
            </div>

            <button
              onClick={handleUnlock}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                fontWeight: '700',
                color: 'white',
                background: error ? '#ff4d4f' : 'var(--ifm-color-primary)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              立即解鎖
            </button>
          </div>
        </div>
      )}

      <div
        ref={contentRef}
        style={{
          opacity: isUnlocked ? 1 : 0.1,
          maxHeight: isUnlocked ? 'none' : '350px',
          transition: 'opacity 0.5s ease',
          pointerEvents: isUnlocked ? 'auto' : 'none',
          userSelect: isUnlocked ? 'auto' : 'none',
          overflow: 'hidden',
          flex: 1
        }}
      >
        {children}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
