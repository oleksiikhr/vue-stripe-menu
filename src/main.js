'use strict'

// Import Vue components
import vsmMenu from './components/Menu'
import vsmMob from './components/Mob'

// Import scss
import './scss/index.scss'

// Create module definition for Vue.use()
const plugin = {
  // Declare install function executed by Vue.use()
  install: (Vue) => {
    if (plugin.installed) {
      return
    }

    plugin.installed = true

    // Components
    Vue.component('vsmMenu', vsmMenu)
    Vue.component('vsmMob', vsmMob)
  }
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default plugin
