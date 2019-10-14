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

<style lang="scss" scoped>
main {
  max-width: 1024px;
  margin: 80px auto 0;
  font-family: monospace;
  > *:not(:last-child) {
    margin-bottom: 50px;
  }
  /deep/ .section {
    display: inline-block;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 10px;
    margin-bottom: 10px;
    color: #333;
    text-decoration: none !important;
    outline: none;
    user-select: none;
  }
}

footer {
  max-width: 1024px;
  margin: 50px auto 30px;
  text-align: center;
  /deep/ a {
    display: inline-block;
    width: 25px;
    &:hover {
      svg {
        fill: #000;
      }
    }
    svg {
      fill: #777;
      transition: .25s;
    }
  }
}
</style>
