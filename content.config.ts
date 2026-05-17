import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    home: defineCollection({
      type: 'page',
      source: 'home/*.md',
      schema: z.object({
        title: z.string(),
        seoTitle: z.string(),
        description: z.string(),
        locale: z.enum(['it', 'en']),
        schemaType: z.string().default('ProfilePage'),
        changefreq: z.string().default('monthly'),
        priority: z.number().default(1),
      }),
    }),
    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md',
      schema: z.object({
        title: z.string(),
        seoTitle: z.string().optional(),
        description: z.string(),
        slug: z.string(),
        locale: z.enum(['it', 'en']),
        schemaType: z.string().default('WebPage'),
        changefreq: z.string().default('monthly'),
        priority: z.number().default(0.5),
      }),
    }),
  },
})
