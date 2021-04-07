'use strict'

import { createApp } from 'vue'

// -> Production
// import VueStripeMenu from '../dist/vue-stripe-menu.umd.min'
// import '../dist/vue-stripe-menu.css'
// -> Demo
import VueStripeMenu from '../src/main'

import './scss/index.scss'
import App from './App'

createApp(App)
  .use(VueStripeMenu)
  .mount('#app')
