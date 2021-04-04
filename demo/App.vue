<template>
  <div>
    <base-header v-bind="vsmProps" />
    <main>
      <conf-menu-docs
        @on-css="onChangeCss"
        @change-props="onChangeProps"
      />
      <install-docs :css="css" />
      <full-example-docs />
      <properties-docs
        v-for="property in properties"
        :key="property.title"
        v-bind="property"
      />
    </main>
    <base-footer />
  </div>
</template>

<script>
import FullExampleDocs from './components/docs/FullExample'
import PropertiesDocs from './components/docs/Properties'
import ConfMenuDocs from './components/docs/ConfMenu'
import InstallDocs from './components/docs/Install'
import BaseHeader from './components/BaseHeader'
import BaseFooter from './components/BaseFooter'

import * as menuEvents from './docs/menu/events'
import * as menuObject from './docs/menu/menuObject'
import * as menuMethods from './docs/menu/methods'
import * as menuProperties from './docs/menu/properties'
import * as menuProps from './docs/menu/props'
import * as menuSlots from './docs/menu/slots'
import * as mobMethods from './docs/mob/methods'
import * as mobProps from './docs/mob/props'
import * as mobSlots from './docs/mob/slots'
import * as classes from './docs/classes'

export default {
  components: {
    FullExampleDocs,
    PropertiesDocs,
    ConfMenuDocs,
    InstallDocs,
    BaseHeader,
    BaseFooter
  },
  setup() {
    const properties = [
      menuEvents, menuMethods, menuProperties, menuProps, menuObject,
      menuSlots, mobMethods, mobProps, mobSlots, classes
    ]

    return { properties }
  },
  data() {
    return {
      css: '',
      vsmProps: {}
    }
  },
  methods: {
    onChangeProps(obj) {
      this.vsmProps = obj
    },
    onChangeCss(val) {
      this.css = val
    }
  }
}
</script>
