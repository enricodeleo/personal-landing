<template>
  <div>
    <ClientOnly>
      <Transition
        enter-active-class="transition-opacity duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showBanner"
          class="fixed bottom-0 left-0 right-0 z-50 px-5 md:px-12 py-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-800"
        >
          <div class="max-w-prose mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 leading-relaxed">
            <div class="flex-1 text-sm">
              <p class="mb-1">
                <strong>🍪 Questo sito usa pochissimi cookie</strong>
              </p>
              <p class="text-gray-600 dark:text-gray-400">
                Uso cookie tecnici e, <strong>solo se vuoi</strong>, analytics e funzionalità come la <strong>chat AI</strong>.
                <br>
                Nessuna pubblicità, nessuna profilazione.
              </p>
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer"
                @click="showPreferences = true"
              >
                Preferenze
              </button>
              <a
                href="#"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-4 hover:decoration-2 cursor-pointer"
                @click.prevent="reject"
              >
                Rifiuta
              </a>
              <button
                class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer"
                @click="accept"
              >
                Accetta tutti
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </ClientOnly>

    <PreferencesDialog
      :is-open="showPreferences"
      @close="showPreferences = false"
    />
  </div>
</template>

<script setup>
const consent = inject('cookieConsent')
const showBanner = ref(false)
const showPreferences = ref(false)

onMounted(() => {
  // Show banner if no consent has been given
  if (import.meta.client) {
    const hasConsent = localStorage.getItem('cookie-consent')
    if (!hasConsent) {
      // Delay appearance for better UX - feels like a "note", not an "interruption"
      setTimeout(() => {
        showBanner.value = true
      }, 500)
    } else if (hasConsent === 'accepted') {
      // Auto-accept if user previously accepted
      consent?.accept()
    }
  }
})

function accept() {
  consent?.accept()
  localStorage.setItem('cookie-consent', 'accepted')
  showBanner.value = false
}

function reject() {
  localStorage.setItem('cookie-consent', 'rejected')
  showBanner.value = false
}
</script>
