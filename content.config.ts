import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
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
