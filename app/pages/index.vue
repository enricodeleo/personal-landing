<template>
  <div>
    <div class="container mx-auto sm:subpixel-antialiased md:antialiased leading-relaxed">
      <NuxtLink
        to="/"
        class="inline-svg block max-w-sm mx-auto p-12 fill-current text-gray-900 dark:[&>span]:text-[#E5E7EB]"
        aria-label="Enrico Deleo logo"
      >
        <span class="block w-full" aria-hidden="true" v-html="logoSvg"/>
      </NuxtLink>

      <section class="max-w-prose mx-auto px-5">
        <article class="flex flex-wrap dark:text-[#F8FAFC]">
          <h1 class="text-2xl md:text-3xl font-extrabold leading-tight">
            Fractional CTO &amp; AI Solutions Architect
          </h1>
          <h2 class="text-lg md:text-xl font-extrabold leading-tight">
            AI pragmatica che accelera business e prodotti
          </h2>
          <p class="my-4 text-lg sm:text-xl text-slate-600 dark:text-[#CBD5E1]">
            <em>
              Trasformo idee in soluzioni scalabili con <strong>Large Language Models</strong>,
              architetture cloud e un metodo data-driven orientato al ROI.
            </em>
          </p>

          <p class="pb-3">
            Sono <strong>Enrico Deleo</strong> e dai primi 2000s  progetto soluzioni digitali che uniscono web, mobile e cloud.
            Oggi integro <strong>AI generativa e predittiva</strong> per ridurre costi, moltiplicare conversioni e mettere i prodotti
            online più in fretta.
          </p>
          <p>
            Ho guidato team tecnologici operanti dal fintech al retail, passando per media e logistica, collaborando
            con founder e board per <strong>allineare tecnologia e obiettivi di business</strong>.
            In questi ambiti e non solo, ho aiutato startup ad <strong>accelerare il proprio percorso</strong> verso il
            mercato e con aziende corporate ad <strong>innovare rapidamente</strong> e rimanere competitive.
          </p>

          <h3 class="text-lg font-bold my-4">
            Cosa ottieni quando diventi mio partner
          </h3>
          <ul class="list-disc pl-5">
            <li><strong>Fractional CTO</strong> - governance tecnica, roadmap evolutiva, scaling cloud &amp; DevOps.</li>
            <li><strong>AI / LLM Integration</strong> - chatbot RAG, agenti autonomi, analisi predittive.</li>
            <li><strong>Tech Coaching &amp; Workshop</strong> - formazione su AI, product-led growth, agile best practice.</li>
          </ul>

          <p class="mt-4 border-l-4 border-amber-600 px-4 py-3 text-slate-800 dark:bg-[#111827]/50 dark:text-[#CBD5E1]">
            Metto in gioco il mio <strong>capitale intellettuale</strong> e la mia reputazione quanto il tuo budget.
            Dispongo di <strong>1 slot a trimestre</strong>: se ambisci al livello successivo, scrivimi.
          </p>

          <p class="mt-4 pb-3">
            Come <strong>Fractional CTO</strong>, offro una leadership tecnologica flessibile e strategica senza gravare
            sull'organico full-time. Questo consente di accedere a competenze senior per guidare progetti critici,
            costruire team performanti e scalare l'infrastruttura digitale con efficienza. Lavoro fianco a fianco con
            founder e C-level per allineare le scelte tecnologiche ai KPI, <strong>accelerando il time-to-market</strong>
            e riducendo rischi di crescita.
          </p>

          <BrevoForm />

          <p class="pb-3">
            Sono basato <strong>a Roma</strong>, al centro di un ecosistema tecnologico e imprenditoriale in continua crescita.
            Collaboro con startup e aziende di tutto il mondo, con team distribuiti dalla Cina al Sud America. La mia posizione
            mi consente di offrire supporto strategico sia in loco, partecipando attivamente alla scena tecnologica della
            capitale, sia da remoto, garantendo la massima flessibilità operativa.
          </p>

          <p>
            Ogni tanto condivido la mia esperienza attraverso corsi di formazione personalizzati su <strong>digital marketing</strong>,
            <strong>UI/UX</strong>, <strong>coding</strong> e <strong>agile project management</strong>, aiutando aziende e
            giovani talenti a crescere in un ecosistema digitale in continua evoluzione.
          </p>

          <p>
            Ho co-fondato <strong>Traction</strong> e <strong>AutoCust</strong> — due iniziative che mirano a
            rivoluzionare il modo in cui le aziende interagiscono con i propri clienti e ottimizzano i processi di marketing.
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
const pageTitle = 'Enrico Deleo - Fractional CTO & AI Solutions Architect'
const pageDescription = 'AI pragmatica e data-driven per accelerare business e prodotti: LLM, cloud architecture e leadership tecnologica.'
const canonicalUrl = computed(() => {
  const path = route.path === '/' ? '/' : route.path.replace(/\/$/, '')
  return `${siteUrl}${path}`
})

useSeoMeta(() => ({
  title: pageTitle,
  description: pageDescription,
  ogTitle: siteName,
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
  twitterTitle: siteName,
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
            knowsAbout: [
              'Large Language Models',
              'AI strategy',
              'Fractional CTO',
              'Cloud architecture',
              'DevOps',
              'Product strategy',
            ],
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
            '@type': 'ProfilePage',
            '@id': `${canonicalUrl.value}#webpage`,
            url: canonicalUrl.value,
            name: pageTitle,
            description: pageDescription,
            inLanguage: siteLanguage,
            isPartOf: { '@id': `${siteUrl}/#website` },
            mainEntity: { '@id': `${siteUrl}/#person` },
          },
        ],
      }),
    },
  ],
}))

// AI Chat Widget with consent-based loading
const consent = inject('cookieConsent')

useScript({
  src: 'https://cdn.jsdelivr.net/gh/Autocust/ai-chat-widget@3.2.13/dist/chat-widget.min.js',
  scriptOptions: {
    attributes: {
      'data-api-url': 'https://assistant.aisa.tractiontools.it',
      'data-agent-id': 'f991cc4b-610b-4c57-bfca-6e1f8d9a1852',
    },
    trigger: consent,
  },
})
</script>

<style>
</style>
