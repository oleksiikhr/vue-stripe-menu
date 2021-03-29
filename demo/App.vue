<template>
  <div>
    <base-header />
    <main>
      <install-docs />
      <example-docs />
      <example-codepen-docs />
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
import ExampleCodepenDocs from './components/docs/ExampleCodepen'
import PropertiesDocs from './components/docs/Properties'
import ExampleDocs from './components/docs/Example'
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
    ExampleCodepenDocs,
    PropertiesDocs,
    ExampleDocs,
    InstallDocs,
    BaseHeader,
    BaseFooter
  },
  setup() {
    const properties = [
      menuEvents, menuObject, menuMethods, menuProperties, menuProps,
      menuSlots, mobMethods, mobProps, mobSlots, classes
    ]

    return { properties }
  }
}
</script>
