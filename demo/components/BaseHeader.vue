<template>
  <vsm-menu
    ref="header"
    :menu="menu"
    :handler="handler"
    :screen-offset="15"
    @open-dropdown="onOpenDropdown"
    @close-dropdown="onCloseDropdown"
  >
    <template #before-nav>
      <li class="vsm-section vsm-mob-full">
        <stripe-logo />
      </li>
    </template>
    <template #title="{ item }">
      {{ item.title }}
    </template>
    <template #default="{ item }">
      <component
        :is="item.content"
        class="content content--primary"
      />
      <component
        :is="item.secondary"
        class="content content--secondary"
      />
    </template>
    <template #after-nav>
      <li
        class="vsm-section vsm-mob-hide rnd--open"
        @click="onClick"
      >
        on {{ handler }}
      </li>
      <!--Display mobile menu-->
      <vsm-mob>
        <mobile-content />
      </vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
import HorizontalSecondaryContent from '../components/content/HorizontalSecondary'
import HorizontalPrimaryContent from '../components/content/HorizontalPrimary'
import VerticalContent from '../components/content/Vertical'
import DefaultContent from '../components/content/Default'
import StripeLogo from '../components/svg/StripeLogo'
import MobileContent from './content/MobileContent'

/* eslint-disable no-console */

export default {
  components: {
    StripeLogo, MobileContent, DefaultContent, HorizontalPrimaryContent, HorizontalSecondaryContent, VerticalContent
  },
  data() {
    return {
      handler: 'hover',
      menu: [
        { title: 'Company', dropdown: 'company', content: 'DefaultContent', listeners: { mouseover: this.onMouseOver } },
        { title: 'Developers', dropdown: 'developers', content: 'HorizontalPrimaryContent', secondary: 'HorizontalSecondaryContent' },
        { title: 'Products', dropdown: 'products', content: 'VerticalContent', element: 'span' },
        { title: 'Source', attributes: { href: 'https://github.com/Alexeykhr/vue-stripe-menu/blob/master/demo/components/BaseHeader.vue', class: ['some-class1', { 'some-class2': true }], target: '_blank' } }
      ]
    }
  },
  methods: {
    onClick() {
      this.handler = this.handler === 'hover' ? 'click' : 'hover'
    },
    onMouseOver(evt) {
      console.log('mouse over', evt)
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
/* Customizing the library structure like on Stripe */

.vsm-menu {
  position: relative;
  nav {
    margin: 0 10px;
  }
  ul {
    max-width: 1024px;
    margin: 0 auto;
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
    font-weight: 500;
    font-family: inherit;
  }
}

.vsm-link {
  color: #6772e5;
  &.vsm-active,
  &:hover {
    color: #32325d;
  }
}

/* Other styles */

.content {
  padding: 30px;
}

.rnd--open {
  cursor: pointer;
  user-select: none;
}
</style>
