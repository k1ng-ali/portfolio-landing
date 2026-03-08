import { createI18n } from 'vue-i18n'



export const LOCALES = [
    { code: 'ru', label: 'RU' },
    { code: 'tj', label: 'TJ' },
]

const locale = localStorage.getItem('locale') ?? 'ru'

async function loadLocale(locale: string) {
    return await fetch(`./locales/${locale}.json`).then(r => r.json())
}

const messages = {
    [locale]: await loadLocale(locale)
}

export const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') ?? 'ru',
    fallbackLocale: 'ru',
    warnHtmlMessage: false,
    messages,
})

export async function setLocale(locale: string) {
    if (!i18n.global.availableLocales.includes(locale)) {
        const messages = await loadLocale(locale)
        i18n.global.setLocaleMessage(locale, messages)
    }

    i18n.global.locale.value = locale
    localStorage.setItem('locale', locale)
}
