'use strict';

import { App } from 'vue';
import * as components from './components';
import './scss/index.scss';

function install(Vue: App): void {
  for (const key in components) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const component = (components as any)[key];

    Vue.component(component.name, component);
  }
}

export * from './components';

export default { install };
