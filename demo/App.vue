<template>
  <div>
    <base-header />
    <main>
      <install-docs />
      <example-docs />
      <example-codepen-docs />
      <structure-docs />
      <props-menu-docs />
      <menu-object-menu-docs />
      <slots-menu-docs />
      <events-menu-docs />
      <props-mob-docs />
      <slots-mob-docs />
      <classes-docs />
      <demo-docs />
    </main>
    <base-footer />
  </div>
</template>

<script>
import MenuObjectMenuDocs from './components/docs/menu/MenuObject'
import ExampleCodepenDocs from './components/docs/ExampleCodepen'
import EventsMenuDocs from './components/docs/menu/Events'
import PropsMenuDocs from './components/docs/menu/Props'
import SlotsMenuDocs from './components/docs/menu/Slots'
import StructureDocs from './components/docs/Structure'
import PropsMobDocs from './components/docs/mob/Props'
import SlotsMobDocs from './components/docs/mob/Slots'
import ClassesDocs from './components/docs/Classes'
import ExampleDocs from './components/docs/Example'
import InstallDocs from './components/docs/Install'
import BaseHeader from './components/BaseHeader'
import BaseFooter from './components/BaseFooter'
import DemoDocs from './components/docs/Demo'

export default {
  components: {
    MenuObjectMenuDocs,
    ExampleCodepenDocs,
    EventsMenuDocs,
    PropsMenuDocs,
    SlotsMenuDocs,
    StructureDocs,
    PropsMobDocs,
    SlotsMobDocs,
    ClassesDocs,
    ExampleDocs,
    InstallDocs,
    BaseHeader,
    BaseFooter,
    DemoDocs
  }
}
</script>
