import NavBar from '@/components/NavBar';
import UrlShortener from '@/components/UrlShortener';

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#070011' }}
    >
      <div
        className="orb animate-glow-pulse"
        style={{
          width: '700px',
          height: '700px',
          top: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(255,31,113,0.18) 0%, rgba(180,0,80,0.06) 50%, transparent 70%)',
        }}
      />
      <div
        className="orb animate-float"
        style={{
          width: '350px',
          height: '350px',
          top: '30%',
          left: '-100px',
          background:
            'radial-gradient(circle, rgba(255,111,168,0.14) 0%, transparent 70%)',
          animationDelay: '1s',
        }}
      />
      <div
        className="orb animate-float-slow"
        style={{
          width: '280px',
          height: '280px',
          top: '20%',
          right: '-60px',
          background:
            'radial-gradient(circle, rgba(255,31,113,0.12) 0%, transparent 70%)',
          animationDelay: '3s',
        }}
      />
      <div
        className="orb animate-float"
        style={{
          width: '400px',
          height: '400px',
          bottom: '-100px',
          left: '30%',
          background:
            'radial-gradient(circle, rgba(150,0,70,0.1) 0%, transparent 70%)',
          animationDelay: '2s',
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10">
        <NavBar />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 pt-12 pb-6 md:pt-20 md:pb-10">
        <div
          className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full animate-fade-in"
          style={{
            background: 'rgba(255,31,113,0.08)',
            border: '1px solid rgba(255,31,113,0.2)',
            animationDelay: '0.1s',
            animationFillMode: 'both',
            opacity: 0,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-neon-pink"
            style={{ boxShadow: '0 0 6px #ff1f71' }}
          />
          <span
            className="text-xs text-soft-pink/70 font-medium tracking-wider"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Free · Instant · No signup
          </span>
        </div>

        <h1
          className="shimmer-text text-center font-extrabold leading-none mb-5"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2.75rem, 8vw, 5.5rem)',
            letterSpacing: '-0.03em',
            animationDelay: '0.2s',
          }}
        >
          Shorten.
          <br />
          Share. Shine.
        </h1>

        <p
          className="text-center text-soft-pink/40 max-w-sm leading-relaxed mb-12 animate-fade-in"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            fontWeight: 400,
            animationDelay: '0.35s',
            animationFillMode: 'both',
            opacity: 0,
          }}
        >
          Paste a long URL and get a clean, shareable short link in seconds.
          Track clicks, add custom slugs.
        </p>

        <div
          className="w-full animate-fade-in"
          style={{
            animationDelay: '0.5s',
            animationFillMode: 'both',
            opacity: 0,
          }}
        >
          <UrlShortener />
        </div>
      </div>

      <footer className="relative z-10 mt-auto py-8 text-center">
        <p
          className="text-xs text-soft-pink/20"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Made with <span className="text-neon-pink/50">♥</span> by ZOUI Link · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
