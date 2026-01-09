<template>
  <div ref="formRoot" class="sib-form w-full" style="text-align: center;">
    <div id="sib-form-container" class="sib-form-container w-full flex justify-items-center">
      <div id="error-message" class="sib-form-message-panel" style="text-align: left; color: #661d1d; background-color: transparent; border-radius: 3px; border-color: #ff4949; max-width: 540px;">
        <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
          <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
            <path d="M256 40C118.621 0 8 119.083 8 256s111.043 216 248 216 248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
          </svg>
          <span class="sib-form-message-panel__inner-text">
            La tua iscrizione non può essere convalidata.
          </span>
        </div>
      </div>
      <div id="success-message" class="sib-form-message-panel" style="text-align: left; color: #085229; background-color: transparent; border-radius: 3px; border-color: #13ce66; max-width: 540px;">
        <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
          <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
            <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
          </svg>
          <span class="sib-form-message-panel__inner-text">
            La tua iscrizione è avvenuta correttamente.
          </span>
        </div>
      </div>
      <div />
      <div id="sib-container" class="sib-container--large sib-container--vertical" style="text-align: center; background-color: #F5F5F5; max-width: 540px; border-radius: 15px; border: none; direction: ltr; margin: 0 auto;">
        <form id="sib-form" method="POST" action="https://b1fa6014.sibforms.com/serve/MUIFAOiLHmcDr6VCxqiw2TGu0PVHOx6kNsMg7GwYNkINCO3q2-QUE2mmEqfUynvm_HociIFYOs7QYvH_Rgzao6x1SIcO71_Cvd36qfhaFS5Zrn7CdRIbr0BekB6pKcxWjt1hKE_h1K5byr06Z4QhGGWtO_NHQ4gIiARex9d3dk1IhBKjoM-fwQ3LQHpEp6FwoL19qHHjF6wXyxeg" data-type="subscription">
          <div style="padding: 8px 0;">
            <div class="sib-input sib-form-block">
              <div class="form__entry entry_block">
                <div class="form__label-row ">
                  <label class="entry__label" style="font-weight: 700; text-align:left; font-size:16px; color:#3c4858;" for="EMAIL" data-required="*">
                    I miei insight + link imperdibili, ogni settimana.
                  </label>
                  <div class="entry__field">
                    <input
                      id="EMAIL"
                      class="input"
                      type="text"
                      name="EMAIL"
                      autocomplete="off"
                      placeholder="EMAIL"
                      data-required="true"
                      required
                    >
                  </div>
                </div>
                <label class="entry__error entry__error--primary" style="font-size:16px; text-align:left; color:#661d1d; background-color:transparent; border-radius:3px; border-color:#ff4949;" />
                <label class="entry__specification" style="font-size:12px; text-align:left; color:#8390A4; text-align:left">
                  Indica il tuo indirizzo email per iscriverti. Es. abc@xyz.com
                </label>
              </div>
            </div>
          </div>
          <div style="padding: 8px 0;">
            <div class="sib-form-block" style="text-align: center">
              <button class="sib-form-block__button sib-form-block__button-with-loader" style="font-size:16px; text-align:center; font-weight:700; color:#3c4858; background-color:#FFFFFF; border-width:0px;" form="sib-form" type="submit">
                <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512" style="">
                  <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                </svg>
                ISCRIVITI
              </button>
            </div>
          </div>
          <input type="text" name="email_address_check" value="" class="input--hidden">
          <input type="hidden" name="locale" value="it">
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const formRoot = ref(null)

const setBrevoGlobals = () => {
  if (!import.meta.client) {
    return
  }

  window.REQUIRED_CODE_ERROR_MESSAGE = 'Scegli un prefisso paese'
  window.LOCALE = 'it'
  window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = 'Le informazioni fornite non sono valide. Controlla il formato del campo e riprova.'
  window.REQUIRED_ERROR_MESSAGE = 'Questo campo non può essere lasciato vuoto. '
  window.GENERIC_INVALID_MESSAGE = 'Le informazioni fornite non sono valide. Controlla il formato del campo e riprova.'
  window.translation = {
    common: {
      selectedList: '{quantity} lista selezionata',
      selectedLists: '{quantity} liste selezionate',
      selectedOption: '{quantity} selezionato',
      selectedOptions: '{quantity} selezionati'
    }
  }
  window.AUTOHIDE = Boolean(0)
}

const scriptTrigger = useScriptTriggerElement({ trigger: 'visible', el: formRoot })

useScript('https://sibforms.com/forms/end-form/build/main.js', {
  defer: true,
  trigger: scriptTrigger,
  beforeInit: setBrevoGlobals
})

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://sibforms.com/forms/end-form/build/sib-styles.css'
    }
  ]
})
</script>

<style>
#sib-container input:-ms-input-placeholder {
  text-align: left;
  color: #c0ccda;
}

#sib-container input::placeholder {
  text-align: left;
  color: #c0ccda;
}

#sib-container textarea::placeholder {
  text-align: left;
  color: #c0ccda;
}

#sib-container a {
  text-decoration: underline;
  color: #2BB2FC;
}

html.dark #sib-container {
  background-color: #1f2937 !important;
}

html.dark #sib-container,
html.dark #sib-container label,
html.dark #sib-container .entry__label,
html.dark #sib-container .entry__specification {
  color: #e5e7eb !important;
}

html.dark #sib-container input,
html.dark #sib-container textarea {
  background-color: #111827 !important;
  color: #f9fafb !important;
  border-color: #374151 !important;
}

html.dark #sib-container input::placeholder,
html.dark #sib-container textarea::placeholder {
  color: #9ca3af !important;
}

html.dark #sib-container .sib-form-block__button {
  background-color: #f3f4f6 !important;
  color: #111827 !important;
}
</style>
