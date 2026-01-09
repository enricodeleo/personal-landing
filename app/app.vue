<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <CookieBanner />
    <ClientOnly>
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="-translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="-translate-x-full opacity-0"
      >
        <button
          v-if="prefs.resolved"
          type="button"
          class="fixed bottom-6 left-0 z-40 p-3 bg-white dark:bg-[#0F172A] border-t border-l border-b border-gray-300 dark:border-[#94A3B8]/20 rounded-tr-lg rounded-br-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-out cursor-pointer group -translate-x-3 hover:translate-x-0"
          aria-label="Apri preferenze cookie"
          @click="open"
        >
          <span class="text-2xl group-hover:scale-110 transition-transform inline-block" role="img" aria-label="Cookie">🍪</span>
        </button>
      </Transition>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { prefs } = useConsentCookie()
const { showDialog, open } = useCookiePreferencesDialog()

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
