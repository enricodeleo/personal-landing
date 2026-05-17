export type ContentLocale = 'it' | 'en'

export const contentLocales: ContentLocale[] = ['it', 'en']
export const defaultContentLocale: ContentLocale = 'it'
export const englishContentPrefix = 'en'
export const contentSlugs = ['bio', 'cookie-policy', 'privacy-policy']

export function resolveContentRoute(path: string) {
  const segments = path.split('/').filter(Boolean)
  const locale = segments[0] === englishContentPrefix ? 'en' : defaultContentLocale
  const slugSegments = locale === 'en' ? segments.slice(1) : segments

  return {
    locale: locale as ContentLocale,
    slug: slugSegments.join('/'),
  }
}

export function localizedContentPath(slug: string, locale: ContentLocale = defaultContentLocale) {
  return locale === 'en' ? `/${englishContentPrefix}/${slug}` : `/${slug}`
}

export function localizedHomePath(locale: ContentLocale = defaultContentLocale) {
  return locale === 'en' ? `/${englishContentPrefix}` : '/'
}

export function localizedHomeAlternates(siteUrl: string) {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '')

  return {
    it: `${normalizedSiteUrl}/`,
    en: `${normalizedSiteUrl}/${englishContentPrefix}`,
    xDefault: `${normalizedSiteUrl}/`,
  }
}

export function localizedContentAlternates(slug: string, siteUrl: string) {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '')

  return {
    it: `${normalizedSiteUrl}${localizedContentPath(slug, 'it')}`,
    en: `${normalizedSiteUrl}${localizedContentPath(slug, 'en')}`,
    xDefault: `${normalizedSiteUrl}${localizedContentPath(slug, 'it')}`,
  }
}

export function contentLocaleLanguage(locale: ContentLocale) {
  return locale === 'en' ? 'en' : 'it-IT'
}

export function contentOgLocale(locale: ContentLocale) {
  return locale === 'en' ? 'en_US' : 'it_IT'
}
