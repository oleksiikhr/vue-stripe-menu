<template>
  <div>
    <base-title title="Full Example" />
    <pre><code
      ref="code"
      class="javascript"
    >{{ ExampleRaw }}</code></pre>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import highlight from 'highlight.js'
import ExampleRaw from './ExampleRaw.vue?raw'
import BaseTitle from '../base/Title.vue'

export default {
  components: {
    BaseTitle,
  },
  setup() {
    const code = ref(null)

    onMounted(() => {
      highlight.highlightElement(code.value)
    })

    return { code }
  },
  data() {
    return {
      ExampleRaw,
    }
  },
}
</script>
