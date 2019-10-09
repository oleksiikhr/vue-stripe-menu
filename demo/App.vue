<template>
  <div>
    <base-header />
    <main>
      <attributes-docs />
      <slots-docs />
      <events-docs />
      <demo-docs />
    </main>
    <base-footer />
  </div>
</template>

<script>
import AttributesDocs from './components/docs/Attributes'
import EventsDocs from './components/docs/Events'
import SlotsDocs from './components/docs/Slots'
import DemoDocs from './components/docs/Demo'
import BaseHeader from './components/Header'
import BaseFooter from './components/Footer'

export default {
  components: {
    BaseHeader, AttributesDocs, EventsDocs, SlotsDocs, DemoDocs, BaseFooter
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
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 10px 10px 20px;
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
