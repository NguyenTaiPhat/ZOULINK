import { redirect, notFound } from 'next/navigation';

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const reserved = ['analytics', 'favicon.ico', '_next', 'api'];
  if (reserved.some((r) => slug.startsWith(r))) {
    notFound();
  }

  const backendUrl =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  try {
    const res = await fetch(`${backendUrl}/api/links/${slug}/click`, {
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      notFound();
    }

    const data: { url: string } = await res.json();
    const parsed = new URL(data.url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      notFound();
    }

    redirect(data.url);
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message.includes('NEXT_REDIRECT') || err.message.includes('NEXT_NOT_FOUND'))
    ) {
      throw err;
    }
    notFound();
  }
}

export const dynamic = 'force-dynamic';
