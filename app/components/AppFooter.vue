<template>
  <div>
    <div class="max-w-prose mx-auto py-12 px-5 md:px-12 select-none">
      <h3 class="text-lg text-center mb-4">
        Mi trovi (tra gli altri) su:
      </h3>
      <div class="flex justify-between text-gray-500 dark:text-gray-400">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
          class="inline-flex h-9 w-9 items-center justify-center transition-colors hover:text-gray-700 dark:hover:text-gray-200"
          :aria-label="link.label"
        >
          <span class="inline-svg h-full w-full fill-current" aria-hidden="true" v-html="link.icon"/>
        </a>
      </div>
    </div>
    <div class="max-w-prose mx-auto px-5 md:px-12 select-none">
      <p class="text-center mb-0 pb-0">
        Non dimenticare la mia <a rel="noopener" href="https://amzn.to/3fXQw59" target="_blank" class="text-yellow-500"><strong>pagina autore su Amazon</strong></a>.
      </p>
    </div>
    <div class="max-w-xs mx-auto px-5 md:px-12 select-none">
      <span
        class="inline-svg block w-full fill-current text-gray-300 dark:text-gray-600/70"
        aria-hidden="true"
        v-html="dividerShapeSvg"
      />
    </div>
    <nav class="mx-auto max-w-max mb-4">
      <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        Home
      </NuxtLink>
      <span class="mx-2">•</span>
      <NuxtLink to="/bio" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        Bio
      </NuxtLink>
    </nav>
    <footer class="max-w-prose mx-auto text-center text-sm text-gray-500 dark:text-gray-400 pb-5 px-5 md:px-12 select-none">
      <p class="pb-3">
        Deleo Enrico - P.IVA: 02714140841 - Codice REA: RM1678566
      </p>
      <p class="pb-3">
        Copyright &copy; 2010-{{ currentYear }} Enrico Deleo
      </p>
      <a href="https://www.iubenda.com/privacy-policy/13699998" class="iubenda-black iubenda-embed mx-auto" title="Privacy Policy ">
        Privacy Policy
      </a>
      <div class="pt-4 text-center text-xs">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-md border px-2 py-1 transition-colors"
          :class="buttonToneClasses"
          @click="next()"
          :aria-label="stateLabel"
        >
          <span>{{ stateLabel }}</span>
          <span v-if="state === 'light'" aria-hidden="true">☀️</span>
          <span v-else-if="state === 'dark'" aria-hidden="true">🌙</span>
          <span v-else aria-hidden="true">💻</span>
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import behanceSvg from '~/assets/behance.svg?raw'
import bloggingSvg from '~/assets/blogging.svg?raw'
import dividerShapeSvg from '~/assets/divider-shape.svg?raw'
import facebookSvg from '~/assets/facebook.svg?raw'
import githubSvg from '~/assets/github.svg?raw'
import instagramSvg from '~/assets/instagram.svg?raw'
import linkedinSvg from '~/assets/linkedin.svg?raw'
import twitchSvg from '~/assets/twitch.svg?raw'
import youtubeSvg from '~/assets/youtube.svg?raw'

const currentYear = ref(new Date().getFullYear())

const mode = useColorMode({
  emitAuto: true,
  modes: {
    dark: 'dark',
    light: '',
  },
})

const { state, next } = useCycleList(['auto', 'light', 'dark'], { initialValue: mode })

watchEffect(() => {
  mode.value = state.value
})

const resolvedMode = computed(() => (state.value === 'auto' ? mode.state.value : state.value))
const stateLabel = computed(() => {
  if (state.value === 'light') return 'tema chiaro'
  if (state.value === 'dark') return 'tema scuro'
  return 'tema auto'
})
const buttonToneClasses = computed(() => (resolvedMode.value === 'dark'
  ? 'border-gray-600 bg-gray-700/70 text-gray-100 hover:text-white'
  : 'border-gray-200 bg-white text-gray-700 hover:text-gray-900'))

const socialLinks = [
  { href: 'https://www.linkedin.com/in/enricodeleo', label: 'LinkedIn', icon: linkedinSvg },
  { href: 'https://www.facebook.com/therealenricodeleo', label: 'Facebook', icon: facebookSvg },
  { href: 'https://blog.enricodeleo.com', label: 'Blog', icon: bloggingSvg },
  { href: 'https://github.com/enricodeleo', label: 'GitHub', icon: githubSvg },
  { href: 'https://www.behance.net/lysergic', label: 'Behance', icon: behanceSvg },
  { href: 'https://www.instagram.com/enricodeleo/', label: 'Instagram', icon: instagramSvg },
  { href: 'https://www.twitch.tv/enricodeleo', label: 'Twitch', icon: twitchSvg },
  { href: 'https://www.youtube.com/c/EnricoDeleoOfficial', label: 'YouTube', icon: youtubeSvg },
]
</script>

<style>
.iubenda-ibadge {
  margin: 0 auto;
}
</style>
