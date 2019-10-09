'use strict'

import Vue from 'vue'

// -> For Demo
import './scss/index.scss'
import vsmMenu from '../src/main'

// -> Import library
// import 'vue-stripe-menu/dist/vue-stripe-menu.css'
// import vsmMenu from 'vue-stripe-menu'

import App from './App'

Vue.component('vsmMenu', vsmMenu)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
