<template>
  <!-- Just the modal content, no teleport/backdrop wrapper -->
  <div
    v-if="show"
    class="relative rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800 max-h-[90vh] overflow-y-auto"
  >
    <!-- Close Button -->
    <button
      @click="closeWithoutSaving"
      class="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      :aria-label="labels.close"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <!-- Step 1: Ask about commercial communications -->
    <div v-if="step === 1" class="space-y-6">
      <div class="text-center">
        <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {{ labels.step1Title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          {{ labels.step1Body }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ labels.step1Help }}
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <button
          @click="goToStep2"
          class="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          {{ labels.yes }}
        </button>
        <button
          @click="closeWithoutSaving"
          class="w-full rounded-lg bg-gray-100 px-6 py-3 text-gray-700 font-medium hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {{ labels.no }}
        </button>
      </div>

      <p class="text-xs text-center text-gray-500 dark:text-gray-400">
        {{ labels.unsubscribe }}
      </p>
    </div>

    <!-- Step 2: Collect business information -->
    <div v-else-if="step === 2" class="space-y-5">
      <div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {{ labels.step2Title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          {{ labels.step2Body }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Company Name (Mandatory) -->
                <div>
                  <label for="company" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {{ labels.company }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="company"
                    v-model="formData.company"
                    type="text"
                    :placeholder="labels.companyPlaceholder"
                    required
                    class="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-50 dark:placeholder:text-gray-500"
                    :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/20': errors.company }"
                    @input="errors.company = ''"
                  >
                  <p v-if="errors.company" class="mt-1 text-xs text-red-600">
                    {{ errors.company }}
                  </p>
                </div>

                <!-- Website (Optional) -->
                <div>
                  <label for="website" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {{ labels.website }}
                  </label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400 pointer-events-none">
                      https://
                    </span>
                    <input
                      id="website"
                      v-model="formData.website"
                      type="text"
                      :placeholder="labels.websitePlaceholder"
                      class="w-full rounded-md border border-gray-300 bg-white pl-[4.5rem] pr-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-50 dark:placeholder:text-gray-500"
                      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/20': errors.website }"
                      @input="validateWebsite"
                    >
                  </div>
                  <p v-if="errors.website" class="mt-1 text-xs text-red-600">
                    {{ errors.website }}
                  </p>
                  <p v-else class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {{ labels.websiteHelp }}
                  </p>
                </div>

                <!-- Phone Number (Mandatory) -->
                <div class="max-w-full">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {{ labels.phone }} <span class="text-red-500">*</span>
                  </label>
                  <div class="flex gap-2">
                    <!-- Country Prefix (Lazy Loaded) -->
                    <div class="w-28 shrink-0">
                      <ClientOnly>
                        <LazyPhonePrefixSelect
                          v-model="formData.phonePrefix"
                          :error="!!errors.phone"
                          :locale="locale"
                        />
                      </ClientOnly>
                    </div>

                    <!-- Phone Number -->
                    <input
                      v-model="formData.phoneNumber"
                      type="tel"
                      placeholder="3331234567"
                      required
                      class="w-0 min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-50 dark:placeholder:text-gray-500"
                      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/20': errors.phone }"
                      @input="errors.phone = ''"
                    >
                  </div>
                  <p v-if="errors.phone" class="mt-1 text-xs text-red-600">
                    {{ errors.phone }}
                  </p>
                  <p v-else class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {{ labels.phoneHelp }}
                  </p>
                </div>

                <!-- Number of Employees and Annual Revenue -->
                <div class="flex gap-4">
                  <!-- Number of Employees -->
                  <div class="flex-1">
                    <label for="employees" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {{ labels.employees }}
                    </label>
                    <select
                      id="employees"
                      v-model="formData.employees"
                      class="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-50"
                    >
                      <option value="">{{ labels.select }}</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>

                  <!-- Annual Revenue -->
                  <div class="flex-1">
                    <label for="revenue" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {{ labels.revenue }}
                    </label>
                    <select
                      id="revenue"
                      v-model="formData.revenue"
                      class="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-50"
                    >
                      <option value="">{{ labels.select }}</option>
                      <option value="<500k">{{ labels.revenueUnder500k }}</option>
                      <option value="500k-1M">€500.000 - €1.000.000</option>
                      <option value="1M-5M">€1.000.000 - €5.000.000</option>
                      <option value="5M-10M">€5.000.000 - €10.000.000</option>
                      <option value="10M-50M">€10.000.000 - €50.000.000</option>
                      <option value="50M+">{{ labels.revenueOver50M }}</option>
                    </select>
                  </div>
                </div>

                <!-- Business Type -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ labels.businessType }}
                  </label>
                  <div class="space-y-2">
                    <label class="flex items-center gap-3 cursor-pointer">
                      <input
                        v-model="formData.businessType"
                        type="radio"
                        value="B2B"
                        class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                      >
                      <span class="text-sm text-gray-700 dark:text-gray-300">B2B (Business to Business)</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer">
                      <input
                        v-model="formData.businessType"
                        type="radio"
                        value="B2C"
                        class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                      >
                      <span class="text-sm text-gray-700 dark:text-gray-300">B2C (Business to Consumer)</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer">
                      <input
                        v-model="formData.businessType"
                        type="radio"
                        value="Hybrid"
                        class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                      >
                      <span class="text-sm text-gray-700 dark:text-gray-300">{{ labels.hybrid }}</span>
                    </label>
                  </div>
                </div>

                <!-- Commercial Communications Consent -->
                <div class="border-t border-gray-200 pt-4 dark:border-gray-700">
                  <label class="flex items-start gap-3 cursor-pointer">
                    <input
                      v-model="formData.acceptsCommercial"
                      type="checkbox"
                      class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.commercial }"
                    >
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      {{ labels.commercialConsent }}
                    </span>
                  </label>
                  <p
                    v-if="errors.commercial"
                    class="mt-1 text-xs text-red-600"
                  >
                    {{ errors.commercial }}
                  </p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col gap-3 pt-4">
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="isSubmitting">{{ labels.sending }}</span>
                    <span v-else>{{ labels.send }}</span>
                  </button>
                  <button
                    type="button"
                    @click="goToStep1"
                    class="w-full rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                  >
                    {{ labels.back }}
                  </button>
                </div>

                <p class="text-xs text-center text-gray-500 dark:text-gray-400">
                  {{ labels.footer }}
                </p>
              </form>
            </div>
          </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  requestId: {
    type: String,
    required: true
  },
  locale: {
    type: String,
    default: 'it'
  }
})

const emit = defineEmits(['close', 'submit'])

const step = ref(1)
const isSubmitting = ref(false)
const labels = computed(() => props.locale === 'en'
  ? {
      close: 'Close',
      step1Title: 'Great, you are subscribed!',
      step1Body: 'Before you go: would you also like to receive commercial offers and exclusive content about consulting services?',
      step1Help: 'This is completely optional and helps me send you more relevant business content.',
      yes: 'Yes, I am interested',
      no: 'No thanks, newsletter only',
      unsubscribe: 'You can unsubscribe at any time.',
      step2Title: 'Tell me about your business',
      step2Body: 'This information helps me send you more relevant content.',
      company: 'Company name',
      companyPlaceholder: 'E.g. Tech Solutions Ltd',
      website: 'Website',
      websitePlaceholder: 'www.yourcompany.com',
      websiteHelp: 'Enter only the domain, e.g. www.yourcompany.com',
      phone: 'Phone number',
      phoneHelp: 'Select the country and enter the local number',
      employees: 'Employees',
      revenue: 'Annual revenue',
      select: 'Select...',
      revenueUnder500k: 'Less than €500,000',
      revenueOver50M: 'Over €50,000,000',
      businessType: 'Business type',
      hybrid: 'Hybrid (B2B + B2C)',
      commercialConsent: 'I consent to receive commercial communications and personalized offers about consulting services *',
      sending: 'Sending...',
      send: 'Send information',
      back: 'Back',
      footer: 'This information is optional and helps me personalize content for you.',
      invalidDomain: 'Enter a valid domain, e.g. www.yourcompany.com',
      companyRequired: 'Company name is required',
      countryRequired: 'Select the country prefix',
      phoneRequired: 'Phone number is required',
      invalidPhone: 'Enter a valid phone number, e.g. 333 1234567',
      commercialRequired: 'You must consent to commercial communications to submit this form',
    }
  : {
      close: 'Chiudi',
      step1Title: 'Ottimo, sei iscritto!',
      step1Body: 'Prima di lasciarti, volevo chiederti: vorresti ricevere anche offerte commerciali e contenuti esclusivi su servizi di consulenza?',
      step1Help: 'È completamente opzionale e mi aiuta a inviarti contenuti più rilevanti per il tuo business.',
      yes: 'Sì, sono interessato',
      no: 'No, grazie, solo la newsletter',
      unsubscribe: 'Puoi cancellarti in qualsiasi momento.',
      step2Title: 'Parliamo del tuo business',
      step2Body: 'Queste informazioni mi aiuteranno a inviarti contenuti più rilevanti.',
      company: 'Nome Azienda',
      companyPlaceholder: 'Es. Tech Solutions Srl',
      website: 'Sito Web',
      websitePlaceholder: 'www.tuonome.it',
      websiteHelp: 'Inserisci solo il dominio (es. www.tuosito.it)',
      phone: 'Numero di Telefono',
      phoneHelp: 'Seleziona il paese e inserisci il numero locale',
      employees: 'Numero di Dipendenti',
      revenue: 'Fatturato Annuale',
      select: 'Seleziona...',
      revenueUnder500k: 'Meno di €500.000',
      revenueOver50M: 'Oltre €50.000.000',
      businessType: 'Tipologia di Business',
      hybrid: 'Ibrido (B2B + B2C)',
      commercialConsent: 'Acconsento a ricevere comunicazioni commerciali e offerte personalizzate su servizi di consulenza *',
      sending: 'Invio in corso...',
      send: 'Invia informazioni',
      back: 'Indietro',
      footer: 'Queste informazioni sono facoltative e mi aiutano a personalizzare i contenuti per te.',
      invalidDomain: 'Inserisci un dominio valido (es. www.tuosito.it)',
      companyRequired: 'Il nome azienda è obbligatorio',
      countryRequired: 'Seleziona il prefisso del paese',
      phoneRequired: 'Il numero di telefono è obbligatorio',
      invalidPhone: 'Inserisci un numero di telefono valido (es. 333 1234567)',
      commercialRequired: 'Devi accettare di ricevere comunicazioni commerciali per inviare il modulo',
    })
const locale = computed(() => props.locale)

const formData = ref({
  company: '',
  website: '',
  phonePrefix: '+39', // Default Italy
  phoneNumber: '',
  employees: '',
  revenue: '',
  businessType: '',
  acceptsCommercial: true // Default true
})

const errors = ref({
  company: '',
  website: '',
  phone: '',
  commercial: ''
})

function goToStep2() {
  step.value = 2
}

function goToStep1() {
  step.value = 1
}

function closeWithoutSaving() {
  // Reset form
  step.value = 1
  formData.value = {
    company: '',
    website: '',
    phonePrefix: '+39',
    phoneNumber: '',
    employees: '',
    revenue: '',
    businessType: '',
    acceptsCommercial: true
  }
  errors.value = { company: '', website: '', phone: '', commercial: '' }
  emit('close')
}

// Validate website domain (optional field, but if provided must be valid domain)
function validateWebsite() {
  errors.value.website = ''

  // If empty, that's fine (optional field)
  if (!formData.value.website || formData.value.website.trim() === '') {
    return
  }

  const domain = formData.value.website.trim()

  // Basic domain validation regex (allows: domain.com, www.domain.com, sub.domain.co.uk, etc.)
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i

  if (!domainRegex.test(domain)) {
    errors.value.website = labels.value.invalidDomain
  }
}

async function handleSubmit() {
  // Reset errors
  errors.value = { company: '', website: '', phone: '', commercial: '' }

  // Validate company (mandatory)
  if (!formData.value.company || formData.value.company.trim() === '') {
    errors.value.company = labels.value.companyRequired
    return
  }

  // Validate website (optional, but if provided must be valid domain format)
  if (formData.value.website && formData.value.website.trim() !== '') {
    const domain = formData.value.website.trim()
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i

    if (!domainRegex.test(domain)) {
      errors.value.website = labels.value.invalidDomain
      return
    }
  }

  // Validate phone (mandatory)
  if (!formData.value.phonePrefix || formData.value.phonePrefix === '') {
    errors.value.phone = labels.value.countryRequired
    return
  }

  if (!formData.value.phoneNumber || formData.value.phoneNumber.trim() === '') {
    errors.value.phone = labels.value.phoneRequired
    return
  }

  // Validate phone number (must have at least 6-15 digits after country code)
  const phoneNumber = formData.value.phoneNumber.trim()
  const phoneDigits = phoneNumber.replace(/\D/g, '') // Remove all non-digits

  if (phoneDigits.length < 6 || phoneDigits.length > 15) {
    errors.value.phone = labels.value.invalidPhone
    return
  }

  // Validate commercial consent (mandatory - must be checked to submit)
  if (!formData.value.acceptsCommercial) {
    errors.value.commercial = labels.value.commercialRequired
    return
  }

  isSubmitting.value = true

  // Prepare website URL (prepend https:// if provided)
  const websiteUrl = formData.value.website && formData.value.website.trim() !== ''
    ? `https://${formData.value.website.trim()}`
    : ''

  // Combine prefix and number, strip spaces
  const phoneClean = `${formData.value.phonePrefix}${phoneNumber.replace(/\s/g, '')}`

  // Emit the business info data (no email needed, already sent in first submission)
  emit('submit', {
    request_id: props.requestId,
    wantsCommercialComms: formData.value.acceptsCommercial,
    businessInfo: {
      company: formData.value.company.trim(),
      website: websiteUrl,
      phone: phoneClean,
      employees: formData.value.employees?.trim() || '',
      revenue: formData.value.revenue?.trim() || '',
      businessType: formData.value.businessType?.trim() || ''
    }
  })

  // Reset after a short delay
  setTimeout(() => {
    isSubmitting.value = false
    closeWithoutSaving()
  }, 500)
}

// Close on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
      closeWithoutSaving()
    }
  }
  window.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>
