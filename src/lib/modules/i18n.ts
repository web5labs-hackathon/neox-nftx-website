import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

export const AvailableLocales = ['en', 'zh'] as const
export type AvailableLocale = typeof AvailableLocales[number]

const i18n = createI18n({
  locale: '',
  fallbackLocale: 'en',
  availableLocales: AvailableLocales,
  legacy: false,
  messages: {},
})

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.json'))
    .map(([path, loadLocale]) => {
      return [path.match(/([\w-]*)\.json/)?.[1], loadLocale]
    }),
) as Record<AvailableLocale, () => Promise<{ default: Record<string, string> }>>

const loadedLanguages: string[] = []

function setI18nLanguage(lang: AvailableLocale) {
  i18n.global.locale.value = lang as any
  localStorage.setItem('app-locale', lang)
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export function getI18nInstance() {
  return i18n.global
}

export async function loadLanguageAsync(lang: AvailableLocale): Promise<AvailableLocale> {
  // If the same language
  if (i18n.global.locale.value === lang)
    return setI18nLanguage(lang)

  // If the language was already loaded
  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang)

  // If the language hasn't been loaded yet
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export function install(app: App) {
  app.use(i18n)

  const storagedLocale = localStorage.getItem('app-locale')

  if (storagedLocale && new Set<string>(AvailableLocales).has(storagedLocale)) {
    loadLanguageAsync(storagedLocale as AvailableLocale)
  }
  else {
    loadLanguageAsync('en')
  }
}
