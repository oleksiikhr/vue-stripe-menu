# Vue Stripe Menu

<p>
  <a href="https://github.com/oleksiikhr/vue-stripe-menu/actions/workflows/release.yml" rel="nofollow"><img src="https://github.com/oleksiikhr/vue-stripe-menu/actions/workflows/release.yml/badge.svg" alt="Build Status"></a>
  <a href="https://app.netlify.com/sites/vue-stripe-menu/deploys" rel="nofollow"><img src="https://api.netlify.com/api/v1/badges/4865304f-e368-4f24-9242-dad6d3176e5c/deploy-status" alt="Netlify Status"></a>
  <a href="https://www.npmjs.com/package/vue-stripe-menu" rel="nofollow"><img src="https://img.shields.io/npm/v/vue-stripe-menu.svg" alt="Version"></a>
  <a href="https://lgtm.com/projects/g/oleksiikhr/vue-stripe-menu/alerts/" rel="nofollow"><img src="https://img.shields.io/lgtm/alerts/g/oleksiikhr/vue-stripe-menu.svg?logo=lgtm&logoWidth=18" alt="Total alerts"></a>
  <a href="https://npmcharts.com/compare/vue-stripe-menu?minimal=true"><img src="https://img.shields.io/npm/dm/vue-stripe-menu.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-stripe-menu" rel="nofollow"><img src="https://img.shields.io/npm/l/vue-stripe-menu.svg" alt="License"></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/oleksiikhr/vue-stripe-menu/main/docs/images/stripe.png?raw=true" alt="Vue Stripe Menu" height="500px">
</p>

> Creating a navigation menu with animations like on Stripe

**Only for Vue 3** ([changelog](https://github.com/oleksiikhr/vue-stripe-menu/blob/main/CHANGELOG.md#200-2021-04-09))

[Documentation](https://oleksiikhr.github.io/vue-stripe-menu/)

[Vue 2 - Branch](https://github.com/oleksiikhr/vue-stripe-menu/tree/vue2)

## How to install

Install the library in your project:

```shell
$ npm i -D vue-stripe-menu

// $ yarn add -D vue-stripe-menu
// $ pnpm add -D vue-stripe-menu
```

Import components:

```js
// >>> Install globally - .js file <<<

import { createApp } from 'vue'
import VueStripeMenu from 'vue-stripe-menu'

createApp({}).use(VueStripeMenu)

// >>> Install locally - .vue file <<<

import { VsmMenu, VsmMob } from 'vue-stripe-menu'

export default {
  components: {
    VsmMenu, VsmMob
  }
}
```

Add the component:

```vue
<template>
  <vsm-menu :menu="menu">
    <template #default="{ item }">
      <div style="width: 300px; padding: 30px">
        Dropdown content - {{ item.title }}
      </div>
    </template>
    <template #before-nav>
      <li class="vsm-mob-full">
        Left side
      </li>
    </template>
    <template #after-nav>
      <li class="vsm-mob-hide">
        Right side
      </li>
      <vsm-mob>
        <div style="min-height: 200px; padding: 30px">
          Mobile Content
        </div>
      </vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { title: 'Item1', dropdown: 'dropdown-1' },
        { title: 'Item2', dropdown: 'dropdown-2' },
        { title: 'Just link', attributes: { href: '#clicked' } },
      ]
    }
  }
}
</script>
```

Add css/scss styles:

```scss
// >>> SCSS style (required sass-loader, node-sass) <<<
// https://github.com/oleksiikhr/vue-stripe-menu/blob/main/src/scss/_variables.scss
// $vsm-transition: .5s;

@import "~vue-stripe-menu/src/scss/index";

// >>> CSS style <<<
// @import 'vue-stripe-menu/dist/vue-stripe-menu.css';

.vsm-menu {
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
}

.vsm-nav {
  margin: 0 10px;
}

.vsm-link-container {
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
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
```

## Full Example

```vue
<template>
  <vsm-menu
    :menu="menu"
    element="header"
    handler="hover"
    align="center"
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
      <li style="width: 50px; height: 50px">
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
      <li class="vsm-mob-hide">
        <button>My Button</button>
      </li>
      <!--Set "display: block" for the .vsm-mob-show class to display content-->
      <vsm-mob>Mobile Content</vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
/*
 * Inside #after-nav and #before-nav it is recommended to use
 * to maintain the correct HTML structure:
 *   <li><!--Content--></li>
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
          // don't want a button element? Pass HTMLElement or global component
          // (pass only as a string, component must be globally accessible)
          element: 'span', // div, router-link, nuxt-link, custom-component
          // offset the position of the dropdown menu
          align: 'center',
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
          customAttribute: true,
        },
        {
          title: 'External Link',
          attributes: {
            href: 'https://github.com/oleksiikhr/vue-stripe-menu',
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
```

## API

### [Menu] Props

| Property           | Parameters          | Description                                         | Type           | Default | Required |
|--------------------|---------------------|-----------------------------------------------------|----------------|---------|----------|
| menu               | MenuObject          | Description of the menu items                       | array          |         | true     |
| element            |                     | HTMLElement for the root element                    | string         | header  | false    |
| screen-offset      |                     | Offset from the window screen                       | string, number | header  | false    |
| dropdown-offset    |                     | Offset from the dropdown menu                       | string, number | header  | false    |
| transition-timeout |                     | Animation speed in ms (equals $vsm-transition scss) | string, number | 250     | false    |
| handler            | hover, click        | On what event to open dropdown menu                 | string         | hover   | false    |
| align              | center, left, right | Offset the position of the dropdown menu            | string         | center  | false    |

### [Menu] Events

| Name           | Description                                            | Return      |
|----------------|--------------------------------------------------------|-------------|
| open-dropdown  | Open the dropdown menu, return the active HTMLElement  | HTMLElement |
| close-dropdown | Close the dropdown menu, return the closed HTMLElement | HTMLElement |

### [Menu] Slots

| Name       | Parameters      | Description                                        |
|------------|-----------------|----------------------------------------------------|
| default    | MenuItem, index | The main content for the dropdown list             |
| before-nav | before-nav      | Content to the left of the list                    |
| after-nav  | after-nav       | Content to the right of the list                   |
| title      | MenuItem, index | Replace the output of menu\[i].title with your own |

### [Menu] Methods

`this.$refs[myVsmRef].closeDropdown()`

| Name           | Parameters  | Description                                                | Return |
|----------------|-------------|------------------------------------------------------------|--------|
| toggleDropdown | HTMLElement | Open dropdown menu, if it is an active HTMLElement - close |        |
| openDropdown   | HTMLElement | Open dropdown menu for selected HTMLElement                |        |
| closeDropdown  |             | Close active dropdown menu                                 |        |
| resizeDropdown |             | Recalculate size and location of dropdown menu             |        |

### [Menu] Properties

`this.$refs[myVsmRef].itemsWithDropdown`

| Name                   | Description                                     | Return                                                       |
|------------------------|-------------------------------------------------|--------------------------------------------------------------|
| itemsWithDropdown      | Filtered menu items with "dropdown" property    | Array\<MenuObject>                                           |
| elementsWithDropdown   | List of HTMLElements that have dropdown content | Array\<MenuObject>                                           |
| dropdownContainerItems | List of dropdown HTMLElements                   | Array<{el: HTMLElement, name: string, content: HTMLElement}> |

### [Menu] MenuObject (menu props)

| Property   | Type   | Description                                                                                             |
|------------|--------|---------------------------------------------------------------------------------------------------------|
| title      | string | Menu item name. Can also be redefined through the slot                                                  |
| dropdown   | string | Unique value indicates that this item has a dropdown menu                                               |
| align      | string | Offset the position of the dropdown menu (center/left/right)                                            |
| element    | string | HTMLElement or global component in the header element, if not specified, it will be <button /> or <a /> |
| attributes | object | All attributes to be assigned in the header element (v-bind)                                            |
| listeners  | object | All events to be assigned in the header element (v-on)                                                  |

### [Mob] Props

| Property | Parameters | Description                          | Type    | Default | Required |
|----------|------------|--------------------------------------|---------|---------|----------|
| v-model  |            | The state of the open/close the menu | boolean | false   | false    |

### [Mob] Slots

| Name      | Parameters | Description              |
|-----------|------------|--------------------------|
| default   |            | Main content             |
| hamburger |            | Replace hamburger button |
| close     |            | Replace close button     |

### [Mob] Methods

`this.$refs[myVsmMobRef].closeDropdown()`

| Name          | Parameters | Description         | Return |
|---------------|------------|---------------------|--------|
| closeDropdown |            | Close dropdown menu |        |

### Classes

| Name         | Description                        |
|--------------|------------------------------------|
| vsm-mob-show | Show HTMLElements in mobile design |
| vsm-mob-hide | Hide HTMLElements in mobile design |

## Contributing

Please make sure to read the [Contributing Guide](https://github.com/oleksiikhr/vue-stripe-menu/blob/main/.github/CONTRIBUTING.md) before making a pull request.

## Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/oleksiikhr/vue-stripe-menu/blob/main/CHANGELOG.md).

## License

[MIT](https://opensource.org/licenses/MIT)
