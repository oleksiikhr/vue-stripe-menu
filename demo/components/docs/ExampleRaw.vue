<template>
  <vsm-menu :menu="menu">
    <template #default="data">
      <div>{{ data }}</div>
    </template>
    <template #after-nav>
      <vsm-mob>Mobile Content</vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
export default {
  data () {
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
