<template>
  <div>
    <a
      href="#demo"
      id="demo"
      class="section"
    >
      # Demo
    </a>
    <pre><code class="javascript">{{ DemoHeaderRaw }}</code></pre>
  </div>
</template>

<script>
// eslint-disable-next-line
import DemoHeaderRaw from '!!raw-loader!../Header'
import highlight from 'highlight.js'

export default {
  data () {
    return {
      DemoHeaderRaw
    }
  },
  mounted () {
    highlight.initHighlightingOnLoad()
  }
}
</script>
