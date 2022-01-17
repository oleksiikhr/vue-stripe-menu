'use strict'

import VsmMenu from './components/Menu.vue'
import VsmMob from './components/Mob.vue'

import { App } from 'vue'
import './scss/index.scss'

const components = [VsmMenu, VsmMob]

function install(Vue: App) {
  for (const component of components) {
    Vue.component(component.name, component)
  }
}

export default { install }

export { default as VsmMenu } from './components/Menu.vue'
export { default as VsmMob } from './components/Mob.vue'
