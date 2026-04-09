import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CyberGuard Academy — обучение кибербезопасности';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(34, 211, 238, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(34, 211, 238, 0.1) 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        />

        {/* Logo/Icon */}
        <div
          style={{
            fontSize: 120,
            marginBottom: 40,
          }}
        >
          🛡️
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #22d3ee, #3b82f6)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          CyberGuard Academy
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 900,
            marginBottom: 40,
          }}
        >
          Обучение кибербезопасности для детей и родителей
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(34, 211, 238, 0.1)',
              padding: '20px 40px',
              borderRadius: 16,
              border: '2px solid rgba(34, 211, 238, 0.3)',
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#22d3ee' }}>
              12
            </div>
            <div style={{ fontSize: 20, color: '#94a3b8' }}>
              Модулей
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(34, 211, 238, 0.1)',
              padding: '20px 40px',
              borderRadius: 16,
              border: '2px solid rgba(34, 211, 238, 0.3)',
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#22d3ee' }}>
              120
            </div>
            <div style={{ fontSize: 20, color: '#94a3b8' }}>
              Вопросов
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(34, 211, 238, 0.1)',
              padding: '20px 40px',
              borderRadius: 16,
              border: '2px solid rgba(34, 211, 238, 0.3)',
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#22d3ee' }}>
              🎯
            </div>
            <div style={{ fontSize: 20, color: '#94a3b8' }}>
              Квизы
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
