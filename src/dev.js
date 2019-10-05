'use strict'

import Vue from 'vue'
import vsmMenu from './prod'
import App from './App'

Vue.component('vsmMenu', vsmMenu)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
