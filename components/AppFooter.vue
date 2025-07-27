<template>
  <div>
    <div class="max-w-prose mx-auto py-12 px-5 md:px-12 select-none">
      <h3 class="text-lg text-center mb-4">
        Mi trovi (tra gli altri) su:
      </h3>
      <div class="flex justify-between">
        <a href="https://www.linkedin.com/in/enricodeleo" target="_blank" rel="noreferrer">
          <LinkedinIcon alt="LinkedIn icon" class="w-9 h-auto fill-current" />
        </a>
        <a href="https://www.facebook.com/therealenricodeleo" target="_blank" rel="noreferrer">
          <FacebookIcon alt="Facebook icon" class="w-9 h-auto fill-current" />
        </a>
        <a href="https://blog.enricodeleo.com" target="_blank" rel="noreferrer">
          <BloggingIcon alt="Blog icon" class="w-9 h-auto fill-current" />
        </a>
        <a href="https://github.com/enricodeleo" target="_blank" rel="noreferrer">
          <GithubIcon alt="GitHub icon" class="w-9 h-auto fill-current" />
        </a>
        <a href="https://www.behance.net/lysergic" target="_blank" rel="noreferrer">
          <BehanceIcon alt="Behance icon" class="w-9 h-auto fill-current" />
        </a>
        <a href="https://www.instagram.com/enricodeleo/" target="_blank" rel="noreferrer">
          <InstagramIcon alt="Instagram icon" class="w-9 h-auto fill-current" />
        </a>
        <a href="https://www.twitch.tv/enricodeleo" target="_blank" rel="noreferrer">
          <TwitchIcon alt="Twitch icon" class="w-9 h-auto fill-current" />
        </a>
        <a href="https://www.youtube.com/c/EnricoDeleoOfficial" target="_blank" rel="noreferrer">
          <YoutubeIcon alt="YouTube icon" class="w-9 h-auto fill-current" />
        </a>
      </div>
    </div>
    <div class="max-w-prose mx-auto px-5 md:px-12 select-none">
      <p class="text-center mb-0 pb-0">
        Non dimenticare la mia <a rel="noopener" href="https://amzn.to/3fXQw59" target="_blank" class="text-yellow-500"><strong>pagina autore su Amazon</strong></a>.
      </p>
    </div>
    <div class="max-w-xs mx-auto px-5 md:px-12 select-none">
      <Divider class="w-full h-auto fill-current dark:text-white" />
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
    </footer>
  </div>
</template>

<script>
import LinkedinIcon from '~/assets/linkedin.svg?inline'
import FacebookIcon from '~/assets/facebook.svg?inline'
import GithubIcon from '~/assets/github.svg?inline'
import BloggingIcon from '~/assets/blogging.svg?inline'
import BehanceIcon from '~/assets/behance.svg?inline'
import InstagramIcon from '~/assets/instagram.svg?inline'
import TwitchIcon from '~/assets/twitch.svg?inline'
import YoutubeIcon from '~/assets/youtube.svg?inline'
import Divider from '~/assets/divider-shape.svg?inline'

export default {
  name: 'AppFooter',
  components: {
    LinkedinIcon,
    FacebookIcon,
    GithubIcon,
    BloggingIcon,
    BehanceIcon,
    InstagramIcon,
    TwitchIcon,
    YoutubeIcon,
    Divider
  },
  data () {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style>
.iubenda-ibadge {
  margin: 0 auto;
}
</style>
