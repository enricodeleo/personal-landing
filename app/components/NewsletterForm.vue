<template>
  <div class="mx-auto max-w-prose rounded-[15px] bg-[#F5F5F5] px-5 pt-10 pb-8 dark:bg-gray-800 md:px-12">
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <!-- Label -->
      <label class="block text-base font-bold text-[#3c4858] dark:text-gray-200">
        I miei insight + link imperdibili, ogni settimana.
      </label>

      <!-- Input Group -->
      <div class="space-y-2">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full rounded-md border border-[#c0ccda] bg-white px-4 py-3 text-[#3c4858] placeholder:text-[#c0ccda] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:placeholder:text-gray-400"
          :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/20': error }"
          required
          @input="onInput"
          @focus="showDropdown = true"
          @blur="onBlur"
        >

        <!-- Suggestions Dropdown -->
        <div
          v-if="showDropdown && suggestions.length > 0"
          class="w-full rounded-md border border-[#c0ccda] bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <div
            v-for="(suggestion, index) in suggestions"
            :key="index"
            class="cursor-pointer px-4 py-2 text-sm text-[#3c4858] hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            @mousedown.prevent="selectSuggestion(suggestion)"
          >
            {{ suggestion }}
          </div>
        </div>

        <!-- Error Message -->
        <p
          v-if="error"
          class="text-xs text-red-600"
        >
          {{ error }}
        </p>

        <p v-else class="text-xs text-[#8390A4] dark:text-gray-400">
          Indica il <strong>tuo miglior indirizzo email</strong> per iscriverti. Es. emailpersonale@gmail.com
        </p>
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button
          type="submit"
          class="px-6 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer"
        >
          Iscriviti
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const email = ref('')
const error = ref('')
const showDropdown = ref(false)
const suggestions = ref([])

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

function selectSuggestion(suggestion) {
  email.value = suggestion.trim().toLowerCase()
  showDropdown.value = false
  error.value = ''
}

function onBlur() {
  setTimeout(() => {
    showDropdown.value = false
    const trimmed = email.value.trim()

    if (trimmed && !isValidEmail(trimmed)) {
      error.value = 'Inserisci un indirizzo email valido'
    } else {
      email.value = trimmed.toLowerCase()
      error.value = ''
    }
  }, 200)
}

function handleSubmit() {
  const trimmed = email.value.trim()

  if (!trimmed) {
    error.value = 'Inserisci il tuo indirizzo email'
    return false
  }

  if (!isValidEmail(trimmed)) {
    error.value = 'Inserisci un indirizzo email valido'
    return false
  }

  email.value = trimmed.toLowerCase()
  error.value = ''
  // Form is valid, submit logic here
  return true
}
</script>
