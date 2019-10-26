<template>
  <div>
    <base-title title="Install" />
    <p>Install the library in your project:</p>
    <pre><code class="shell">{{ shell }}</code></pre>
    <p>Then add components to Vue and compiled css styles</p>
    <pre><code class="javascript">{{ vue }}</code></pre>
    <p>Or you can change them at compile time (scss). See all available variables:</p>
    <p>
      <a
        href="https://github.com/Alexeykhr/vue-stripe-menu/blob/master/src/scss/_variables.scss"
        target="_blank"
      >
        List of variables
      </a>
    </p>
    <pre><code class="scss">{{ scss }}</code></pre>
  </div>
</template>

<script>
import BaseTitle from '../BaseTitle'
import highlight from 'highlight.js'

export default {
  components: {
    BaseTitle
  },
  data () {
    return {
      shell: '$ npm i vue-stripe-menu\n' +
        '// or\n' +
        '$ yarn add vue-stripe-menu',
      vue: '// .js file\n\n' +
        'import Vue from \'Vue\'\n' +
        'import VueStripeMenu from \'vue-stripe-menu\'\n\n' +
        'Vue.use(VueStripeMenu)\n\n' +
        '// Import build styles\n' +
        'import \'vue-stripe-menu/dist/vue-stripe-menu.css\'',
      scss: '// .scss file\n\n' +
        '// You can resize for "@media only screen":\n' +
        '$vsm-media: 500px;\n\n' +
        '// Colors:\n' +
        '$vsm-color: #000;\n' +
        '$vsm-color-hover: rgba(0, 0, 0, .9);\n\n' +
        '// And also you can see the animation in slow motion:\n' +
        '$vsm-transition: 1s;\n\n' +
        '@import "~vue-stripe-menu/src/scss/index";'
    }
  },
  mounted () {
    highlight.initHighlightingOnLoad()
  }
}
</script>
