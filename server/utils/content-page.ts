import type { H3Event } from 'h3'
import type { ContentLocale } from '~/composables/useLocaleRoutes'
import { queryCollection } from '@nuxt/content/server'

export function getContentPage(event: H3Event, locale: ContentLocale, slug: string) {
  return queryCollection(event, 'pages')
    .where('locale', '=', locale)
    .where('slug', '=', slug)
    .first()
}

export function getHomePage(event: H3Event, locale: ContentLocale) {
  return queryCollection(event, 'home')
    .where('locale', '=', locale)
    .first()
}
