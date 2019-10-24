<template>
  <vsm-menu
    :menu="menu"
    @open-dropdown="onOpenDropdown"
    @close-dropdown="onCloseDropdown"
  >
    <li
      slot="before-nav"
      class="vsm-section"
    >
      <stripe-logo />
    </li>
    <!--Add a title using the slot:-->
    <!--<template #title="data">{{ data.item.title }}</template>-->
    <template #default="data">
      <component
        :is="data.item.content"
        class="content"
      />
      <component
        :is="data.item.secondary"
        class="content--secondary"
      />
    </template>
    <template slot="after-nav">
      <li class="vsm-section">Sign In</li>
      <vsm-mob />
    </template>
  </vsm-menu>
</template>

<script>
import HorizontalSecondaryContent from '../components/content/HorizontalSecondary'
import HorizontalPrimaryContent from '../components/content/HorizontalPrimary'
import VerticalContent from '../components/content/Vertical'
import DefaultContent from '../components/content/Default'
import StripeLogo from '../components/svg/StripeLogo'

/* eslint-disable no-console */

export default {
  components: {
    StripeLogo
  },
  data () {
    return {
      menu: [
        { title: 'Company', dropdown: 'company', content: DefaultContent, listeners: { mouseover: this.onMouseOver } },
        { title: 'Developers', dropdown: 'developers', content: HorizontalPrimaryContent, secondary: HorizontalSecondaryContent },
        { title: 'Products', dropdown: 'products', content: VerticalContent, element: 'span' },
        { title: 'Source', attributes: { href: 'https://github.com/Alexeykhr/vue-stripe-menu/blob/master/demo/components/BaseHeader.vue', target: '_blank' } }
      ]
    }
  },
  methods: {
    onMouseOver (evt) {
      console.log('mouse over', evt)
    },
    onOpenDropdown (el) {
      console.log('open dropdown', el)
    },
    onCloseDropdown (el) {
      console.log('close dropdown', el)
    }
  }
}
</script>

<style lang="scss">
@import "../scss/variables";

/*
 * Override some styles for library
 */

.vsm-menu {
  position: relative;
  nav {
    margin: 0 10px;
  }
  ul {
    max-width: $laptop;
    margin: 0 auto;
  }
}

.vsm-root {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vsm-section_menu {
  flex: 1;
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

/*
 * Now add some styles for own classes
 */

.content {
  padding: 30px;
}

.content--secondary {
  padding: 30px;
}
</style>
