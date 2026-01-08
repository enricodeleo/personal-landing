// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-08',

  // Set source directory to app/
  srcDir: 'app',

  // Enable static generation
  nitro: {
    preset: 'static',
    prerender: {
      failOnError: false,
    },
  },

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
      title: 'Enrico Deleo',
      meta: [
        { name: 'author', content: 'Enrico Deleo' }
      ],
    },
  },

  // Modules
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@nuxt/eslint',
    'nuxt-gtag',
    '@vite-pwa/nuxt',
  ],

  // Vite configuration
  vite: {
    // SVGs are loaded as regular images
  },

  // Color mode configuration
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },

  // Robots.txt
  robots: {
    UserAgent: '*',
    Allow: '/',
  },

  // Google Analytics (GA4) with nuxt-gtag
  gtag: {
    id: 'G-E799VL4Y93',
  },

  // PWA configuration with @vite-pwa/nuxt
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['*.jpg', '*.svg'],
    manifest: {
      name: 'Enrico Deleo',
      short_name: 'Enrico Deleo',
      description: 'Fractional CTO & AI Solutions Architect',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      lang: 'it',
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,jpg,svg,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/sibforms\.com\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'brevo-forms-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
            }
          }
        }
      ]
    }
  },

  // TailwindCSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },

  // Development tools
  devtools: {
    enabled: true,
  },

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://enricodeleo.com',
    }
  },
})
