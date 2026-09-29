// Push our URLs to IndexNow (Bing, Yandex, Seznam, Naver). Google does not
// participate, but Bing's index is what backs ChatGPT's search, so this is the
// quickest route to being findable by assistants rather than only by Google.
//
// Requires the key file to be live at https://schema.mx/<KEY>.txt, so run this
// AFTER deploying. Usage: npm run indexnow

const KEY = 'b8125ae999778f126ea37c1febe3c9b0'
const HOST = 'schema.mx'
const ORIGIN = `https://${HOST}`

const URLS = [
  '/',
  '/omega/',
  '/omega/demo/',
  '/scope/',
  '/team/',
  '/projects/',
  '/projects/pricing-consultoras/',
  '/contact/',
].map((p) => ORIGIN + p)

// Verify the key file is actually reachable first — IndexNow silently rejects
// submissions it can't verify, which is indistinguishable from success.
const keyUrl = `${ORIGIN}/${KEY}.txt`
const keyRes = await fetch(keyUrl).catch(() => null)
const keyBody = keyRes?.ok ? (await keyRes.text()).trim() : null

if (keyBody !== KEY) {
  console.error(`✗ Key file not verifiable at ${keyUrl}`)
  console.error(`  status=${keyRes?.status ?? 'unreachable'} body=${JSON.stringify(keyBody)}`)
  console.error('  Deploy first, then re-run. IndexNow ignores unverifiable submissions.')
  process.exit(1)
}
console.log(`✓ Key verified at ${keyUrl}`)

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: keyUrl, urlList: URLS }),
})

// 200 = accepted, 202 = accepted pending key validation.
if (res.ok) {
  console.log(`✓ Submitted ${URLS.length} URLs (HTTP ${res.status})`)
  URLS.forEach((u) => console.log(`    ${u}`))
} else {
  console.error(`✗ IndexNow returned HTTP ${res.status}`)
  console.error(`  ${(await res.text()).slice(0, 300)}`)
  process.exit(1)
}
