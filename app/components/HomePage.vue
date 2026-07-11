<template>
  <div>
    <div class="container mx-auto sm:subpixel-antialiased md:antialiased leading-relaxed">
      <header class="mx-auto max-w-sm px-5 pt-6">
        <div class="flex justify-center">
          <ClientOnly>
            <LazyLanguageSwitcher :locale="locale" />
          </ClientOnly>
        </div>
        <a
          :href="localizedHomePath(locale)"
          class="inline-svg block p-8 sm:p-12 fill-current text-gray-900 dark:[&>span]:text-[#E5E7EB]"
          aria-label="Enrico Deleo logo"
        >
          <span class="block w-full" aria-hidden="true" v-html="logoSvg" />
        </a>
      </header>

      <section class="max-w-prose mx-auto px-5">
        <main id="main-content" role="main">
          <article class="home-page text-gray-900 dark:text-[#F8FAFC]">
            <ContentRenderer v-if="page" :value="page" />
          </article>
        </main>
      </section>

      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import logoSvg from '~/assets/logo-enrico-deleo.svg?raw'

const props = defineProps<{
  locale: ContentLocale
}>()
const locale = computed(() => props.locale)

const { siteUrl, siteName, personGivenName, personFamilyName, ogImage, profileImage, sameAs, worksFor } = useSiteMeta()

const { data: page } = await useAsyncData(
  () => `home-page-${props.locale}`,
  async () => {
    if (import.meta.client) return null

    const event = useRequestEvent()
    if (!event) return null

    const { getHomePage } = await import('~~/server/utils/content-page')

    return getHomePage(event, props.locale)
  },
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

const pageTitle = computed(() => page.value?.seoTitle || page.value?.title || siteName)
const pageDescription = computed(() => page.value?.description || '')
const canonicalUrl = computed(() => {
  const alternates = localizedHomeAlternates(siteUrl)
  return props.locale === 'en' ? alternates.en : alternates.it
})
const alternateUrls = computed(() => localizedHomeAlternates(siteUrl))
const pageLanguage = computed(() => contentLocaleLanguage(props.locale))
const pageOgLocale = computed(() => contentOgLocale(props.locale))

useHead(() => ({
  title: pageTitle.value,
  htmlAttrs: {
    lang: pageLanguage.value,
  },
  meta: [
    { key: 'description', name: 'description', content: pageDescription.value },
    { key: 'og:title', property: 'og:title', content: pageTitle.value },
    { key: 'og:description', property: 'og:description', content: pageDescription.value },
    { key: 'og:type', property: 'og:type', content: 'website' },
    { key: 'og:url', property: 'og:url', content: canonicalUrl.value },
    { key: 'og:image', property: 'og:image', content: ogImage },
    { key: 'og:image:width', property: 'og:image:width', content: '1200' },
    { key: 'og:image:height', property: 'og:image:height', content: '630' },
    { key: 'og:image:type', property: 'og:image:type', content: 'image/jpeg' },
    { key: 'og:site_name', property: 'og:site_name', content: siteName },
    { key: 'og:locale', property: 'og:locale', content: pageOgLocale.value },
    { key: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
    { key: 'twitter:title', name: 'twitter:title', content: pageTitle.value },
    { key: 'twitter:description', name: 'twitter:description', content: pageDescription.value },
    { key: 'twitter:image', name: 'twitter:image', content: ogImage },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
    { rel: 'alternate', hreflang: 'it-IT', href: alternateUrls.value.it },
    { rel: 'alternate', hreflang: 'en', href: alternateUrls.value.en },
    { rel: 'alternate', hreflang: 'x-default', href: alternateUrls.value.xDefault },
  ],
}))

useJsonLd(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: siteName,
      givenName: personGivenName,
      familyName: personFamilyName,
      url: siteUrl,
      image: profileImage,
      jobTitle: 'Fractional CTO & AI Solutions Architect',
      description: pageDescription.value,
      sameAs,
      worksFor,
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
      description: pageDescription.value,
      inLanguage: pageLanguage.value,
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': page.value?.schemaType || 'ProfilePage',
      '@id': `${canonicalUrl.value}#webpage`,
      url: canonicalUrl.value,
      name: pageTitle.value,
      description: pageDescription.value,
      inLanguage: pageLanguage.value,
      isPartOf: { '@id': `${siteUrl}/#website` },
      dateModified: toIsoDateTime(page.value?.dateModified),
      mainEntity: { '@id': `${siteUrl}/#person` },
    },
  ],
}))
</script>
