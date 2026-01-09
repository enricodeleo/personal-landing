<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
const { prefs } = useConsentCookie()

const analyticsConsent = computed(() => prefs.value.resolved && prefs.value.analytics)

useScriptGoogleAnalytics({
  id: 'G-E799VL4Y93',
  scriptOptions: {
    trigger: useScriptTriggerConsent({
      consent: analyticsConsent,
    }),
  },
})
</script>
