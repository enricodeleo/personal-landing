<template>
  <div>
    <div class="container mx-auto dark:text-gray-200 sm:subpixel-antialiased md:antialiased leading-relaxed ">
      <EnricoDeleoLogo class="max-w-sm mx-auto p-12 fill-current" alt="Enrico Deleo logo" />

      <section class="max-w-prose mx-auto px-5">
        <article class="flex flex-wrap">
          <p class="pb-3">
            Sono <strong>Enrico Deleo</strong> e dai primi 2000s mi occupo di <span class="line-through">sviluppo</span> <span class="line-through">DevOps</span> <span class="line-through">design</span> <span class="line-through">branding</span> <span class="line-through">marketing</span> <span class="line-through">startup</span> digital, in particolar modo <strong>amo creare prodotti customer-centric</strong> attraverso tecnologie web, mobile e cloud.
          </p>
          <p class="pb-3">
            Attraverso il mio lavoro sono stato a contatto con le industry più disparate: dal cinema ed intrattenimento al fintech, passando per la logistica, retail o ancora il food. Alcuni di questi progetti hanno attratto capitali da investitori professionali ed hanno ottenuto riconoscimenti internazionali nell'ambito delle startup e non solo.
          </p>
          <p class="pb-3">
            Da qualche anno aiuto le startup a trovare <strong>soluzioni tecnologiche per accelerare il go to market</strong>, e grandi aziende ad <strong>innovare più velocemente</strong>.
          </p>
          <p>
            Ogni tanto porto la mia esperienza in aula (virtuale e non), nell'ambito di corsi di formazione per aziende o ragazzi sul <em>digital marketing</em>, <em>UI/UX</em>, <em>coding</em> o <em>agile project management</em>.
          </p>
        </article>
      </section>

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
          <a href="https://instagram.com/enricodeleo" target="_blank" rel="noreferrer">
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
      <div class="max-w-prose mx-auto pb-12 px-5 md:px-12 select-none">
        <p class="text-center mb-4">
          Non dimenticare la mia <a rel="noopener" href="https://amzn.to/3fXQw59" target="_blank" class="text-yellow-500"><strong>pagina autore su Amazon</strong></a>.
        </p>
      </div>
      <footer class="max-w-prose mx-auto text-center text-sm text-gray-500 dark:text-gray-400 pb-5 px-5 md:px-12 select-none">
        <p class="pb-3">
          Copyright &copy; 2010-{{ currentYear }} Enrico Deleo
        </p>
        <a href="https://www.iubenda.com/privacy-policy/13699998" class="iubenda-black iubenda-embed mx-auto" title="Privacy Policy ">
          Privacy Policy
        </a>
      </footer>
      <aside v-if="$colorMode.value" class="text-xs text-center pb-8 cursor-pointer select-none" @click="changeMode()">
        Passa al tema
        <span v-show="$colorMode.value === 'dark'" class="bg-gray-50 bg-opacity-75 text-black px-2 py-0.5 rounded-md">chiaro ☀️</span>
        <span v-show="$colorMode.value !== 'dark'" class="bg-gray-800 bg-opacity-75 text-gray-200 px-2 py-0.5 rounded-md">scuro 🌙</span>
      </aside>
    </div>
  </div>
</template>

<script>
import fbImage from '~/assets/fb-image.jpg'
import EnricoDeleoLogo from '~/assets/logo-enrico-deleo.svg?inline'
import LinkedinIcon from '~/assets/linkedin.svg?inline'
import FacebookIcon from '~/assets/facebook.svg?inline'
import GithubIcon from '~/assets/github.svg?inline'
import BloggingIcon from '~/assets/blogging.svg?inline'
import BehanceIcon from '~/assets/behance.svg?inline'
import InstagramIcon from '~/assets/instagram.svg?inline'
import TwitchIcon from '~/assets/twitch.svg?inline'
import YoutubeIcon from '~/assets/youtube.svg?inline'

export default {
  components: {
    EnricoDeleoLogo,
    LinkedinIcon,
    FacebookIcon,
    BloggingIcon,
    GithubIcon,
    BehanceIcon,
    InstagramIcon,
    TwitchIcon,
    YoutubeIcon
  },

  data () {
    return {
      currentYear: new Date().getFullYear()
    }
  },

  methods: {
    changeMode () {
      this.$colorMode.preference = this.$colorMode.preference === 'light' ? 'dark' : 'light'
    }
  },

  head () {
    return this.$seo({
      image: {
        width: 1200,
        height: 630,
        alt: 'Enrico Deleo',
        url: fbImage,
        type: 'image/jpg'
      },
      openGraph: {
        image: {
          width: 1200,
          height: 630,
          alt: 'Enrico Deleo',
          url: fbImage,
          type: 'image/jpg'
        }
      }
    })
  }
}
</script>

<style>
.iubenda-ibadge {
  margin: 0 auto;
}
</style>
