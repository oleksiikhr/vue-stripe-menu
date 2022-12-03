import Vue from 'vue';
import App from './App.vue';
import VueStripeMenu from '../../src';
import './styles/index.scss';

Vue.use(VueStripeMenu);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
