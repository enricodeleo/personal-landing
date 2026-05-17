import { existsSync, readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { cwd } from 'node:process'
import assert from 'node:assert/strict'

const root = cwd()
const pages = ['bio', 'cookie-policy', 'privacy-policy']
const locales = ['it', 'en']

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

for (const page of pages) {
  assert.equal(existsSync(join(root, 'app/pages', `${page}.vue`)), false, `${page}.vue should be migrated to content`)
}

const sitemap = readFileSync(join(root, 'static/sitemap.xml'), 'utf8')

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
