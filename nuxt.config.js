// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-08',

  // Nuxt 4 compatibility
  future: {
    compatibilityVersion: 4,
  },

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
