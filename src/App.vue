<template>
  <vsm-menu :menu="menu">
    <template #default="data">
      <div>Some content</div>
    </template>
  </vsm-menu>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        { title: 'Products', height: '200px', dropdown: 'products' },
        { title: 'Developers', dropdown: 'developers' },
        { title: 'Company', dropdown: 'company' },
        { title: 'Pricing', attributes: { href: '/pricing' } }
      ]
    }
  }
}
</script>
