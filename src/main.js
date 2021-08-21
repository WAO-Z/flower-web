import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _axios from './utils/_axios'

Vue.config.productionTip = false
Vue.prototype._axios = _axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
