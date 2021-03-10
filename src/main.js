import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import ElementUI from 'element-ui'
import Vue from 'vue'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
