const isDev = process.env.NODE_ENV !== 'production'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    __dangerouslyDisableSanitizers: ['script'],
    title: 'Enrico Deleo',
    meta: [
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0' },
      { hid: 'author', name: 'author', content: 'Enrico Deleo' }
    ],
    script: [
      {
        hid: 'eurlerian-io',
        innerHTML: `
          (function(e,a){var i=e.length,y=5381,k='script',s=window,v=document,o=v.createElement(k);for(;i;){i-=1;y=(y*33)^e.charCodeAt(i)}y='_EA_'+(y>>>=0);(function(e,a,s,y){s[a]=s[a]||function(){(s[y]=s[y]||[]).push(arguments);s[y].eah=e;};}(e,a,s,y));i=new Date/1E7|0;o.ea=y;y=i%26;o.async=1;o.src='//'+e+'/'+String.fromCharCode(97+y,122-y,65+y)+(i%1E3)+'.js?2';s=v.getElementsByTagName(k)[0];s.parentNode.insertBefore(o,s);})('vxxr.enricodeleo.com','EA_call');
          EA_call("profile","visitor");
        `,
        type: 'text/javascript',
        charset: 'utf-8',
        body: true,
        defer: true,
        async: true
      },
      {
        hid: 'iubenda-privacy',
        innerHTML: `
          (function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);
        `,
        type: 'text/javascript',
        charset: 'utf-8',
        body: true,
        defer: true,
        async: true
      },
      {
        hid: 'iubenda-cookie',
        innerHTML: `
          var _iub = _iub || [];
          _iub.csConfiguration = {"consentOnContinuedBrowsing":false,"ccpaAcknowledgeOnDisplay":true,"whitelabel":false,"lang":"it","siteId":2076706,"enableCcpa":true,"countryDetection":true,"perPurposeConsent":true,"gdprAppliesGlobally":false,"cookiePolicyId":13699998, "banner":{ "position":"float-top-center","acceptButtonDisplay":true,"customizeButtonDisplay":true }};
        `,
        type: 'text/javascript',
        charset: 'utf-8',
        body: true,
        defer: true,
        async: true
      },
      {
        hid: 'iubenda-cookie2',
        type: 'text/javascript',
        charset: 'utf-8',
        src: '//cdn.iubenda.com/cs/ccpa/stable/stub.js',
        body: true,
        defer: true,
        async: true
      },
      {
        hid: 'iubenda-cookie3',
        type: 'text/javascript',
        charset: 'utf-8',
        src: '//cdn.iubenda.com/cs/stable/iubenda_cs.js',
        body: true,
        defer: true,
        async: true
      }
    ]
  },

  seo: {
    // Module options
    baseUrl: process.env.NUXT_ENV_FRONTEND_URL,
    name: 'Enrico Deleo',
    title: 'Enrico Deleo - Fractional CTO // Digital Entrepreneur // Holistic Developer | DevOps | UI/UX // Teacher // Consultant',
    lang: 'it-IT',
    language: 'Italian',
    templateTitle: '%name%',
    description: 'Digital Entrepreneur // Web & Mobile Developer | DevOps | UI/UX // Teacher // Consultant',
    keywords: 'coding,frontend,vue,react,angular,nodejs,web,mobile,ios,android,cloud,amazon aws,serverless,startup,saas',
    openGraph: {
      title: 'Enrico Deleo',
      description: 'Digital Entrepreneur // Web & Mobile Developer | DevOps | UI/UX // Teacher // Consultant'
    },
    facebook: {
      pageId: '358373644189796',
      appId: '103937073008677'
    }
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'nuxt-seo',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/google-gtag',
    'nuxt-facebook-pixel-module',
    'nuxt-logger'
  ],

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'color-mode'
  },

  purgeCSS: {
    whitelist: ['dark-mode']
  },

  facebook: {
    /* module options */
    track: 'PageView',
    pixelId: '1039271313132410',
    autoPageView: true,
    disabled: false
  },

  'google-gtag': {
    id: 'G-E799VL4Y93',
    debug: isDev, // enable to track in dev mode
    disableAutoPageTrack: false
  },

  pwa: {
    meta: {
      lang: 'it',
      ogSiteName: 'Lisergico',
      ogHost: process.env.NUXT_ENV_FRONTEND_URL
    }
  },

  robots: {
    UserAgent: '*',
    Allow: '/'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    splitChunks: {
      layouts: true
    },
    optimization: {
      splitChunks: {
        name: true
      }
    },
    babel: {
      presets ({ envName }) {
        const envTargets = {
          client: { browsers: ['last 2 versions'], ie: 11 },
          server: { node: 'current' }
        }
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: { version: 3 },
              targets: envTargets[envName]
            }
          ]
        ]
      }
    }
  },

  // nuxt-logger (https://www.npmjs.com/package/nuxt-logger)
  logger: {
    isEnabled: isDev,
    logLevel: isDev ? 'debug' : 'error'
  }
}
