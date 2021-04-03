<template>
  <vsm-menu
    :menu="menu"
    element="header"
    handler="hover"
    :screen-offset="10"
    @open-dropdown="onOpenDropdown"
    @close-dropdown="onCloseDropdown"
  >
    <template #default="{ item }">
      <!--Dropdown Content-->
      <!--You can replace it with a separate component if each menu item has its own style-->
      <div class="wrap-content">
        <div class="wrap-content__block">
          Header: {{ item.title }}
        </div>
        <div class="wrap-content__item">
          {{ item }}
        </div>
      </div>
    </template>
    <template #before-nav>
      <!--Image or svg of website logo-->
      <li class="vsm-section logo-section">
        <img
          src="https://vuejs.org/images/logo.png"
          alt="My Logo"
        >
      </li>
    </template>
    <template #title="data">
      <!--Display menu items through slots-->
      {{ data.item.title }}
    </template>
    <template #after-nav>
      <!--Mobile Burger, buttons, etc-->
      <!--For the same styles - add the vsm-section-->
      <li class="vsm-section vsm-mob-hide">
        <button>My Button</button>
      </li>
      <!--Display when user media screen below from $vsm-media (scss)-->
      <vsm-mob>Mobile Content</vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
/* eslint-disable */
/*
 * This is an example of possible settings, you can also control
 * scss variables, and also you need to add a little style.
 * So copy and delete what you don’t need.
 *
 * After #after-nav and #before-nav it is recommended to use
 * to maintain the correct HTML structure:
 *   <li class="vsm-section">
 */

export default {
  data() {
    return {
      menu: [
        {
          // display menu item (or override title slot)
          title: 'News',
          // now this is not a link, but a menu item where there is a dropdown
          dropdown: 'news',
          // don't want a button element?
          element: 'span', // router-link
          // menu item can accept all attributes
          attributes: {
            // I want more classes! No problem
            // string, array, object, not matter
            class: ['my-class1', { 'my-class2': true }],
            // Custom attributes
            'data-big': 'yes'
          },
          // add some events?
          listeners: {
            // all possible native events
            mouseover: (evt) => {
              console.log('news hover', evt)
            }
          },
          // just extra properties in the object
          new_section: false,
        },
        {
          title: 'External Link',
          attributes: {
            href: 'https://github.com/Alexeykhr/vue-stripe-menu',
            target: '_blank'
          }
        }
        // ...
      ]
    }
  },
  methods: {
    onOpenDropdown() {
      console.log('onOpenDropdown')
    },
    onCloseDropdown() {
      console.log('onCloseDropdown')
    }
  }
}
</script>
