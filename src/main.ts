import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Unicon from 'vue-unicons'
// @ts-ignore
import { uniImageUpload } from 'vue-unicons/src/icons'

Vue.config.productionTip = false

Unicon.add([uniImageUpload])
Vue.use(Unicon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
