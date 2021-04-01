import config from '@/config';

export const state = () => ({
  locales: config.ALLOWED_LOCALES,
  locale: null
})

export const mutations = {
  SET_LANG (
    state: {locales: string | any[]; locale: any}, locale: any
  ) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}

export const getters = {
  GET_LOCALE (
    state: {locale: any}
  ) {
    return state.locale
  }
}
