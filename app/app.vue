<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Iubenda Privacy Scripts
useHead({
  script: [
    {
      innerHTML: `(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);`,
      type: 'text/javascript',
      charset: 'utf-8',
      body: true,
      defer: true,
      async: true,
    },
    {
      innerHTML: `var _iub = _iub || []; _iub.csConfiguration = {"consentOnContinuedBrowsing":false,"ccpaAcknowledgeOnDisplay":true,"whitelabel":false,"lang":"it","siteId":2076706,"enableCcpa":true,"countryDetection":true,"perPurposeConsent":true,"gdprAppliesGlobally":false,"cookiePolicyId":13699998, "banner":{ "position":"float-top-center","acceptButtonDisplay":true,"customizeButtonDisplay":true }};`,
      type: 'text/javascript',
      charset: 'utf-8',
      body: true,
      defer: true,
      async: true,
    },
    {
      src: '//cdn.iubenda.com/cs/ccpa/stable/stub.js',
      type: 'text/javascript',
      charset: 'utf-8',
      body: true,
      defer: true,
      async: true,
    },
    {
      src: '//cdn.iubenda.com/cs/stable/iubenda_cs.js',
      type: 'text/javascript',
      charset: 'utf-8',
      body: true,
      defer: true,
      async: true,
    },
  ],
})

// Facebook Pixel
onMounted(() => {
  if (import.meta.client) {
    // Initialize Facebook Pixel
    window.fbq = window.fbq || function() {
      (window.fbq.q = window.fbq.q || []).push(arguments)
    }
    window.fbq('init', '1039271313132410')
    window.fbq('track', 'PageView')

    // Load Facebook Pixel script
    const script = document.createElement('script')
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    script.async = true
    document.head.appendChild(script)
  }
})
</script>
