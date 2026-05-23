import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { nanoid } from 'nanoid';
import { z, ZodError } from 'zod';
import { createLimiter } from '../middleware/rateLimiter';

const router = Router();

const createLinkSchema = z.object({
  url: z
    .string()
    .min(1, 'URL is required')
    .url('Please enter a valid URL'),
  slug: z
    .string()
    .min(3, 'Custom slug must be at least 3 characters')
    .max(50, 'Custom slug must be under 50 characters')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Slug can only contain letters, numbers, hyphens, and underscores')
    .optional(),
});

function isSafeUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

router.post('/', createLimiter, async (req, res) => {
  try {
    const { url, slug } = createLinkSchema.parse(req.body);

    if (!isSafeUrl(url)) {
      return res.status(400).json({ error: 'Only HTTP/HTTPS URLs are allowed.' });
    }

    if (slug) {
      const existing = await prisma.link.findUnique({ where: { slug } });
      if (existing) {
        return res.status(409).json({ error: 'That slug is already taken. Try another.' });
      }
      const link = await prisma.link.create({ data: { slug, url } });
      return res.status(201).json(link);
    }

    let newSlug = nanoid(7);
    let collision = await prisma.link.findUnique({ where: { slug: newSlug } });
    if (collision) newSlug = nanoid(7);

    const link = await prisma.link.create({ data: { slug: newSlug, url } });
    return res.status(201).json(link);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error('[POST /api/links]', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return res.json(links);
  } catch (err) {
    console.error('[GET /api/links]', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const link = await prisma.link.findUnique({ where: { slug: req.params.slug } });
    if (!link) return res.status(404).json({ error: 'Link not found.' });
    return res.json(link);
  } catch (err) {
    console.error('[GET /api/links/:slug]', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/:slug/click', async (req, res) => {
  try {
    const link = await prisma.link.update({
      where: { slug: req.params.slug },
      data: {
        clicks: { increment: 1 },
        lastAccessed: new Date(),
      },
    });
    return res.json({ url: link.url });
  } catch (err: any) {
    if (err?.code === 'P2025') {
      return res.status(404).json({ error: 'Link not found.' });
    }
    console.error('[POST /api/links/:slug/click]', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
