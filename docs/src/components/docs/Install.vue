<template>
  <div>
    <base-title title="Install" />
    <p>Install the library:</p>
    <pre><code
      ref="codeShell"
      class="shell"
    >{{ shell }}</code></pre>
    <p>Import components:</p>
    <pre><code
      ref="codeJs"
      class="javascript"
    >{{ js }}</code></pre>
    <p>Add component:</p>
    <pre><code
      ref="codeVue"
      class="vue"
    >{{ vue }}</code></pre>
    <p>Add css/scss styles:</p>
    <pre><code
      ref="codeCss"
      class="scss"
    >{{ css }}</code></pre>
  </div>
</template>

<script>
import { onMounted, nextTick, watch, ref } from 'vue'
import highlight from 'highlight.js'
import BaseTitle from '../base/Title.vue'

export default {
  components: {
    BaseTitle,
  },
  props: {
    css: {
      type: String,
      required: true,
    },
    vsmProps: {
      type: Object,
      required: true,
    },
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

    watch(
      () => props.css,
      () => nextTick(() => highlight.highlightElement(codeCss.value)),
    )
    watch(
      () => props.vsmProps,
      () => nextTick(() => highlight.highlightElement(codeVue.value)),
    )

    return { codeShell, codeVue, codeCss, codeJs }
  },
  data() {
    return {
      shell: `$ npm i vue-stripe-menu
// or
$ yarn add vue-stripe-menu
`,
      js: `// >>> Install globally - .js file <<<

import { createApp } from 'vue'
import VueStripeMenu from 'vue-stripe-menu'

createApp({}).use(VueStripeMenu)

// >>> Install locally - .vue file <<<

import { VsmMenu, VsmMob } from 'vue-stripe-menu'

export default {
  components: {
    VsmMenu, VsmMob
  }
}`,
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
      return `<template>
  <vsm-menu ${this.vsmPropsStr}>
    <template #default="{ item }">
      <div style="width: 300px; padding: 30px">
        Dropdown content - {{ item.title }}
      </div>
    </template>
    <template #before-nav>
      <li class="vsm-mob-full">
        Left side
      </li>
    </template>
    <template #after-nav>
      <li class="vsm-mob-hide">
        Right side
      </li>
      <vsm-mob>
        <div style="min-height: 200px; padding: 30px">
          Mobile Content
        </div>
      </vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { title: 'Item1', dropdown: 'dropdown-1' },
        { title: 'Item2', dropdown: 'dropdown-2' },
        { title: 'Just link', attributes: { href: '#clicked' } },
      ]
    }
  }
}
<script>`
    },
  },
}
</script>
