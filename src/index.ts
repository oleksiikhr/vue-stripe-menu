import Vue from 'vue';
import VsmMenu from './components/Menu';
import VsmMob from './components/Mob';
import './scss/index.scss';

function install(vue: typeof Vue): void {
  vue.component(VsmMenu.name, VsmMenu);
  vue.component(VsmMob.name, VsmMob);
}

export { VsmMenu };

export default { install };
