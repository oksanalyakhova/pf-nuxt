import config from '@/config';

export const state = () => ({
  locales: config.ALLOWED_LOCALES,
  locale: null
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}
