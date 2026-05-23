'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface ResultCardProps {
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  slug: string;
}

export default function ResultCard({ shortUrl, originalUrl, clicks }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const truncate = (url: string, max = 55) =>
    url.length > max ? url.slice(0, max) + '…' : url;

  return (
    <div className="glass-card rounded-3xl p-6 space-y-5 animate-scale-in" style={{ animationFillMode: 'both' }}>
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-neon-pink" style={{ boxShadow: '0 0 8px #ff1f71' }} />
        <span className="text-xs font-medium tracking-widest uppercase text-soft-pink/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Link Ready
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex-1 rounded-xl px-4 py-3.5 min-w-0"
          style={{
            background: 'rgba(255,31,113,0.06)',
            border: '1px solid rgba(255,31,113,0.2)',
          }}
        >
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-glow-pink hover:text-soft-pink transition-colors truncate block" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {shortUrl}
          </a>
        </div>
        <button onClick={handleCopy} className={`copy-btn px-5 py-3.5 rounded-xl flex items-center gap-2 shrink-0 ${copied ? 'copied' : ''}`}>
          {copied ? (
            <>
              <CheckIcon />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="flex items-start gap-2.5">
        <LinkIcon />
        <p className="text-xs text-soft-pink/35 leading-relaxed break-all">{truncate(originalUrl)}</p>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-neon-pink/[0.08]">
        <div className="flex items-center gap-2">
          <span className="stat-badge flex items-center gap-1.5">
            <EyeIcon />
            {clicks} click{clicks !== 1 ? 's' : ''}
          </span>
        </div>
        <Link href="/analytics" className="text-xs text-soft-pink/40 hover:text-soft-pink/70 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          View analytics →
        </Link>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,179,204,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
