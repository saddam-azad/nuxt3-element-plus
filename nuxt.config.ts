// import Components from 'unplugin-vue-components/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite'

export default defineNuxtConfig({
  // css
  css: ['element-plus/dist/index.css'],

  // build
  build: {
    transpile: ['element-plus/es'],
  },

  vite: {
    plugins: [
      // Components({
      //   dts: true,
      //   resolvers: [ElementPlusResolver()],
      // }),
      ElementPlus()
    ],
  },

  // build modules
  modules: ['@pinia/nuxt'],

  // auto import components
  components: true,
});
