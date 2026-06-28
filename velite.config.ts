import { defineConfig, defineCollection, s, z } from 'velite';
import rehypeSlug from 'rehype-slug';

const research = defineCollection({
  name: 'Research',
  pattern: 'src/content/research/*.{en,vi}.mdx',
  schema: s.object({
    slug: s.string(),                         // explicit; required in frontmatter
    locale: z.enum(['en', 'vi']),
    title: s.string().max(160),
    date: s.isodate(),
    summary: s.string().max(400),
    tags: s.array(s.string()).default([]),
    cover: s.string().optional(),
    featured: s.boolean().default(false),
    external: s.string().url().optional(),    // link to stoix-read or external source
    sources: s.array(s.string()).default([]),
    toc: s.toc().optional(),
    body: s.mdx(),
  }).transform((d) => ({
    ...d,
    // derive id as locale__slug for deduplication
    id: `${d.locale}__${d.slug}`,
  })),
});

export default defineConfig({
  root: '.',
  output: { data: '.velite', clean: true },
  mdx: { rehypePlugins: [rehypeSlug] },
  collections: { research },
});
