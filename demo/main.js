'use strict'

import { createApp } from 'vue'

// -> Production
// import vsmMenu from 'vue-stripe-menu'
// import 'vue-stripe-menu/dist/vue-stripe-menu.css'

// -> Demo
import './scss/index.scss'
import vsmMenu from '../src/main'

import App from './App'

createApp(App)
  .use(vsmMenu)
  .mount('#app')
