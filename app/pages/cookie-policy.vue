<template>
  <div>
    <div class="container mx-auto dark:text-gray-200 sm:subpixel-antialiased md:antialiased leading-relaxed pb-40">
      <div class="w-56 mx-auto">
        <NuxtLink
          to="/"
          class="inline-svg block w-full p-12 fill-current text-gray-900 dark:text-gray-200"
          aria-label="Enrico Deleo logo"
        >
          <span class="block w-full" aria-hidden="true" v-html="logoSvg"/>
        </NuxtLink>
      </div>

      <section class="max-w-prose mx-auto px-5">
        <article class="flex flex-wrap">
          <div class="w-full text-center pb-6">
            <h1 class="text-2xl md:text-3xl font-extrabold leading-tight">
              Cookie Policy
            </h1>
          </div>

          <p class="pb-3">
            <strong>Ultimo aggiornamento: Gennaio 2026</strong>
          </p>

          <p class="pb-3">
            Questa Cookie Policy spiega come questo sito ("il Sito") utilizza i cookie e tecnologie simili per riconoscere l'utente quando visita il Sito.
          </p>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Cosa sono i cookie
          </h2>

          <p class="pb-3">
            I cookie sono piccoli file di testo che vengono salvati sul tuo dispositivo quando visiti un sito web. Vengono utilizzati per memorizzare informazioni sulle tue visite e per rendere l'esperienza di navigazione più conforme alle tue preferenze.
          </p>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Tipologie di cookie utilizzati
          </h2>

          <h3 class="text-lg font-bold my-4">
            Cookie necessari
          </h3>

          <p class="pb-3">
            Questi cookie sono essenziali per il funzionamento del Sito e non possono essere disabilitati. Vengono utilizzati per:
          </p>

          <ul class="list-disc pl-5 pb-3">
            <li>Mantenere la sessione dell'utente</li>
            <li>Consentire la navigazione tra le pagine</li>
            <li>Abilitare funzionalità essenziali come la chat AI</li>
          </ul>

          <h3 class="text-lg font-bold my-4">
            Cookie di misurazione
          </h3>

          <p class="pb-3">
            Questi cookie raccolgono informazioni aggregate sull'utilizzo del Sito per analizzare il traffico e comprendere come gli utenti interagiscono con i contenuti. Vengono utilizzati solo previo tuo consenso e includono:
          </p>

          <ul class="list-disc pl-5 pb-3">
            <li><strong>Google Analytics 4</strong> - per analizzare le tendenze di navigazione in forma anonima e aggregata</li>
          </ul>

          <p class="pb-3">
            Puoi rifiutare questi cookie attraverso il pannello delle preferenze accessibile dal banner cookie o in qualsiasi momento modificando le impostazioni del tuo browser.
          </p>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Come gestire i cookie
          </h2>

          <p class="pb-3">
            Puoi gestire le tue preferenze sui cookie in diversi modi:
          </p>

          <ul class="list-disc pl-5 pb-3">
            <li>Attraverso il banner cookie che appare alla prima visita</li>
            <li>Tramite il pannello delle preferenze accessibile in ogni momento</li>
            <li>Modificando le impostazioni del tuo browser (nota che questo potrebbe compromettere alcune funzionalità del Sito)</li>
          </ul>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Cookie di terze parti
          </h2>

          <p class="pb-3">
            Questo Sito potrebbe incorporare contenuti o servizi di terze parti (es. widget sociali, video) che utilizzano cookie indipendenti. Questi cookie sono soggetti alle privacy policy delle rispettive terze parti.
          </p>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Durata dei cookie
          </h2>

          <p class="pb-3">
            I cookie utilizzati da questo Sito hanno diverse durate:
          </p>

          <ul class="list-disc pl-5 pb-3">
            <li><strong>Cookie di sessione</strong> - scadono quando chiudi il browser</li>
            <li><strong>Cookie persistenti</strong> - rimangono sul tuo dispositivo per un periodo definito (solitamente da alcuni mesi a 2 anni)</li>
          </ul>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Modifiche a questa policy
          </h2>

          <p class="pb-3">
            Ci riserviamo il diritto di modificare questa Cookie Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con l'indicazione della data di aggiornamento.
          </p>

          <h2 class="text-lg md:text-xl mt-6 mb-4 font-extrabold leading-tight">
            Contatti
          </h2>

          <p class="pb-3">
            Per qualsiasi domanda relativa all'utilizzo dei cookie su questo Sito, puoi contattarmi tramite i canali indicati nella pagina dei contatti.
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
