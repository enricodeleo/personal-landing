export const useIubendaConsent = () => {
  // Create a script trigger controlled by Iubenda consent
  const consentTrigger = ref(false)

  // Listen for Iubenda consent
  if (import.meta.client) {
    // Wait for Iubenda to be ready
    window.addEventListener('DOMContentLoaded', () => {
      // Check if user has already given consent
      if (window._iub && window._iub.cs && window._iub.cs.consent) {
        const consent = window._iub.cs.consent
        if (consent?.marketing || consent?.purposes?.[5]) {
          consentTrigger.value = true
        }
      }

      // Listen for consent changes
      window._iub = window._iub || []
      window._iub.push({
        init: () => {
          // Subscribe to Iubenda consent events
          window._iub.csCallbacks = window._iub.csCallbacks || []
          window._iub.csCallbacks.push({
            callback: (cs) => {
              // Trigger scripts when marketing consent is given
              if (cs.consent?.marketing || cs.consent?.purposes?.[5]) {
                consentTrigger.value = true
              }
            },
          })
        },
      })
    })
  }

  return {
    trigger: computed(() => consentTrigger.value ? 'client' : 'manual'),
  }
}
