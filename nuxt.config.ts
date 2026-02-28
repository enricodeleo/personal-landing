import tailwindcss from '@tailwindcss/vite';

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://enricodeleo.com';
const siteDescription = 'Fractional CTO & AI Solutions Architect. AI pragmatica, LLM, cloud e product strategy per accelerare business, prodotti e time-to-market.';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // Set source directory to app/
  srcDir: 'app',

  // Use legacy static/ folder for public assets
  dir: {
    public: 'static',
  },

  // Development tools
  devtools: {
    enabled: process.env.NODE_ENV !== 'production',
  },

  // CSS
  css: ['./app/assets/css/main.css'],

  // Enable static generation
  nitro: {
    preset: 'static',
    trailingSlash: false,
    prerender: {
      autoSubfolderIndex: false,
      failOnError: false,
    },
  },

  // App configuration
  app: {
    head: {
      htmlAttrs: {
        lang: 'it',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'Enrico Deleo',
      meta: [
        { name: 'author', content: 'Enrico Deleo' },
        { name: 'description', content: siteDescription },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon.png' },
        { rel: 'apple-touch-icon', href: '/icon.png' },
      ],
    },
  },

  // Modules
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxt/scripts',
    '@nuxtjs/critters',
  ],

  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'remove',
      },
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      sourcemap: process.env.NODE_ENV !== 'production'
    }
  },

  // Development tools

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      siteUrl,
      n8nWebhookUrl: process.env.NUXT_PUBLIC_N8N_WEBHOOK_URL || 'https://n8n.enricodeleo.com/webhook-test/enricodeleo-com-newsletter-signup',
    }
  },

  // Critters configuration for CSS optimization
  critters: {
    config: {
      preload: 'swap',
    },
  },
})
