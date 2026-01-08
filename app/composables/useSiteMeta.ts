export const useSiteMeta = () => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl || 'https://enricodeleo.com').replace(/\/$/, '')

  return {
    siteUrl,
    siteName: 'Enrico Deleo',
    siteLocale: 'it_IT',
    siteLanguage: 'it-IT',
    siteDescription: 'Fractional CTO & AI Solutions Architect. AI pragmatica, LLM, cloud e product strategy per accelerare business, prodotti e time-to-market.',
    ogImage: `${siteUrl}/fb-image.jpg`,
    profileImage: `${siteUrl}/enricodeleo.jpg`,
    sameAs: [
      'https://www.linkedin.com/in/enricodeleo',
      'https://www.facebook.com/therealenricodeleo',
      'https://blog.enricodeleo.com',
      'https://github.com/enricodeleo',
      'https://www.behance.net/lysergic',
      'https://www.instagram.com/enricodeleo/',
      'https://www.twitch.tv/enricodeleo',
      'https://www.youtube.com/c/EnricoDeleoOfficial',
      'https://amzn.to/3fXQw59',
    ],
  }
}
