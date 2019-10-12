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
```

## Basic Demo

```vue
<template>
  <vsm-menu :menu="menu">
    <template #default="data">
      {{ data }}
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

How on the site: [Link](https://github.com/Alexeykhr/vue-stripe-menu/blob/master/demo)

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
