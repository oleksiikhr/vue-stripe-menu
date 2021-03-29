<template>
  <div>
    <base-title title="Demo" />
    <pre><code
      ref="code"
      class="javascript"
    >{{ DemoHeaderRaw }}</code></pre>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import highlight from 'highlight.js'
import DemoHeaderRaw from '!!raw-loader!../BaseHeader'
import BaseTitle from '../BaseTitle'

export default {
  components: {
    BaseTitle
  },
  setup() {
    const code = ref(null)

    onMounted(() => {
      highlight.highlightElement(code.value)
    })

    return { code }
  },
  data () {
    return {
      DemoHeaderRaw
    }
  }
}
</script>
