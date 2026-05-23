import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 md:px-6">
      <Link
        href="/"
        className="text-lg font-semibold tracking-wide text-white"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        ZOUI Link
      </Link>
      <nav className="flex items-center gap-4 text-sm text-soft-pink/55">
        <Link
          href="/analytics"
          className="hover:text-soft-pink transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Analytics
        </Link>
      </nav>
    </header>
  );
}
