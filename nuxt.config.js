export default {
  ssr: false,
  head: {
    title: 'OLyakhova',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },]
  },
  css: [
  ],
  plugins: [
    'plugins/i18n.js',
    'plugins/vue-fragment'
  ],
  router: {
    middleware: ['i18n'],
    routeNameSplitter: '/',
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-current',

    extendRoutes (routes, resolve) {
      let setLangAlias = function(route, parentPath = '') {
        if(route.alias) {
          if ((typeof route.alias).toLowerCase() === 'string')
            route.alias = [route.alias];
        } else {
          route.alias = [];
        }

        let path = (parentPath && parentPath !== ''
          ? (parentPath.indexOf('/') === 0
            ? ''
            : '/')
          : '')
          + parentPath.replace(/\/$/, '')
          + (route.path === '/'
            ? ''
            : (route.path.indexOf('/') === 0
              ? route.path
              : ('/' + route.path)));

        let aliases = [];
        ['en', 'ua'].forEach(function(lang) {
          if (lang !== 'en')
            aliases.push(('/' + lang + path));
        });
        route.alias = route.alias.concat(aliases);
      };

      routes.forEach(route => {
        setLangAlias(route);
        // for homepage we need to specify children aliases
        if (route.path === '/') {
          let rc = route.children;
          if (rc && rc.length) {
            for (let r in rc) {
              setLangAlias(rc[r], route.path);
              let rcc = rc[r].children;
              if (rcc && rcc.length) {
                for (let c in rcc) {
                  setLangAlias(rcc[c], rc[r].path);
                }
              }
            }
          }
        }
      })
    }
  },
  components: true,
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],
  modules: [
    '@nuxtjs/pwa',
  ],
  build: {
  },
  pwa: {
    icon: {
      source: '/favicon.ico'
    },
    manifest: {
      name: 'OLyakhova Portfolio',
      short_name: 'OLyakhova',
      lang: 'en',
      useWebmanifestExtension: false
    }
  },
  env: {
    baseURL: (process.env.NODE_ENV === 'production' ? 'http//your-url' : 'http://localhost:3000')
  }
}
