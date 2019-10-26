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

```sh
$ npm i vue-stripe-menu
// or
$ yarn add vue-stripe-menu
```

```js
import Vue from 'Vue'
import VueStripeMenu from 'vue-stripe-menu'

Vue.use(VueStripeMenu)

// Import styles
import 'vue-stripe-menu/dist/vue-stripe-menu.css'
```

## Basic Demo

```vue
<template>
  <vsm-menu :menu="menu">
    <template #default="data">
      <div>{{ data }}</div>
    </template>
    <template slot="after-nav">
      <vsm-mob>Mobile Content</vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { title: 'First item', dropdown: 'first' },
        { title: 'Second item', dropdown: 'second' },
        { title: 'No dropdown' }
      ]
    }
  }
}
</script>
```

## Advanced Demo

Code for creating a menu as on a demo: [Link](https://github.com/Alexeykhr/vue-stripe-menu/blob/master/demo)

## API

### [Menu] Props

| Property             | Parameters | Description                                                       | Type           | Default | Required |
| -------------------- | ---------- | ----------------------------------------------------------------- | -------------- | ------- | -------- |
| menu                 | MenuObject | Description of the menu items, see below                          | Array          |         | true     |
| element              |            | HTML element for root element                                     | String         | header  | false    |
| base-width           |            | The relationship between the width of the content and this value  | string, number | header  | false    |
| base-height          |            | The relationship between the height of the content and this value | string, number | header  | false    |
| screen-offset        |            | Offset from the window screen                                     | string, number | header  | false    |

### [Menu] Events

| Name           | Description                                            | Return  |
| -------------- | ------------------------------------------------------ | ------- |
| open-dropdown  | Open the dropdown menu, return the active DOM Element  | Element |
| close-dropdown | Close the dropdown menu, return the active DOM Element | Element |

### [Menu] Slots

| Name       | Parameters      | Description                                         |
| ---------- | --------------- | --------------------------------------------------- |
| default    | MenuItem, index | The main content for the dropdown list (slot-scope) |
| before-nav | before-nav      | Content to the left of the list                     |
| after-nav  | after-nav       | Content to the right of the list                    |

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

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/alexeykhr/vuejs-stripe-menu/blob/master/CHANGELOG.md).

## License

[MIT](https://opensource.org/licenses/MIT)
