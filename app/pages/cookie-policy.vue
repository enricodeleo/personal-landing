<template>
  <div>
    <div class="container mx-auto sm:subpixel-antialiased md:antialiased leading-relaxed">
      <div class="w-56 mx-auto">
        <NuxtLink
          to="/"
          class="inline-svg block w-full p-12 fill-current text-gray-900 dark:[&>span]:text-[#E5E7EB]"
          aria-label="Enrico Deleo logo"
        >
          <span class="block w-full" aria-hidden="true" v-html="logoSvg" />
        </NuxtLink>
      </div>

      <section class="max-w-prose mx-auto px-5">
        <article class="flex flex-wrap dark:text-[#F8FAFC]">
          <div class="w-full text-center pb-6">
            <h1 class="text-2xl md:text-3xl font-extrabold leading-tight">
              Cookie Policy
            </h1>
          </div>

          <p class="pb-3">
            <strong>Ultimo aggiornamento: gennaio 2026</strong>
          </p>

          <p class="pb-3">
            Questa Cookie Policy descrive come questo sito utilizza cookie e tecnologie simili per garantirne il corretto funzionamento e, previo consenso, raccogliere informazioni aggregate sull'utilizzo.
          </p>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Cosa sono i cookie
          </h2>

          <p class="pb-3">
            I cookie sono piccoli file di testo che vengono salvati sul tuo dispositivo quando visiti un sito web. Servono a consentire il corretto funzionamento del sito e, in alcuni casi, a raccogliere informazioni statistiche sull'utilizzo.
          </p>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Tipologie di cookie utilizzati
          </h2>

          <h3 class="text-lg font-bold my-4">
            Cookie necessari
          </h3>

          <p class="pb-3">
            Questi cookie sono essenziali per il funzionamento del sito e non possono essere disabilitati. Vengono utilizzati per:
          </p>

          <ul class="list-disc pl-5 pb-3">
            <li>mantenere la sessione di navigazione</li>
            <li>consentire la navigazione tra le pagine</li>
            <li>essenziali per le funzionalità del sito, come la chat AI</li>
          </ul>

          <h3 class="text-lg font-bold my-4">
            Cookie di misurazione
          </h3>

          <p class="pb-3">
            Questi cookie raccolgono informazioni aggregate sull'utilizzo del sito per analizzare il traffico e migliorarne i contenuti.
          </p>

          <p class="pb-3">
            Google Analytics 4, utilizzato esclusivamente per finalità statistiche
          </p>

          <p class="pb-3">
            nessun utilizzo per advertising, remarketing o profilazione
          </p>

          <p class="pb-3">
            Questi cookie vengono attivati solo previo consenso tramite il banner o il pannello delle preferenze.
          </p>

          <p class="pb-3">
            Alcuni servizi utilizzati dal sito sono forniti da terze parti selezionate e utilizzati esclusivamente per finalità tecniche o statistiche.
          </p>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Gestione delle preferenze
          </h2>

          <p class="pb-3">
            Puoi:
          </p>

          <ul class="list-disc pl-5 pb-3">
            <li>accettare o rifiutare i cookie di misurazione tramite il banner alla prima visita</li>
            <li>modificare o revocare il consenso in qualsiasi momento tramite il pannello delle preferenze disponibile sul sito</li>
            <li>gestire i cookie anche tramite le impostazioni del tuo browser (nota che la disattivazione dei cookie necessari può compromettere il funzionamento del sito)</li>
          </ul>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Durata dei cookie
          </h2>

          <p class="pb-3">
            Cookie di sessione: scadono alla chiusura del browser
          </p>

          <p class="pb-3">
            Cookie persistenti: restano memorizzati per un periodo limitato, secondo le impostazioni dei singoli servizi utilizzati
          </p>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Modifiche a questa policy
          </h2>

          <p class="pb-3">
            Questa Cookie Policy può essere aggiornata nel tempo. Eventuali modifiche saranno pubblicate su questa pagina con l'indicazione della data di aggiornamento.
          </p>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Per maggiori informazioni
          </h2>

          <p class="pb-3">
            Per informazioni dettagliate sul trattamento dei dati personali, consulta la <NuxtLink to="/privacy-policy" class="underline decoration-dotted underline-offset-4"><strong>Privacy Policy</strong></NuxtLink>.
          </p>
        </article>
      </section>

      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import logoSvg from '~/assets/logo-enrico-deleo.svg?raw'

const route = useRoute()
const { siteUrl, siteName, siteLocale, siteLanguage, siteDescription, ogImage, profileImage, sameAs } = useSiteMeta()

// Head configuration
const pageTitle = 'Cookie Policy - Enrico Deleo'
const pageDescription = 'Informazioni sull\'utilizzo dei cookie e delle tecnologie di tracciamento su questo sito.'
const canonicalUrl = computed(() => {
  const path = route.path === '/' ? '/' : route.path.replace(/\/$/, '')
  return `${siteUrl}${path}`
})

useSeoMeta(() => ({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: canonicalUrl.value,
  ogImage,
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageType: 'image/jpeg',
  ogSiteName: siteName,
  ogLocale: siteLocale,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: ogImage,
}))

useHead(() => ({
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
  ],
  script: [
    {
      key: 'ld-json',
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${siteUrl}/#person`,
            name: siteName,
            url: siteUrl,
            image: profileImage,
            jobTitle: 'Fractional CTO & AI Solutions Architect',
            description: siteDescription,
            sameAs,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Roma',
              addressCountry: 'IT',
            },
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: siteName,
            description: siteDescription,
            inLanguage: siteLanguage,
            publisher: { '@id': `${siteUrl}/#person` },
          },
          {
            '@type': 'WebPage',
            '@id': `${canonicalUrl.value}#webpage`,
            url: canonicalUrl.value,
            name: pageTitle,
            description: pageDescription,
            inLanguage: siteLanguage,
            isPartOf: { '@id': `${siteUrl}/#website` },
          },
        ],
      }),
    },
  ],
}))
</script>

<style>
</style>
