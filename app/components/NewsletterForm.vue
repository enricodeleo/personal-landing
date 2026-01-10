<template>
  <div class="w-full rounded-[15px] bg-[#F5F5F5] px-5 pt-10 pb-8 dark:bg-gray-800 md:px-12" :class="{ 'animate-shake': hasError }">
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <!-- Success Message -->
      <div
        v-if="state === 'success'"
        class="rounded-md bg-green-50 p-4 dark:bg-green-900/20 animate-fade-in"
      >
        <div class="flex items-center gap-3">
          <div class="flex-shrink-0 animate-checkmark">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p class="text-sm font-medium text-green-800 dark:text-green-200">
            Grazie per l'iscrizione! Controlla la tua email per confermare.
          </p>
        </div>
      </div>

      <template v-if="state !== 'success'">
      <!-- Label -->
      <label for="newsletter-email" class="block text-base font-bold text-[#3c4858] dark:text-gray-200">
        I miei insight + link imperdibili, ogni settimana.
      </label>

      <!-- Honeypot field - hidden from real users but visible to bots -->
      <div class="absolute -left-[9999px] w-[1px] h-[1px] overflow-hidden" aria-hidden="true">
        <label for="website-field" class="block">Leave this field empty</label>
        <input
          id="website-field"
          ref="honeypotField"
          v-model="honeypotValue"
          type="text"
          tabindex="-1"
          autocomplete="off"
          data-lpignore="true"
        >
      </div>

      <!-- Timestamp field for spam prevention -->
      <input type="hidden" name="timestamp" :value="timestamp" data-lpignore="true">

      <!-- Input Group -->
      <div class="space-y-2 relative">
        <input
          id="newsletter-email"
          v-model="email"
          type="email"
          name="email"
          placeholder="Email"
          class="w-full rounded-md border border-[#c0ccda] bg-white px-4 py-3 text-[#3c4858] placeholder:text-[#c0ccda] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:placeholder:text-gray-500"
          :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/20': error }"
          :aria-invalid="error !== '' || serverError !== ''"
          :aria-describedby="error ? 'email-error' : undefined"
          required
          @input="onInput"
          @focus="showDropdown = true"
          @blur="onInputBlur"
          @keydown.down.prevent="focusFirstSuggestion"
          ref="emailInput"
          data-lpignore="true"
        >

        <!-- Suggestions Dropdown -->
        <div
          v-if="showDropdown && suggestions.length > 0"
          class="w-full rounded-md border border-[#c0ccda] bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <div
            v-for="(suggestion, index) in suggestions"
            :key="index"
            data-suggestion
            class="cursor-pointer px-4 py-2 text-sm text-[#3c4858] hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            :class="{ 'bg-gray-100 dark:bg-gray-700': focusedIndex === index }"
            tabindex="0"
            @mousedown.prevent="selectSuggestion(suggestion)"
            @keydown.enter.prevent="selectSuggestion(suggestion)"
            @keydown.escape="showDropdown = false"
            @mouseover="focusedIndex = index"
            @focus="focusedIndex = index"
            @blur="onSuggestionBlur"
          >
            {{ suggestion }}
          </div>
        </div>

        <!-- Error Message -->
        <p
          v-if="error"
          id="email-error"
          class="text-xs text-red-600"
          role="alert"
        >
          {{ error }}
        </p>

        <!-- Server Error Message -->
        <p
          v-else-if="serverError"
          id="email-error"
          class="text-xs text-red-600"
          role="alert"
        >
          {{ serverError }}
        </p>

        <p v-else class="text-xs text-gray-600 dark:text-gray-300">
          Indica il <strong>tuo miglior indirizzo email</strong> per iscriverti. Es. emailpersonale@gmail.com
        </p>
      </div>

      <!-- Privacy Policy Acceptance -->
      <div class="space-y-2">
        <label class="flex items-start gap-3 cursor-pointer">
          <input
            id="privacy-accept"
            v-model="acceptedPrivacy"
            type="checkbox"
            name="privacy"
            class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': privacyError }"
            :aria-invalid="privacyError !== ''"
            :aria-describedby="privacyError ? 'privacy-error' : undefined"
            required
          >
          <span class="text-sm text-[#3c4858] dark:text-gray-200">
            Ho letto e accetto la <NuxtLink to="/privacy-policy" target="_blank" rel="noopener" class="underline decoration-dotted underline-offset-4">Privacy Policy</NuxtLink> *
          </span>
        </label>
        <p
          v-if="privacyError"
          id="privacy-error"
          class="text-xs text-red-600"
          role="alert"
        >
          {{ privacyError }}
        </p>
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button
          type="submit"
          :disabled="state === 'loading'"
          :aria-busy="state === 'loading'"
          class="px-6 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="state === 'loading'" aria-hidden="true">Iscrizione in corso...</span>
          <span v-else>Iscriviti</span>
        </button>
      </div>
      </template>
    </form>
  </div>
</template>

<script setup>
const email = ref('')
const emailInput = ref(null)
const honeypotValue = ref('')
const timestamp = ref(0)
const acceptedPrivacy = ref(false)
const error = ref('')
const serverError = ref('')
const privacyError = ref('')
const showDropdown = ref(false)
const suggestions = ref([])
const focusedIndex = ref(-1)
const state = ref('idle') // 'idle' | 'loading' | 'success' | 'error'
const hasError = ref(false)

// Generate timestamp only on client side to avoid hydration mismatch
onMounted(() => {
  timestamp.value = Date.now()
})

const domains = [
  '@gmail.com',
  '@libero.it',
  '@hotmail.it',
  '@outlook.it',
  '@yahoo.it',
  '@icloud.com',
  '@alice.it',
  '@tim.it',
  '@virgilio.it',
  '@poste.it',
  '@tin.it',
  '@fastwebnet.it',
  '@email.it',
  '@me.com',
  '@live.it'
]

const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

function onInput() {
  const value = email.value.toLowerCase()
  email.value = value
  focusedIndex.value = -1

  if (value.includes('@')) {
    const [localPart, domainPart] = value.split('@')
    suggestions.value = domains
      .filter(domain => domain.startsWith('@' + domainPart))
      .map(domain => localPart + domain)
      .slice(0, 5)
  } else {
    suggestions.value = domains.map(domain => value + domain).slice(0, 5)
  }

  if (value.length > 0) {
    showDropdown.value = true
  } else {
    showDropdown.value = false
  }

  // Clear error when typing
  if (error.value) {
    error.value = ''
  }
}

function focusFirstSuggestion() {
  if (showDropdown.value && suggestions.value.length > 0) {
    nextTick(() => {
      const suggestionElements = document.querySelectorAll('[data-suggestion]')
      if (suggestionElements[0]) {
        suggestionElements[0].focus()
        focusedIndex.value = 0
      }
    })
  }
}

function selectSuggestion(suggestion) {
  email.value = suggestion.trim().toLowerCase()
  showDropdown.value = false
  focusedIndex.value = -1
  error.value = ''
}

function onInputBlur(event) {
  // Check if the next focused element is a suggestion
  const relatedTarget = event.relatedTarget
  const isSuggestion = relatedTarget?.hasAttribute('data-suggestion')

  if (!isSuggestion) {
    // Only validate and close if not moving to a suggestion
    setTimeout(() => {
      showDropdown.value = false
      focusedIndex.value = -1
      const trimmed = email.value.trim()

      if (trimmed && !isValidEmail(trimmed)) {
        error.value = 'Inserisci un indirizzo email valido'
      } else {
        email.value = trimmed.toLowerCase()
        error.value = ''
      }
    }, 200)
  }
}

function onSuggestionBlur(event) {
  const relatedTarget = event.relatedTarget
  const isInputOrSuggestion = relatedTarget === emailInput.value || relatedTarget?.hasAttribute('data-suggestion')

  if (!isInputOrSuggestion) {
    // Close dropdown if focus moves outside
    setTimeout(() => {
      showDropdown.value = false
      focusedIndex.value = -1
    }, 200)
  }
}

async function handleSubmit() {
  const trimmed = email.value.trim()

  // Trigger shake on validation error
  if (!trimmed) {
    error.value = 'Inserisci il tuo indirizzo email'
    triggerShake()
    return
  }

  if (!isValidEmail(trimmed)) {
    error.value = 'Inserisci un indirizzo email valido'
    triggerShake()
    return
  }

  if (!acceptedPrivacy.value) {
    privacyError.value = 'Devi accettare la Privacy Policy per iscriverti'
    triggerShake()
    return
  }

  email.value = trimmed.toLowerCase()
  error.value = ''
  serverError.value = ''
  privacyError.value = ''

  // Submit to n8n webhook
  state.value = 'loading'

  const config = useRuntimeConfig()
  const webhookUrl = config.public.n8nWebhookUrl

  try {
    await $fetch(webhookUrl, {
      method: 'POST',
      body: {
        email: email.value,
        website_field: honeypotValue.value,
        timestamp: timestamp.value
      }
    })

    state.value = 'success'
    email.value = ''
    honeypotValue.value = ''
    acceptedPrivacy.value = false
  } catch (err) {
    state.value = 'error'
    serverError.value = err.data?.message || 'Si è verificato un errore. Riprova più tardi.'
  }
}

function triggerShake() {
  hasError.value = true
  setTimeout(() => {
    hasError.value = false
  }, 500)
}
</script>

<style scoped>
/* Shake animation for errors */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

/* Fade in animation for success message */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Checkmark draw animation */
@keyframes checkmark {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.animate-checkmark svg {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: checkmark 0.4s ease-out forwards;
}
</style>

