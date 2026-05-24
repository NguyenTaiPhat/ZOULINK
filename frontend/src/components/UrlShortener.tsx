'use client';

import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import ResultCard from '@/components/ResultCard';
import { shortenUrl, type LinkData } from '@/lib/api';

const APP_URL =
  typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function UrlShortener() {
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LinkData | null>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      toast.error('Please enter a URL first');
      urlInputRef.current?.focus();
      return;
    }

    try {
      const parsed = new URL(trimmedUrl);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('bad protocol');
      }
    } catch {
      toast.error('Please enter a valid http:// or https:// URL');
      return;
    }

    setLoading(true);
    try {
      const data = await shortenUrl(trimmedUrl, slug.trim() || undefined);
      setResult(data);
      toast.success('Short link created!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setUrl('');
    setSlug('');
    setTimeout(() => urlInputRef.current?.focus(), 50);
  };

  const shortUrl = result ? `${APP_URL}/${result.slug}` : '';

  return (
    <div className="w-full max-w-xl mx-auto space-y-5">
      <div className="glass-card rounded-3xl p-7 md:p-8 space-y-6 animate-slide-up" style={{ animationFillMode: 'both' }}>
        <div className="space-y-1.5">
          <h2 className="font-syne text-lg font-semibold text-white/90">
            Shorten a URL
          </h2>
          <p className="font-dm text-sm text-soft-pink/40">
            Paste your long link below and get a clean short URL instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url-input" className="block font-dm text-xs font-medium tracking-widest uppercase text-soft-pink/45">
              Long URL
            </label>
            <input
              id="url-input"
              ref={urlInputRef}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://super-long-url.com/going/on/forever"
              className="input-field w-full px-5 py-4 rounded-2xl font-dm text-sm md:text-base"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="space-y-2">
            <label className="block font-dm text-xs font-medium tracking-widest uppercase text-soft-pink/45">
              Custom Slug{' '}
              <span className="normal-case tracking-normal text-soft-pink/25">(optional)</span>
            </label>
            <div className="flex rounded-2xl overflow-hidden">
              <div className="slug-prefix flex items-center px-4 py-4 font-dm text-sm shrink-0 rounded-l-2xl">
                zoui.link/
              </div>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                placeholder="my-link"
                maxLength={50}
                className="input-field flex-1 px-4 py-4 font-dm text-sm rounded-r-2xl rounded-l-none border-l-0"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="pink-glow-btn w-full py-4 rounded-2xl font-dm text-base">
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="inline-block h-4 w-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                Shortening...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <SparkleIcon />
                Shorten URL
              </span>
            )}
          </button>
        </form>
      </div>

      {result && (
        <div key={result.id}>
          <ResultCard shortUrl={shortUrl} originalUrl={result.url} clicks={result.clicks} slug={result.slug} />
          <div className="flex justify-center mt-4">
            <button
              onClick={handleReset}
              className="font-dm text-xs text-soft-pink/30 hover:text-soft-pink/60 transition-colors"
            >
              &larr; Shorten another URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}
