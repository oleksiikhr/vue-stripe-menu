<template>
  <vsm-menu ref="header" :menu="menu" v-bind="$attrs">
    <template #before-nav>
      <li class="vsm-mob-full">
        <stripe-logo />
      </li>
    </template>
    <template #default="{ item }">
      <component :is="item.component" />
    </template>
    <template #after-nav>
      <li class="vsm-mob-hide">Sign in</li>
      <vsm-mob>
        <mobile-content />
      </vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
import DevelopersContent from './content/DevelopersContent.vue';
import ProductsContent from './content/ProductsContent.vue';
import CompanyContent from './content/CompanyContent.vue';
import StripeLogo from './svg/StripeLogo.vue';
import MobileContent from './content/MobileContent.vue';

export default {
  components: {
    StripeLogo,
    MobileContent,
    CompanyContent,
    DevelopersContent,
    ProductsContent,
  },
  inheritAttrs: false,
  data() {
    return {
      menu: [
        { title: 'Company', dropdown: 'company', component: 'CompanyContent' },
        { title: 'Developers', dropdown: 'developers', component: 'DevelopersContent' },
        { title: 'Products', dropdown: 'products', component: 'ProductsContent' },
        {
          title: 'Source',
          attributes: {
            href: 'https://github.com/Alexeykhr/vue-stripe-menu/blob/main/docs/src/components/BaseHeader.vue',
            target: '_blank',
          },
        },
      ],
    };
  },
};
</script>
