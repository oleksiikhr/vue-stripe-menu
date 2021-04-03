<template>
  <div>
    <base-title title="Install" />
    <p>Install the library:</p>
    <pre><code
      ref="codeShell"
      class="shell"
    >{{ shell }}</code></pre>
    <p>Import component and styles:</p>
    <pre><code
      ref="codeJs"
      class="javascript"
    >{{ vue }}</code></pre>
    <p>Customize styles:</p>
    <pre><code
      ref="codeCss"
      class="css"
    >{{ css }}</code></pre>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import highlight from 'highlight.js'
import BaseTitle from '../base/Title'

export default {
  components: {
    BaseTitle
  },
  props: {
    css: {
      type: String,
      required: true
    }
  },
  setup() {
    const codeShell = ref(null)
    const codeCss = ref(null)
    const codeJs = ref(null)

    onMounted(() => {
      highlight.highlightElement(codeShell.value)
      highlight.highlightElement(codeJs.value)
      highlight.highlightElement(codeCss.value)
    })

    return { codeShell, codeJs, codeCss }
  },
  data() {
    return {
      shell: '$ npm i vue-stripe-menu\n' +
        '// or\n' +
        '$ yarn add vue-stripe-menu',
      vue: '// .js file\n\n' +
        'import Vue from \'Vue\'\n' +
        'import VueStripeMenu from \'vue-stripe-menu\'\n' +
        'import \'vue-stripe-menu/dist/vue-stripe-menu.css\'\n\n' +
        'Vue.use(VueStripeMenu)'
    }
  },
  watch: {
    css() {
      this.$nextTick(() => highlight.highlightElement(this.codeCss))
    }
  }
}
</script>
