<template>
  <base-header v-bind="vsmProps" />
  <main>
    <conf-menu-docs @on-css="onChangeCss" @change-props="onChangeProps" />
    <install-docs :css="css" :vsm-props="vsmProps" />
    <full-example-docs />
    <properties-docs
      v-for="property in properties"
      :key="property.title"
      v-bind="property"
    />
  </main>
  <base-footer />
</template>

<script>
import FullExampleDocs from './components/docs/FullExample.vue';
import PropertiesDocs from './components/docs/Properties.vue';
import ConfMenuDocs from './components/docs/ConfMenu.vue';
import InstallDocs from './components/docs/Install.vue';
import BaseHeader from './components/BaseHeader.vue';
import BaseFooter from './components/BaseFooter.vue';

import * as menuEvents from './docs/menu/events';
import * as menuObject from './docs/menu/menuObject';
import * as menuMethods from './docs/menu/methods';
import * as menuProperties from './docs/menu/properties';
import * as menuProps from './docs/menu/props';
import * as menuSlots from './docs/menu/slots';
import * as mobMethods from './docs/mob/methods';
import * as mobProps from './docs/mob/props';
import * as mobSlots from './docs/mob/slots';
import * as classes from './docs/classes';

export default {
  components: {
    FullExampleDocs,
    PropertiesDocs,
    ConfMenuDocs,
    InstallDocs,
    BaseHeader,
    BaseFooter,
  },
  setup() {
    const properties = [
      menuProps,
      menuObject,
      menuEvents,
      menuSlots,
      menuMethods,
      menuProperties,
      mobProps,
      mobSlots,
      mobMethods,
      classes,
    ];

    return { properties };
  },
  data() {
    return {
      css: '',
      vsmProps: {},
    };
  },
  methods: {
    onChangeProps(obj) {
      this.vsmProps = obj;
    },
    onChangeCss(val) {
      this.css = val;
    },
  },
};
</script>
