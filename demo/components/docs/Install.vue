<template>
  <div>
    <base-title title="Install" />
    <pre><code class="shell">{{ shell }}</code></pre>
    <pre><code class="javascript">{{ vue }}</code></pre>
  </div>
</template>

<script>
import BaseTitle from '../BaseTitle'
import highlight from 'highlight.js'

export default {
  components: {
    BaseTitle
  },
  data () {
    return {
      shell: '$ npm i vue-stripe-menu\n' +
        '// or\n' +
        '$ yarn add vue-stripe-menu',
      vue: 'import Vue from \'Vue\'\n' +
        'import VueStripeMenu from \'vue-stripe-menu\'\n\n' +
        'Vue.use(VueStripeMenu)\n\n' +
        '// Import styles\n' +
        'import \'vue-stripe-menu/dist/vue-stripe-menu.css\''
    }
  },
  mounted () {
    highlight.initHighlightingOnLoad()
  }
}
</script>
