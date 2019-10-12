<template>
  <div>
    <base-title title="Example" />
    <pre><code class="javascript">{{ ExampleRaw }}</code></pre>
  </div>
</template>

<script>
// eslint-disable-next-line
import ExampleRaw from '!!raw-loader!./ExampleRaw'
import BaseTitle from '../BaseTitle'
import highlight from 'highlight.js'

export default {
  components: {
    BaseTitle
  },
  data () {
    return {
      ExampleRaw
    }
  },
  mounted () {
    highlight.initHighlightingOnLoad()
  }
}
</script>
