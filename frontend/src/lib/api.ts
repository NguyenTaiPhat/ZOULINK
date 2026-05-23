export type LinkData = {
  id: string;
  slug: string;
  url: string;
  clicks: number;
  createdAt: string;
  lastAccessed: string | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function handleResponse<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.error || 'API request failed');
  }
  return body;
}

export async function shortenUrl(url: string, slug?: string): Promise<LinkData> {
  const res = await fetch(`${API_URL}/api/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, slug }),
  });
  return handleResponse<LinkData>(res);
}

export async function fetchAllLinks(): Promise<LinkData[]> {
  const res = await fetch(`${API_URL}/api/links`, {
    cache: 'no-store',
  });
  return handleResponse<LinkData[]>(res);
}
