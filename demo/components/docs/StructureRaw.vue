<template>
  <vsm-menu
    :menu="menu"
    :base-width="380"
    :base-height="400"
    :screen-offset="10"
    element="header"
  >
    <template #default="data">
      <!--Dropdown Content-->
      <div>{{ data }}</div>
    </template>
    <template slot="before-nav">
      <!--Image or svg of website logo-->
      <img src="/path/to/file" title="My Logo">
    </template>
    <template #title="data">
      <!--Display menu items through slots-->
      {{ data.item.title }}
    </template>
    <template slot="after-nav">
      <!--Mobile Burger, buttons, etc-->
      <li class="vsm-section vsm-mob-hide">
        <button>My Button</button>
      </li>
      <!--Display when user media screen below from $vsm-media (scss)-->
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
