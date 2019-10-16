# Vue Stripe Menu

> Create a dropdown like on Stripe

[Demo Project](https://alexeykhr.github.io/vue-stripe-menu/)

## How to install

```shell script
$ npm i vue-stripe-menu
// or
$ yarn add vue-stripe-menu
```

```vue
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

### Attributes

| Property             | Parameters | Description                                                       | Type           | Default | Required |
| -------------------- |----------- | ----------------------------------------------------------------- | ---------------| ------- | -------- |
| menu                 | MenuObject | Description of the menu items, see below                          | Array          |         | true     |
| element              |            | HTML element for root element                                     | String         | header  | false    |
| base-width           |            | The relationship between the width of the content and this value  | string, number | header  | false    |
| base-height          |            | The relationship between the height of the content and this value | string, number | header  | false    |
| screen-offset        |            | Offset from the window screen                                     | string, number | header  | false    |

### Events

| Name           | Description                                            | Return  |
| -------------- | ------------------------------------------------------ | ------- |
| open-dropdown  | Open the dropdown menu, return the active DOM Element  | Element |
| close-dropdown | Close the dropdown menu, return the active DOM Element | Element |

### Slots

| Name       | Parameters      | Description                                          |
| ---------- | --------------- | ---------------------------------------------------- |
| default    | MenuItem, index | The main content for the drop-down list (slot-scope) |
| before-nav | before-nav      | Content to the left of the list                      |
| after-nav  | after-nav       | Content to the right of the list                     |

### MenuObject (menu props)

| Property   | Type   | Description                                                                          |
| ---------- | ------ | ------------------------------------------------------------------------------------ |
| title      | String | Menu item name. Can also be redefined through the slot                               |
| dropdown   | String | Unique value indicates that this item has a dropdown menu                            |
| element    | String | HTML element in the header element, if not specified, it will be <button /> or <a /> |
| attributes | Object | All attributes to be assigned in the header element (v-bind)                         |
| listeners  | Object | All events to be assigned in the header element (v-on)                               |

## Contributing

### Launch of a demo project (development of lib)
```
npm run dev
```

### Build a demo project
```
npm run build
```

### Build library
```
npm run build:lib
```

### Check code on eslint
```
npm run lint
```

## Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/alexeykhr/vuejs-stripe-menu/blob/master/CHANGELOG.md).

## License

[MIT](https://opensource.org/licenses/MIT)
