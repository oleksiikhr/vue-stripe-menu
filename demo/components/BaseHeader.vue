<template>
  <vsm-menu
    ref="header"
    :menu="menu"
    :handler="handler"
    :screen-offset="screenOffset"
    :disable-window-resize-handler="disableWindowResizeHandler"
    @open-dropdown="onOpenDropdown"
    @close-dropdown="onCloseDropdown"
  >
    <template #before-nav>
      <li class="vsm-section vsm-mob-full">
        <stripe-logo />
      </li>
    </template>
    <template #default="{ item }">
      <component :is="item.component" />
    </template>
    <template #after-nav>
      <li class="vsm-section vsm-mob-hide">
        Sign in
      </li>
      <vsm-mob>
        <mobile-content />
      </vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
import DevelopersContent from './content/DevelopersContent'
import ProductsContent from './content/ProductsContent'
import CompanyContent from './content/CompanyContent'
import StripeLogo from '../components/svg/StripeLogo'
import MobileContent from './content/MobileContent'

/* eslint-disable no-console */

export default {
  components: {
    StripeLogo, MobileContent, CompanyContent, DevelopersContent, ProductsContent
  },
  props: {
    handler: {
      type: String,
      default: 'hover'
    },
    screenOffset: {
      type: Number,
      default: 10
    },
    disableWindowResizeHandler: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menu: [
        { title: 'Company', dropdown: 'company', component: 'CompanyContent', listeners: { mouseover: this.onMouseOver } },
        { title: 'Developers', dropdown: 'developers', component: 'DevelopersContent' },
        { title: 'Products', dropdown: 'products', component: 'ProductsContent', element: 'span' },
        { title: 'Source', attributes: { href: 'https://github.com/Alexeykhr/vue-stripe-menu/blob/master/demo/components/BaseHeader.vue', class: ['some-class1', { 'some-class2': true }], target: '_blank' } }
      ]
    }
  },
  methods: {
    onMouseOver(evt) {
      console.log('mouseover', evt)
    },
    onOpenDropdown(el) {
      console.log('open dropdown', el)
    },
    onCloseDropdown(el) {
      console.log('close dropdown', el)
    }
  }
}
</script>

<style lang="scss">
.vsm-menu {
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  > nav {
    margin: 0 10px;
  }
}

.vsm-root {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vsm-section_menu {
  flex: 1 1 auto;
  justify-content: center;
  > * {
    padding: 0 25px;
  }
}

@media screen and (max-width: 768px) {
  .vsm-mob-show {
    display: block;
  }
  .vsm-mob-hide {
    display: none;
  }
  .vsm-mob-full {
    flex-grow: 1;
  }
}
</style>
