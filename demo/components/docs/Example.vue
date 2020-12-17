<template>
  <div>
    <base-title title="Example" />
    <pre><code class="javascript">{{ ExampleRaw }}</code></pre>
  </div>
</template>

<script>
import highlight from 'highlight.js'
import { onMounted } from 'vue'
import ExampleRaw from '!!raw-loader!./ExampleRaw'
import BaseTitle from '../BaseTitle'

export default {
  components: {
    BaseTitle
  },
  data () {
    return {
      ExampleRaw
    }
  },
  setup() {
    onMounted(() => highlight.initHighlightingOnLoad())
  }
}
</script>
