<template>
  <div>
    <base-title title="Full Structure" />
    <pre><code class="javascript">{{ StructureRaw }}</code></pre>
  </div>
</template>

<script>
// eslint-disable-next-line
import StructureRaw from '!!raw-loader!./StructureRaw'
import BaseTitle from '../BaseTitle'
import highlight from 'highlight.js'

export default {
  components: {
    BaseTitle
  },
  data () {
    return {
      StructureRaw
    }
  },
  mounted () {
    highlight.initHighlightingOnLoad()
  }
}
</script>
