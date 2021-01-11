<template>
  <div>
    <base-title title="Demo" />
    <pre><code class="javascript">{{ DemoHeaderRaw }}</code></pre>
  </div>
</template>

<script>
import highlight from 'highlight.js'
import { onMounted } from 'vue'
import DemoHeaderRaw from '!!raw-loader!../BaseHeader'
import BaseTitle from '../BaseTitle'

export default {
  components: {
    BaseTitle
  },
  setup() {
    onMounted(() => highlight.initHighlightingOnLoad())
  },
  data () {
    return {
      DemoHeaderRaw
    }
  }
}
</script>
