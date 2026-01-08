<template>
  <div>
    <div class="container mx-auto dark:text-gray-200 sm:subpixel-antialiased md:antialiased leading-relaxed ">
      <img src="~/assets/logo-enrico-deleo.svg" class="max-w-sm mx-auto p-12 fill-current cursor-pointer" alt="Enrico Deleo logo" @click="goHome()">

      <section class="max-w-prose mx-auto px-5">
        <article class="flex flex-wrap">
          <h1 class="text-2xl md:text-3xl font-extrabold leading-tight">
            Fractional CTO &amp; AI Solutions Architect
          </h1>
          <h2 class="text-lg md:text-xl font-extrabold leading-tight">
            AI pragmatica che accelera business e prodotti
          </h2>
          <p class="my-4 text-lg sm:text-xl text-slate-600">
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

          <p class="mt-4 border-l-4 border-amber-600 px-4 py-3 text-sm text-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
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

      <aside v-if="colorMode.value" class="text-xs text-center pb-8 cursor-pointer select-none" @click="changeMode()">
        Passa al tema
        <span
          class="px-2 py-0.5 rounded-md"
          :class="nextMode === 'dark' ? 'bg-gray-800 bg-opacity-75 text-gray-200' : 'bg-gray-50 bg-opacity-75 text-black'"
        >
          {{ nextModeLabel }} {{ nextModeIcon }}
        </span>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const colorMode = useColorMode({
  selector: 'html',
  attribute: 'class',
  initialValue: 'auto',
  emitAuto: true,
  modes: {
    dark: 'dark',
    light: '',
  },
})
const router = useRouter()
const route = useRoute()
const { siteUrl, siteName, siteLocale, siteLanguage, siteDescription, ogImage, profileImage, sameAs } = useSiteMeta()

const modeOrder = ['auto', 'light', 'dark']
const modeLabels = {
  auto: 'auto',
  light: 'chiaro',
  dark: 'scuro',
}
const modeIcons = {
  auto: '🌓',
  light: '☀️',
  dark: '🌙',
}
const nextMode = computed(() => {
  const currentIndex = modeOrder.indexOf(colorMode.value)
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % modeOrder.length
  return modeOrder[nextIndex]
})
const nextModeLabel = computed(() => modeLabels[nextMode.value] ?? nextMode.value)
const nextModeIcon = computed(() => modeIcons[nextMode.value] ?? '🌓')

// Methods as regular functions
const changeMode = () => {
  colorMode.value = nextMode.value
}

const goHome = () => {
  router.push('/')
}

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

// Mounted hook
onMounted(() => {
  const existing = document.querySelector('script[data-agent-id="f991cc4b-610b-4c57-bfca-6e1f8d9a1852"]')
  if (!existing) {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/gh/Autocust/ai-chat-widget@2.3.9/dist/chat-widget.min.js'
    script.setAttribute('data-api-url', 'https://assistant.aisa.tractiontools.it')
    script.setAttribute('data-agent-id', 'f991cc4b-610b-4c57-bfca-6e1f8d9a1852')
    script.defer = true
    document.body.appendChild(script)
  }
})
</script>

<style>
.iubenda-ibadge {
  margin: 0 auto;
}
</style>
