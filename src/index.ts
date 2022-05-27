import { App } from 'vue';
import VsmMenu from './components/Menu.vue';
import VsmMob from './components/Mob.vue';
import './scss/index.scss';

function install(Vue: App): void {
  Vue.component(VsmMenu.name, VsmMenu);
  Vue.component(VsmMob.name, VsmMob);
}

export { VsmMenu, VsmMob };

export default { install };
