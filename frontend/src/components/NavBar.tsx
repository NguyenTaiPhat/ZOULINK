'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const isAnalytics = pathname === '/analytics';

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 md:px-8">
      <Link href="/" className="group flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg font-syne text-xs font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #ff1f71, #ff6fa8)',
            boxShadow: '0 4px 15px rgba(255, 31, 113, 0.3)',
          }}
        >
          Z
        </div>
        <span className="font-syne text-lg font-semibold tracking-wide text-white">
          ZOUI Link
        </span>
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          href="/analytics"
          className={`font-dm text-sm transition-colors ${
            isAnalytics
              ? 'text-neon-pink font-medium'
              : 'text-soft-pink/50 hover:text-soft-pink'
          }`}
        >
          Analytics
        </Link>
      </nav>
    </header>
  );
}
