import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const issues = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/issues' }),
  schema: z.object({
    title: z.string(),
    /** ISO date string matching the filename, e.g. 2026-04-27 */
    date: z.coerce.date(),
    /** Beehiiv/email subject line */
    subject: z.string().optional(),
    /** Email preview text (90 chars max) */
    preview: z.string().optional(),
    /** At-a-glance bullet strings — no trailing dates per editorial rules */
    glance: z.array(z.string()).default([]),
    /** Regulatory scorecard rows */
    scorecard: z
      .array(
        z.object({
          front: z.string(),
          status: z.enum(['favorable', 'neutral', 'hostile']),
          note: z.string(),
        })
      )
      .default([]),
  }),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.url().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { issues, essays, projects };
