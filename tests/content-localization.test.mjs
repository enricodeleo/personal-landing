import { existsSync, readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { cwd } from 'node:process'
import assert from 'node:assert/strict'

const root = cwd()
const pages = ['bio', 'cookie-policy', 'privacy-policy']
const locales = ['it', 'en']

for (const locale of locales) {
  const file = join(root, 'content/home', `${locale}.md`)
  assert.equal(existsSync(file), true, `${file} should exist`)

  const markdown = readFileSync(file, 'utf8')
  assert.match(markdown, /^---\n[\s\S]*\n---\n/, `${file} should have frontmatter`)
  assert.match(markdown, new RegExp(`locale: ${locale}`), `${file} should declare locale`)
  assert.match(markdown, /description: .+/, `${file} should declare description`)
  assert.match(markdown, /::NewsletterForm/, `${file} should embed the newsletter component`)
}

for (const locale of locales) {
  for (const page of pages) {
    const file = join(root, 'content/pages', locale, `${page}.md`)
    assert.equal(existsSync(file), true, `${file} should exist`)

    const markdown = readFileSync(file, 'utf8')
    assert.match(markdown, /^---\n[\s\S]*\n---\n/, `${file} should have frontmatter`)
    assert.match(markdown, new RegExp(`locale: ${locale}`), `${file} should declare locale`)
    assert.match(markdown, new RegExp(`slug: ${page}`), `${file} should declare slug`)
    assert.match(markdown, /description: .+/, `${file} should declare description`)
  }
}

assert.equal(existsSync(join(root, 'app/pages/[...slug].vue')), true, 'catch-all content route should exist')
assert.equal(existsSync(join(root, 'app/pages/en.vue')), true, 'English homepage route should exist')
assert.equal(existsSync(join(root, 'app/components/LanguageSwitcher.vue')), true, 'language switcher component should exist')

const homePage = readFileSync(join(root, 'app/components/HomePage.vue'), 'utf8')
assert.match(homePage, /<ClientOnly>[\s\S]*<LazyLanguageSwitcher\s+:locale="locale"/, 'homepage should lazy-load the client-only language switcher')

const languageSwitcher = readFileSync(join(root, 'app/components/LanguageSwitcher.vue'), 'utf8')
assert.match(languageSwitcher, /🇬🇧 View this page in English/, 'Italian pages should expose an explicit English switcher label')
assert.match(languageSwitcher, /🇮🇹 Leggi questa pagina in italiano/, 'English pages should expose an explicit Italian switcher label')
assert.match(languageSwitcher, /navigator\.languages/, 'language switcher should use browser language hints')
assert.match(languageSwitcher, /v-if="target"/, 'language switcher should render only when the other locale is preferred')
assert.doesNotMatch(languageSwitcher, /<NuxtLink/, 'language switcher should avoid client-side route transitions')
assert.match(homePage, /class="flex justify-center"/, 'homepage language switcher should be centered above the logo')

const newsletterForm = readFileSync(join(root, 'app/components/NewsletterForm.vue'), 'utf8')
assert.match(newsletterForm, /class="newsletter-form"/, 'newsletter form should expose a stable root class for Markdown spacing')

const globalCss = readFileSync(join(root, 'app/assets/css/main.css'), 'utf8')
assert.match(globalCss, /\.home-page\s+\.newsletter-form\s*\{[\s\S]*margin-bottom:\s*(3rem|4rem)/, 'newsletter embed should leave a larger gap before following content')
assert.match(globalCss, /\.home-page\s+\.newsletter-form\s*\{[\s\S]*margin-top:\s*(3rem|4rem)/, 'newsletter embed should leave a larger gap after preceding content')
assert.match(globalCss, /\.home-page\s+blockquote\s*\{[\s\S]*margin-bottom:\s*(1\.5rem|2rem)/, 'homepage quotes should leave space before following content')

for (const page of pages) {
  assert.equal(existsSync(join(root, 'app/pages', `${page}.vue`)), false, `${page}.vue should be migrated to content`)
}

const sitemap = readFileSync(join(root, 'static/sitemap.xml'), 'utf8')

assert.match(sitemap, /<loc>https:\/\/enricodeleo\.com\/<\/loc>/, 'sitemap should include Italian home')
assert.match(sitemap, /<loc>https:\/\/enricodeleo\.com\/en<\/loc>/, 'sitemap should include English home')
assert.match(sitemap, /hreflang="it-IT" href="https:\/\/enricodeleo\.com\/"/, 'home should include Italian hreflang')
assert.match(sitemap, /hreflang="en" href="https:\/\/enricodeleo\.com\/en"/, 'home should include English hreflang')
assert.match(sitemap, /hreflang="x-default" href="https:\/\/enricodeleo\.com\/"/, 'home should include x-default hreflang')

for (const page of pages) {
  assert.match(sitemap, new RegExp(`<loc>https://enricodeleo\\.com/${page}</loc>`), `sitemap should include /${page}`)
  assert.match(sitemap, new RegExp(`<loc>https://enricodeleo\\.com/en/${page}</loc>`), `sitemap should include /en/${page}`)
}

const outputAssets = join(root, '.output/public/_nuxt')
if (existsSync(outputAssets)) {
  const emittedAssets = await readdir(outputAssets)
  assert.equal(
    emittedAssets.some(asset => /sqlite|\.wasm$/i.test(asset)),
    false,
    'client assets should not include Nuxt Content SQLite/WASM runtime',
  )
}
