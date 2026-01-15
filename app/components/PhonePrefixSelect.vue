<template>
  <div class="relative" ref="containerRef">
    <!-- Select Button -->
    <button
      type="button"
      @click="toggleDropdown"
      class="w-full px-3 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-50 cursor-pointer text-left flex items-center justify-between"
      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/20': error }"
    >
      <span v-if="selectedCountry" class="flex items-center gap-2">
        {{ selectedCountry.flag }} {{ selectedCountry.dialCode }}
      </span>
      <span v-else class="text-gray-400">Seleziona</span>
      <svg class="w-4 h-4 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800"
    >
      <!-- Search Input -->
      <div class="sticky top-0 z-10 bg-white p-2 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="text"
          placeholder="Cerca paese..."
          class="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-50 dark:placeholder:text-gray-500"
        >
      </div>

      <!-- Country List -->
      <div class="py-1">
        <div
          v-for="country in filteredCountries"
          :key="country.iso2"
          @click="selectCountry(country)"
          class="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          :class="{ 'bg-blue-50 dark:bg-gray-700': country.dialCode === modelValue }"
        >
          <span class="text-gray-900 dark:text-gray-100">{{ country.flag }} {{ country.dialCode }}</span>
        </div>

        <div v-if="filteredCountries.length === 0" class="px-3 py-2 text-gray-500 dark:text-gray-400">
          Nessun paese trovato
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue"
import { getCountries, getCountryCallingCode } from "libphonenumber-js"

type Option = {
  iso2: string
  name: string
  dialCode: string
  flag: string
}

const props = defineProps<{
  modelValue: string
  id?: string
  error?: boolean
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()

const isOpen = ref(false)
const searchQuery = ref("")
const containerRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)

// Priority countries to show first
const priorityCountryCodes = ["IT", "US", "GB", "DE", "FR", "ES"]

// Get flag emoji from country code
function getFlag(iso2: string): string {
  const codePoints = iso2
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

// Display names for countries
const dn = new Intl.DisplayNames(["it"], { type: "region" })

// All countries sorted by priority then alphabetically
const allCountries = computed<Option[]>(() => {
  const countries = getCountries().map((iso2) => {
    const dialCode = `+${getCountryCallingCode(iso2)}`
    return {
      iso2,
      name: dn.of(iso2) ?? iso2,
      dialCode,
      flag: getFlag(iso2)
    }
  })

  return countries.sort((a, b) => {
    const aPriority = priorityCountryCodes.indexOf(a.iso2)
    const bPriority = priorityCountryCodes.indexOf(b.iso2)

    // Both are priority countries, maintain priority order
    if (aPriority !== -1 && bPriority !== -1) {
      return aPriority - bPriority
    }
    // Only a is priority, show first
    if (aPriority !== -1) return -1
    // Only b is priority, show first
    if (bPriority !== -1) return 1
    // Neither are priority, sort by dial code
    return a.dialCode.localeCompare(b.dialCode, "it")
  })
})

// Currently selected country
const selectedCountry = computed(() => {
  return allCountries.value.find(c => c.dialCode === props.modelValue)
})

// Filter countries based on search
const filteredCountries = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return allCountries.value

  return allCountries.value.filter((country) => {
    return (
      country.name.toLowerCase().includes(query) ||
      country.dialCode.includes(query) ||
      country.iso2.toLowerCase().includes(query)
    )
  })
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }
}

function selectCountry(country: Option) {
  emit("update:modelValue", country.dialCode)
  isOpen.value = false
  searchQuery.value = ""
}

function closeDropdown() {
  isOpen.value = false
  searchQuery.value = ""
}

// Handle click outside
function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>
