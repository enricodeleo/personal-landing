import tailwindcss from '@tailwindcss/vite';

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://enricodeleo.com';

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
    enabled: true,
  },

  // CSS
  css: ['./app/assets/css/main.css'],

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
      htmlAttrs: {
        lang: 'it',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'Enrico Deleo',
      meta: [
        { name: 'author', content: 'Enrico Deleo' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon.png' },
        { rel: 'apple-touch-icon', href: '/icon.png' },
      ],
    },
  },

  // Modules
  modules: [
    '@nuxtjs/robots',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxt/scripts',
    '@vite-pwa/nuxt',
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  // Robots.txt
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: `${siteUrl}/sitemap.xml`,
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
      icons: [
        { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      ],
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

  // Development tools

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      siteUrl,
    }
  },
})
