<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 bg-black/50"
          @click="close"
        />
      </Transition>

      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-prose mx-auto px-5 z-50"
        >
          <div class="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">
                Preferenze cookie
              </h3>
              <button
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                @click="close"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="flex-1">
                  <p class="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                    Cookie necessari
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    Sempre attivi per il funzionamento del sito
                  </p>
                </div>
                <div class="flex items-center h-5">
                  <div class="w-11 h-6 bg-green-500 dark:bg-green-600 rounded-full relative opacity-50 cursor-not-allowed">
                    <div class="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" />
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex-1">
                  <p class="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                    Analytics
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    Ci aiutano a capire come usi il sito
                  </p>
                </div>
                <div class="flex items-center h-5">
                  <div class="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer">
                    <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" />
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex-1">
                  <p class="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                    Chat AI
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    Per chattare con l'assistente AI
                  </p>
                </div>
                <div class="flex items-center h-5">
                  <div class="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer">
                    <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                class="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer"
                @click="close"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>
