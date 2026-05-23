import { fetchAllLinks, type LinkData } from '@/lib/api';
import NavBar from '@/components/NavBar';
import Link from 'next/link';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatRelative(dateStr: string | null) {
  if (!dateStr) return 'Never';
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(dateStr);
}

function truncate(str: string, max = 42) {
  return str.length > max ? str.slice(0, max) + '…' : str;
}

async function AnalyticsContent() {
  let links: LinkData[] = [];
  let error: string | null = null;

  try {
    links = await fetchAllLinks();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load links';
  }

  const totalClicks = links.reduce((acc, l) => acc + l.clicks, 0);
  const totalLinks = links.length;
  const topLink = links.reduce<LinkData | null>((top, l) => (!top || l.clicks > top.clicks ? l : top), null);

  if (error) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center space-y-3">
        <p className="text-soft-pink/50 text-sm">{error}</p>
        <p className="text-soft-pink/30 text-xs">Make sure the backend is running on port 3001.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
        {[
          { label: 'Total Links', value: totalLinks },
          { label: 'Total Clicks', value: totalClicks },
          {
            label: 'Top Performer',
            value: topLink ? `/${topLink.slug}` : '—',
            mono: true,
          },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-5 text-center space-y-1.5">
            <p
              className={`font-bold text-white/90 ${stat.mono ? 'text-lg text-neon-pink' : 'text-2xl'}`}
              style={{
                fontFamily: stat.mono ? "'DM Sans', monospace" : "'Syne', sans-serif",
              }}
            >
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </p>
            <p className="text-xs text-soft-pink/40 tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {links.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-3">
          <div className="text-4xl mb-2">🌸</div>
          <p className="text-white/60" style={{ fontFamily: "'Syne', sans-serif" }}>
            No links yet
          </p>
          <p className="text-soft-pink/35 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Go ahead and shorten your first URL!
          </p>
          <Link
            href="/"
            className="inline-block mt-3 px-6 py-2.5 rounded-xl text-sm font-medium"
            style={{
              background: 'rgba(255,31,113,0.12)',
              border: '1px solid rgba(255,31,113,0.25)',
              color: '#ff6fa8',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Shorten a URL →
          </Link>
        </div>
      ) : (
        <div className="glass-card rounded-3xl overflow-hidden">
          <div
            className="grid px-6 py-3.5 text-xs font-medium tracking-widest uppercase"
            style={{
              gridTemplateColumns: '1.5fr 2.5fr 80px 120px',
              background: 'rgba(255,31,113,0.04)',
              borderBottom: '1px solid rgba(255,31,113,0.1)',
              color: 'rgba(255,179,204,0.4)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span>Short URL</span>
            <span>Original URL</span>
            <span className="text-center">Clicks</span>
            <span className="text-right">Last Visited</span>
          </div>

          {links.map((link) => (
            <div
              key={link.id}
              className="link-row grid px-6 py-4 items-center"
              style={{ gridTemplateColumns: '1.5fr 2.5fr 80px 120px' }}
            >
              <a
                href={`/${link.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-glow-pink hover:text-soft-pink transition-colors truncate"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                /{link.slug}
              </a>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-soft-pink/35 hover:text-soft-pink/60 transition-colors truncate pr-4"
                title={link.url}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {truncate(link.url)}
              </a>
              <div className="flex justify-center">
                <span className="stat-badge">{link.clicks.toLocaleString()}</span>
              </div>
              <p className="text-xs text-soft-pink/30 text-right" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {formatRelative(link.lastAccessed)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function AnalyticsPage() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#070011' }}>
      <div
        className="orb animate-glow-pulse"
        style={{
          width: '500px',
          height: '500px',
          top: '-150px',
          right: '-100px',
          background: 'radial-gradient(circle, rgba(255,31,113,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="orb animate-float"
        style={{
          width: '300px',
          height: '300px',
          bottom: '10%',
          left: '-80px',
          background: 'radial-gradient(circle, rgba(255,111,168,0.1) 0%, transparent 70%)',
          animationDelay: '2s',
        }}
      />

      <div className="relative z-10">
        <NavBar />
      </div>

      <div className="relative z-10 flex-1 px-4 py-8 md:py-12 max-w-4xl mx-auto w-full">
        <div className="mb-10 space-y-2 animate-slide-up" style={{ animationFillMode: 'both' }}>
          <h1 className="text-3xl md:text-4xl font-bold text-white/90" style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-0.02em' }}>
            Link{' '}
            <span style={{ background: 'linear-gradient(135deg, #ff1f71, #ff6fa8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Analytics
            </span>
          </h1>
          <p className="text-sm text-soft-pink/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            All shortened links and their performance metrics.
          </p>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both', opacity: 0 }}>
          <AnalyticsContent />
        </div>
      </div>

      <footer className="relative z-10 py-8 text-center">
        <p className="text-xs text-soft-pink/20" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          ZOUI Link · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
