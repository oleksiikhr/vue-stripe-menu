<template>
  <div>
    <base-header />
    <main>
      <install-docs />
      <example-docs />
      <attributes-docs />
      <menu-object-docs />
      <slots-docs />
      <events-docs />
      <demo-docs />
    </main>
    <base-footer />
  </div>
</template>

<script>
import AttributesDocs from './components/docs/Attributes'
import MenuObjectDocs from './components/docs/MenuObject'
import ExampleDocs from './components/docs/Example'
import InstallDocs from './components/docs/Install'
import EventsDocs from './components/docs/Events'
import BaseHeader from './components/BaseHeader'
import BaseFooter from './components/BaseFooter'
import SlotsDocs from './components/docs/Slots'
import DemoDocs from './components/docs/Demo'

export default {
  components: {
    AttributesDocs,
    MenuObjectDocs,
    ExampleDocs,
    InstallDocs,
    BaseHeader,
    EventsDocs,
    BaseFooter,
    SlotsDocs,
    DemoDocs
  }
}
</script>
