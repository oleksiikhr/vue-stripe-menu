'use strict'

import { createApp } from 'vue'

// -> For Demo
import './scss/index.scss'
import vsmMenu from '../src/main'

// -> Import library js and styles
// import vsmMenu from 'vue-stripe-menu'
// import 'vue-stripe-menu/dist/vue-stripe-menu.css'

import App from './App'

createApp(App)
  .use(vsmMenu)
  .mount('#app')
