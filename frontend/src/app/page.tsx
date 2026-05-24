import NavBar from '@/components/NavBar';
import UrlShortener from '@/components/UrlShortener';

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#070011' }}
    >
      {/* Background orbs */}
      <div
        className="orb animate-glow-pulse"
        style={{
          width: '800px',
          height: '800px',
          top: '-250px',
          left: '50%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(255,31,113,0.15) 0%, rgba(180,0,80,0.05) 45%, transparent 70%)',
        }}
      />
      <div
        className="orb animate-float"
        style={{
          width: '350px',
          height: '350px',
          top: '35%',
          left: '-120px',
          background:
            'radial-gradient(circle, rgba(255,111,168,0.1) 0%, transparent 70%)',
          animationDelay: '1s',
        }}
      />
      <div
        className="orb animate-float-slow"
        style={{
          width: '280px',
          height: '280px',
          top: '18%',
          right: '-80px',
          background:
            'radial-gradient(circle, rgba(255,31,113,0.08) 0%, transparent 70%)',
          animationDelay: '3s',
        }}
      />
      <div
        className="orb animate-float"
        style={{
          width: '450px',
          height: '450px',
          bottom: '-150px',
          left: '25%',
          background:
            'radial-gradient(circle, rgba(150,0,70,0.08) 0%, transparent 70%)',
          animationDelay: '2s',
        }}
      />

      {/* Noise overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10">
        <NavBar />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center px-4 pt-10 pb-6 md:pt-20 md:pb-10">
        {/* Badge */}
        <div
          className="mb-8 flex items-center gap-2.5 px-5 py-2 rounded-full animate-fade-in"
          style={{
            background: 'rgba(255,31,113,0.06)',
            border: '1px solid rgba(255,31,113,0.15)',
            animationDelay: '0.1s',
            animationFillMode: 'both',
            opacity: 0,
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-neon-pink animate-pulse-dot" style={{ boxShadow: '0 0 8px #ff1f71' }} />
          <span className="font-dm text-xs text-soft-pink/60 font-medium tracking-wider">
            Free &middot; Instant &middot; No signup
          </span>
        </div>

        {/* Heading */}
        <h1
          className="shimmer-text text-center font-syne font-extrabold leading-[0.95] mb-5"
          style={{
            fontSize: 'clamp(2.75rem, 8vw, 5.5rem)',
            letterSpacing: '-0.03em',
          }}
        >
          Shorten.
          <br />
          Share. Shine.
        </h1>

        {/* Subtitle */}
        <p
          className="text-center font-dm text-soft-pink/35 max-w-md leading-relaxed mb-12 animate-fade-in"
          style={{
            fontSize: '1.05rem',
            fontWeight: 400,
            animationDelay: '0.35s',
            animationFillMode: 'both',
            opacity: 0,
          }}
        >
          Paste a long URL and get a clean, shareable short link in seconds.
          Track clicks, add custom slugs.
        </p>

        {/* URL Shortener */}
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
        <p className="font-dm text-xs text-soft-pink/20">
          Made with <span className="text-neon-pink/40">&#9829;</span> by ZOUI Link &middot; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
