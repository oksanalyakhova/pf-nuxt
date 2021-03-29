import config from '@/config';

export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale;
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;

  let langs = config.ALLOWED_LOCALES.join('|');
  let pathRes = route.fullPath.match(new RegExp("^\/(" + langs + ")\/?"));
  let pathLocale = pathRes && pathRes.length >= 2 ? pathRes[1] : null;

  const locale = pathLocale || route.query && route.query.lang || params.lang || store.state.locale || defaultLocale;
  if (store.state.locales.indexOf(locale) === -1) {
    return error({message: 'errors.not-found', statusCode: 404})
  }

  //Mutate the store's locale once we understand which locale is being requested prior to each page render
  store.commit('SET_LANG', locale);
  // Set locale from the query string '?lang='**''
  app.i18n.locale = store.state.locale;

  // If route is /<defaultLocale>/... -> redirect to /...
  if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale + '/') === 0) {
    const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '')
    const re = new RegExp(toReplace)
    return redirect(
      route.fullPath.replace(re, '/')
    )
  }
}
