<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <CookieBanner />
  </div>
</template>

<script setup>
// Cookie consent for loading scripts
const consent = useScriptTriggerConsent()

// Load Google Analytics after consent
useScriptGoogleAnalytics({
  id: 'G-E799VL4Y93',
  scriptOptions: {
    trigger: consent,
  },
})

// Provide consent globally for components to use
provide('cookieConsent', consent)
</script>
