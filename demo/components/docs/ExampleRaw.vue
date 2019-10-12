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
