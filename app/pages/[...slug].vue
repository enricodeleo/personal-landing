<template>
  <div>
    <div class="container mx-auto sm:subpixel-antialiased md:antialiased leading-relaxed">
      <div class="w-56 mx-auto px-5 pt-6">
        <div class="flex justify-center">
          <ClientOnly>
            <LazyLanguageSwitcher :locale="resolvedRoute.locale" />
          </ClientOnly>
        </div>
        <a
          :href="localizedHomePath(resolvedRoute.locale)"
          class="inline-svg block w-full p-8 sm:p-12 fill-current text-gray-900 dark:[&>span]:text-[#E5E7EB]"
          aria-label="Enrico Deleo logo"
        >
          <span class="block w-full" aria-hidden="true" v-html="logoSvg" />
        </a>
      </div>

      <section class="max-w-prose mx-auto px-5">
        <main id="main-content" role="main">
          <article class="content-page dark:text-[#F8FAFC]">
            <div class="w-full text-center pb-6">
              <h1 class="text-2xl md:text-3xl font-extrabold leading-tight">
                {{ page?.title }}
              </h1>
            </div>

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

const route = useRoute()
const { siteUrl, siteName, personGivenName, personFamilyName, siteDescription, ogImage, profileImage, sameAs, worksFor } = useSiteMeta()
const resolvedRoute = computed(() => resolveContentRoute(route.path))

const { data: page } = await useAsyncData(
  () => `content-page-${resolvedRoute.value.locale}-${resolvedRoute.value.slug}`,
  async () => {
    if (import.meta.client) return null

    const event = useRequestEvent()
    if (!event) return null

    const { getContentPage } = await import('~~/server/utils/content-page')

    return getContentPage(event, resolvedRoute.value.locale, resolvedRoute.value.slug)
  },
)

if (!page.value || !contentSlugs.includes(resolvedRoute.value.slug)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

const pageTitle = computed(() => page.value?.title || siteName)
const seoTitle = computed(() => page.value?.seoTitle || pageTitle.value)
const pageDescription = computed(() => page.value?.description || siteDescription)
const canonicalUrl = computed(() => {
  const alternates = localizedContentAlternates(resolvedRoute.value.slug, siteUrl)
  return resolvedRoute.value.locale === 'en' ? alternates.en : alternates.it
})
const alternateUrls = computed(() => localizedContentAlternates(resolvedRoute.value.slug, siteUrl))
const pageLanguage = computed(() => contentLocaleLanguage(resolvedRoute.value.locale))
const pageOgLocale = computed(() => contentOgLocale(resolvedRoute.value.locale))

useHead(() => ({
  title: seoTitle.value,
  htmlAttrs: {
    lang: pageLanguage.value,
  },
  meta: [
    { key: 'description', name: 'description', content: pageDescription.value },
    { key: 'og:title', property: 'og:title', content: seoTitle.value },
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
    { key: 'twitter:title', name: 'twitter:title', content: seoTitle.value },
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
      description: siteDescription,
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
      description: siteDescription,
      inLanguage: pageLanguage.value,
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': page.value?.schemaType || 'WebPage',
      '@id': `${canonicalUrl.value}#webpage`,
      url: canonicalUrl.value,
      name: seoTitle.value,
      description: pageDescription.value,
      inLanguage: pageLanguage.value,
      isPartOf: { '@id': `${siteUrl}/#website` },
      dateModified: page.value?.dateModified,
      ...(page.value?.schemaType === 'AboutPage' ? { mainEntity: { '@id': `${siteUrl}/#person` } } : {}),
    },
  ],
}))
</script>
