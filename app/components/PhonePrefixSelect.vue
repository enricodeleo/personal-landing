<template>
  <div class="relative">
    <select
      :id="id"
      :value="modelValue"
      @change="handleChange"
      class="w-full px-3 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-50 cursor-pointer"
      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/20': error }"
    >
      <option value="" disabled>Seleziona paese</option>

      <optgroup v-if="filteredMainCountries.length > 0" label="Principali">
        <option
          v-for="country in filteredMainCountries"
          :key="country.iso2"
          :value="country.dialCode"
        >
          {{ country.flag }} {{ country.name }} ({{ country.dialCode }})
        </option>
      </optgroup>

      <optgroup v-if="filteredOtherCountries.length > 0" label="Altri paesi">
        <option
          v-for="country in filteredOtherCountries"
          :key="country.iso2"
          :value="country.dialCode"
        >
          {{ country.flag }} {{ country.name }} ({{ country.dialCode }})
        </option>
      </optgroup>

      <optgroup v-if="filteredMainCountries.length === 0 && filteredOtherCountries.length === 0">
        <option disabled>Nessun paese trovato</option>
      </optgroup>
    </select>

    <!-- Search Input -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Cerca paese..."
      class="absolute right-0 top-0 h-full px-3 py-2 text-sm text-gray-600 bg-transparent border-0 focus:outline-none dark:text-gray-400 w-40"
      @click.stop
    >
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
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

const searchQuery = ref("")

// Main countries to show at top (Italy first, then major countries)
const mainCountryCodes = ["IT", "US", "GB", "DE", "FR", "ES"]

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

// All countries
const allCountries = computed<Option[]>(() => {
  return getCountries()
    .map((iso2) => {
      const dialCode = `+${getCountryCallingCode(iso2)}`
      return {
        iso2,
        name: dn.of(iso2) ?? iso2,
        dialCode,
        flag: getFlag(iso2)
      }
    })
})

// Main countries sorted by importance
const mainCountries = computed<Option[]>(() => {
  return allCountries.value
    .filter((country) => mainCountryCodes.includes(country.iso2))
    .sort((a, b) => {
      const aIndex = mainCountryCodes.indexOf(a.iso2)
      const bIndex = mainCountryCodes.indexOf(b.iso2)
      return aIndex - bIndex
    })
})

// Other countries sorted by dial code
const otherCountries = computed<Option[]>(() => {
  return allCountries.value
    .filter((country) => !mainCountryCodes.includes(country.iso2))
    .sort((a, b) => a.dialCode.localeCompare(b.dialCode, "it"))
})

// Filter countries based on search
function filterCountries(countries: Option[]) {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return countries

  return countries.filter((country) => {
    return (
      country.name.toLowerCase().includes(query) ||
      country.dialCode.includes(query) ||
      country.iso2.toLowerCase().includes(query)
    )
  })
}

const filteredMainCountries = computed(() => filterCountries(mainCountries.value))
const filteredOtherCountries = computed(() => filterCountries(otherCountries.value))

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit("update:modelValue", target.value)
}
</script>
