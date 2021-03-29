export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
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
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap'},
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
    'plugins/i18n.js',
    { src: '@/plugins/pixi', ssr: false },
  ],

  // router
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

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glslify-loader'
        ]
      });
    },
    transpile: ['three']
  },

  env: {
    baseURL: (process.env.NODE_ENV === 'production' ? 'http//your-url' : 'http://localhost:3000')
  }
}
