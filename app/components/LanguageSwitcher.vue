<template>
  <nav v-if="target" class="language-switcher" :aria-label="labels.aria">
    <a
      :href="target.href"
      class="language-switcher__link"
      :hreflang="target.hreflang"
      :lang="target.lang"
      :aria-label="target.ariaLabel"
      @click="rememberLocale(target.locale)"
    >
      {{ target.label }}
    </a>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  locale: ContentLocale
}>()

const route = useRoute()
const target = shallowRef<{
  locale: ContentLocale
  label: string
  href: string
  hreflang: string
  lang: string
  ariaLabel: string
} | null>(null)

const labels = computed(() => props.locale === 'en'
  ? {
      aria: 'Language selector',
      label: '🇮🇹 Leggi questa pagina in italiano',
      ariaLabel: 'Leggi questa pagina in italiano',
    }
  : {
      aria: 'Selettore lingua',
      label: '🇬🇧 View this page in English',
      ariaLabel: 'View this page in English',
    })

const targetPath = (locale: ContentLocale) => {
  const resolved = resolveContentRoute(route.path)
  return resolved.slug
    ? localizedContentPath(resolved.slug, locale)
    : localizedHomePath(locale)
}

function detectPreferredLocale(): ContentLocale | null {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  const supportedLocale = languages
    .map(language => language.toLowerCase())
    .map((language) => {
      if (language.startsWith('it')) return 'it'
      if (language.startsWith('en')) return 'en'
      return null
    })
    .find((locale): locale is ContentLocale => locale !== null)

  return supportedLocale || null
}

function resolveTarget(locale: ContentLocale) {
  if (locale === props.locale) return null

  return {
    locale,
    label: labels.value.label,
    href: targetPath(locale),
    hreflang: locale === 'en' ? 'en' : 'it-IT',
    lang: locale === 'en' ? 'en' : 'it-IT',
    ariaLabel: labels.value.ariaLabel,
  }
}

onMounted(() => {
  const preferredLocale = detectPreferredLocale()
  target.value = preferredLocale ? resolveTarget(preferredLocale) : null
})

function rememberLocale(locale: ContentLocale) {
  localStorage.setItem('preferredLocale', locale)
}
</script>
