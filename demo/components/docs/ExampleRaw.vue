<template>
  <vsm-menu
    :menu="menu"
    element="header"
    handler="hover"
    :screen-offset="10"
    :dropdown-offset="0"
    @open-dropdown="onOpenDropdown"
    @close-dropdown="onCloseDropdown"
  >
    <template #default="{ item }">
      <!--Dropdown content of each menu item with a "dropdown" property-->
      <!--You can replace it with a separate component if each menu item has its own style-->
      <!--Necessarily need to have at least one element within the slot-->
      <!--An alternate background will be applied from the 2nd element-->
      <div style="width: 300px; padding: 30px">
        Header: {{ item }}
      </div>
      <div style="padding: 30px">
        Second element
      </div>
    </template>
    <template #before-nav>
      <!--Image or svg of website logo-->
      <li
        class="vsm-section logo-section"
        style="width: 50px; height: 50px"
      >
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
          // display menu item (can be overridden with title slot)
          title: 'News',
          // this element now has dropdown content
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
