'use strict'

// Import Vue components
import VsmMenu from './components/Menu'
import VsmMob from './components/Mob'

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
    Vue.component('VsmMenu', VsmMenu)
    Vue.component('VsmMob', VsmMob)
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

export { VsmMenu, VsmMob }

// To allow use as module (npm/webpack/etc.) export component
export default plugin
