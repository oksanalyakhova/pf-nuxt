import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, store }) => {
  app.i18n = new VueI18n({ // construction a new VueI18n
    locale: store.state.locale,
    fallbackLocale: 'en', // default
    messages: {
      //'locales' directory contains all the translations in the form of json files
      'ua': require('~/locales/ua.json'),
      'en': require('~/locales/en.json')
    }
  })

  app.i18n.path = (link) => {
    let separator = link && link.indexOf('/') === 0 ? '' : '/';

    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `${separator}${link}`
    }

    if(link === '/') // remove trailing slash for homepage
      link = '';

    // prevent double locale
    if(link === app.i18n.locale
      || link === ('/' + app.i18n.locale)
      || link.indexOf(app.i18n.locale + '/') === 0
      || link.indexOf('/' + app.i18n.locale + '/') === 0) {
      return `${separator}${link}`
    }

    return `/${app.i18n.locale}${separator}${link}`
  }
}
