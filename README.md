# Vue Stripe Menu
<p>
  <a href="https://circleci.com/gh/Alexeykhr/vue-stripe-menu" rel="nofollow"><img src="https://circleci.com/gh/Alexeykhr/vue-stripe-menu.svg?style=shield" alt="Build Status"></a>
  <a href="https://codecov.io/github/Alexeykhr/vue-stripe-menu?branch=master"><img src="https://img.shields.io/codecov/c/github/Alexeykhr/vue-stripe-menu/dev.svg" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/vue-stripe-menu" rel="nofollow"><img src="https://img.shields.io/npm/v/vue-stripe-menu.svg" alt="Version"></a>
  <a href="https://lgtm.com/projects/g/Alexeykhr/vue-stripe-menu/alerts/" rel="nofollow"><img src="https://img.shields.io/lgtm/alerts/g/Alexeykhr/vue-stripe-menu.svg?logo=lgtm&logoWidth=18" alt="Total alerts"></a>
  <a href="https://npmcharts.com/compare/vue-stripe-menu?minimal=true"><img src="https://img.shields.io/npm/dm/vue-stripe-menu.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-stripe-menu" rel="nofollow"><img src="https://img.shields.io/npm/l/vue-stripe-menu.svg" alt="License"></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Alexeykhr/vue-stripe-menu/master/public/img.png?raw=true" alt="Vue Stripe Menu" height="500px">
</p>

> Create a dropdown like on Stripe

[Demo Project](https://alexeykhr.github.io/vue-stripe-menu/)

## How to install

Install the library in your project

```sh
$ npm i vue-stripe-menu
// or
$ yarn add vue-stripe-menu
```

Then add components to Vue and compiled css styles.

```js
// .js file

import Vue from 'Vue'
import VueStripeMenu from 'vue-stripe-menu'

Vue.use(VueStripeMenu)

// Import build styles
import 'vue-stripe-menu/dist/vue-stripe-menu.css'
```

Or you can change them at compile time (scss). See all available variables:

[List of variables](https://github.com/Alexeykhr/vue-stripe-menu/blob/master/src/scss/_variables.scss)

```scss
// .scss file

// You can resize for "@media only screen":
$vsm-media: 500px;

// Colors:
$vsm-color: #000;
$vsm-color-hover: rgba(0, 0, 0, .9);

// And also you can see the animation in slow motion:
$vsm-transition: 1s;

@import "~vue-stripe-menu/src/scss/index";
```

### Nuxt

Create a new plugin:

```js
// plugins/vue-stripe-menu.js
import Vue from 'vue'
import VueStripeMenu from 'vue-stripe-menu'
import 'vue-stripe-menu/dist/vue-stripe-menu.css'

Vue.use(VueStripeMenu)
```

Connect it:

```js
// nuxt.config.js
export default {
  plugins: [{
    src: '~/plugins/menu'
  }],
}
```

## Basic Demo

```vue
<template>
  <vsm-menu
    :menu="menu"
    :base-width="380"
    :base-height="400"
    :screen-offset="10"
    element="header"
    handler="hover"
    @open-dropdown="onOpenDropdown"
    @close-dropdown="onCloseDropdown"
  >
    <template #default="{ item }">
      <!--Dropdown Content-->
      <!--You can replace it with a separate component if each menu item has its own style-->
      <!--Dynamic Component Example: https://codepen.io/Alexeykhr/pen/YzPKxpX-->
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
          element: 'span',
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

<style lang="scss">
// Styles, to quickly start using the component
// You can delete, change or add your own

// Limit the width to 1024px and center
.vsm-menu {
  margin: 10px;
  ul {
    max-width: 1024px;
    margin: 0 auto;
  }
}

// Let's simplify the work with menu items (logo, menu, buttons, etc)
.vsm-root {
  display: flex;
  align-items: center;
  justify-content: center;
}


// Move all the content to the right and reduce the logo
.logo-section {
  flex: 1 1 auto;
  img {
    user-select: none;
    max-width: 40px;
  }
}

// All menu items (element props: a, button, span, etc) are
// made the same in style
.vsm-section_menu {
  > * {
    padding: 0 25px;
    font-weight: 500;
    font-family: inherit;
  }
}

// Styles for Dropdown Content:
.wrap-content {
  padding: 30px;
  // Set the width manually so that it does not depend
  // on changing content
  width: 400px;
}
.wrap-content__block {
  font-weight: bold;
}
.wrap-content__item {
  font-style: italic;
  font-size: .8rem;
}
</style>
```

## Codepen Demo

[Vue Stripe Menu - Real Demo](https://codepen.io/Alexeykhr/pen/YzPKxpX)

## Advanced Demo

Code for creating a menu as on a demo: [Link](https://github.com/Alexeykhr/vue-stripe-menu/blob/master/demo)

## API

### [Menu] Props

| Property             | Parameters   | Description                                                       | Type           | Default | Required |
| -------------------- | ----------   | ----------------------------------------------------------------- | -------------- | ------- | -------- |
| menu                 | MenuObject   | Description of the menu items, see below                          | Array          |         | true     |
| element              |              | HTML element for root element                                     | String         | header  | false    |
| base-width           |              | The relationship between the width of the content and this value  | string, number | header  | false    |
| base-height          |              | The relationship between the height of the content and this value | string, number | header  | false    |
| screen-offset        |              | Offset from the window screen                                     | string, number | header  | false    |
| handler              | hover, click | What event should you open dropdown for                           | string         | hover   | false    |

### [Menu] Events

| Name           | Description                                            | Return  |
| -------------- | ------------------------------------------------------ | ------- |
| open-dropdown  | Open the dropdown menu, return the active DOM Element  | Element |
| close-dropdown | Close the dropdown menu, return the active DOM Element | Element |

### [Menu] Slots

| Name       | Parameters      | Description                                         |
| ---------- | --------------- | --------------------------------------------------- |
| default    | MenuItem, index | The main content for the dropdown list              |
| before-nav | before-nav      | Content to the left of the list                     |
| after-nav  | after-nav       | Content to the right of the list                    |
| title      | MenuItem, index | Replace the output of menu\[i].title with your own  |

### [Menu] Methods

`this.$refs[myVsmRef].closeDropdown()`

| Name           | Parameters  | Description                          | Return |
| -------------- | ----------- | ------------------------------------ | ------ |
| toggleDropdown | HTMLElement | Open dropdown menu, if open - close  |        |
| openDropdown   | HTMLElement | Open dropdown menu for selected item |        |
| closeDropdown  |             | Close any open dropdown menu         |        |

### [Menu] Properties

`const elements = this.$refs[myVsmRef].hasDropdownEls`

| Name           | Description                                      | Return              |
| -------------- | ------------------------------------------------ | ------------------- |
| hasDropdownEls | List of HTML elements that have dropdown content | Array\<HTMLElement> |
| $refs.links    | List of HTML elements obtained from menu props   | Array\<HTMLElement> |

### [Menu] MenuObject (menu props)

| Property   | Type   | Description                                                                          |
| ---------- | ------ | ------------------------------------------------------------------------------------ |
| title      | String | Menu item name. Can also be redefined through the slot                               |
| dropdown   | String | Unique value indicates that this item has a dropdown menu                            |
| element    | String | HTML element in the header element, if not specified, it will be <button /> or <a /> |
| attributes | Object | All attributes to be assigned in the header element (v-bind)                         |
| listeners  | Object | All events to be assigned in the header element (v-on)                               |

### [Mob] Props

| Property | Parameters | Description                          | Type    | Default | Required |
| -------- | ---------- | ------------------------------------ | ------- | ------- | -------- |
| v-model  |            | The state of the open/close the menu | Boolean | false   | false    |

### [Mob] Slots

| Name       | Parameters | Description                            |
| ---------- | ---------- | -------------------------------------- |
| default    |            | The main content for the dropdown list |
| hamburger  |            | Replace button to open dropdown        |

### [Mob] Methods

`this.$refs[myVsmMobRef].closeDropdown()`

| Name           | Parameters  | Description         | Return |
| -------------- | ----------- | ------------------- | ------ |
| closeDropdown  |             | Close dropdown menu |        |

### Classes

| Name         | Description                         |
| ------------ | ----------------------------------- |
| vsm-mob-hide | Hide HTML elements in mobile design |
| vsm-mob-full | Add flex-grow: 1, see Demo example  |

## Contributing

### Launch of a demo project (development of lib)
```sh
$ npm run dev
```

### Build a demo project
```sh
$ npm run build
```

### Build library
```sh
$ npm run build:lib
```

### Run tests
```sh
$ npm run test
```

### Check code on Eslint
```sh
$ npm run lint
```

## Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/Alexeykhr/vue-stripe-menu/blob/master/CHANGELOG.md).

## License

[MIT](https://opensource.org/licenses/MIT)
