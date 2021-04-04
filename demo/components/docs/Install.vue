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
    >{{ js }}</code></pre>
    <p>Add component:</p>
    <pre><code
      ref="codeVue"
      class="vue"
    >{{ vue }}</code></pre>
    <p>Add styles:</p>
    <pre><code
      ref="codeCss"
      class="css"
    >{{ css }}</code></pre>
  </div>
</template>

<script>
import { onMounted, nextTick, watch, ref } from 'vue'
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
    },
    vsmProps: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const codeShell = ref(null)
    const codeVue = ref(null)
    const codeCss = ref(null)
    const codeJs = ref(null)

    onMounted(() => {
      highlight.highlightElement(codeShell.value)
      highlight.highlightElement(codeVue.value)
      highlight.highlightElement(codeCss.value)
      highlight.highlightElement(codeJs.value)
    })

    watch(() => props.css, () => nextTick(() => highlight.highlightElement(codeCss.value)))
    watch(() => props.vsmProps, () => nextTick(() => highlight.highlightElement(codeVue.value)))

    return { codeShell, codeVue, codeCss, codeJs }
  },
  data() {
    return {
      shell: '' +
`$ npm i vue-stripe-menu
// or
$ yarn add vue-stripe-menu
`,
      js: '' +
`// .js file (Nuxt.js > plugins/vue-stripe-menu.js)

import Vue from 'Vue'
import VueStripeMenu from 'vue-stripe-menu'
import 'vue-stripe-menu/dist/vue-stripe-menu.css'
Vue.use(VueStripeMenu)

// Nuxt.js > add plugin to nuxt.config.js
// export default {
//   plugins: ['~/plugins/vue-stripe-menu']
// }
`
    }
  },
  computed: {
    vsmPropsStr() {
      const propsStr = Object.entries(this.vsmProps).reduce((result, [key, val]) => {
        result += `\n    ${typeof val === 'number' ? ':' : ''}${key}="${val}"`
        return result
      }, '')

      if (!propsStr) {
        return `:menu="menu"`
      }

      return `\n    :menu="menu"${propsStr}\n  `
    },
    vue() {
      return '' +
`<template>
  <vsm-menu ${this.vsmPropsStr}>
    <template #default="{ item }">
      Dropdown content - {{ item.title }}
    </template>
    <template #before-nav>
      Left side
    </template>
    <template #after-nav>
      <li class="vsm-section vsm-mob-hide">Right side item</li>
      <vsm-mob>Mobile Content</vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { title: 'Item with dropdown', dropdown: 'dropdown-1' },
        { title: 'Just link', attributes: { href: '#clicked' } },
      ]
    }
  }
}
<\/script>`
    }
  }
}
</script>
