<template>
  <vsm-menu :menu="menu" v-bind="$attrs">
    <template #default="{ item }">
      <component :is="item.content" class="content" />
    </template>
    <template #before-nav>
      <li class="vsm-mob-full" style="flex: 1 1 auto">
        <a href="#figma">
          <svg viewBox="0 0 38 57" width="38px">
            <title>Figma</title>
            <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"></path>
            <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"></path>
            <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"></path>
            <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"></path>
            <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"></path>
          </svg>
        </a>
      </li>
    </template>
    <template #after-nav>
      <li class="vsm-mob-hide">Sign in</li>
      <vsm-mob>
        <div class="mobile-content">Mobile Content</div>
      </vsm-mob>
    </template>
  </vsm-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      menu: [
        {
          title: 'Products',
          dropdown: 'products',
          component: 'ProductsContent',
        },
        {
          title: 'Enterprise',
          dropdown: 'enterprise',
          component: 'EnterpriseContent',
        },
        {
          title: 'Pricing',
          attributes: {
            href: '#pricing',
          },
        },
        {
          title: 'Community',
          dropdown: 'community',
          component: 'CommunityContent',
        },
        {
          title: 'Company',
          dropdown: 'company',
          component: 'CompanyContent',
        },
      ],
    };
  },
});
</script>
