<template>
  <div>
    <base-title title="Install" />
    <p>Install the library:</p>
    <pre><code
      ref="codeShell"
      class="language-shell"
    >{{ shell }}</code></pre>
    <p>Import components:</p>
    <pre><code
      ref="codeJs"
      class="language-javascript"
    >{{ js }}</code></pre>
    <p>Add component:</p>
    <pre><code
      ref="codeVue"
      class="language-xml"
    >{{ vue }}</code></pre>
    <p>Add scss styles:</p>
    <pre><code
      ref="codeCss"
      class="language-scss"
    >{{ css }}</code></pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick, watch, ref } from 'vue';
import hljs from '../../libraries/highlight';
import BaseTitle from '../base/Title.vue';

export default defineComponent({
  name: 'InstallDocs',
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
    const codeShell = ref(null);
    const codeVue = ref(null);
    const codeCss = ref(null);
    const codeJs = ref(null);

    onMounted(() => {
      hljs.highlightElement(codeShell.value);
      hljs.highlightElement(codeJs.value);
    });

    watch(
      () => props.css,
      () => nextTick().then(() => hljs.highlightElement(codeCss.value)),
      { immediate: true }
    );
    watch(
      () => props.vsmProps,
      () => nextTick().then(() => hljs.highlightElement(codeVue.value)),
      { immediate: true }
    );

    return { codeShell, codeVue, codeCss, codeJs };
  },
  data() {
    return {
      shell: `$ npm i -D vue-stripe-menu
$ yarn add -D vue-stripe-menu
$ pnpm add -D vue-stripe-menu`,
      js: `import { createApp } from 'vue';
import VueStripeMenu from 'vue-stripe-menu';

createApp({}).use(VueStripeMenu);`,
    };
  },
  computed: {
    vsmPropsStr() {
      const propsStr = Object.entries(this.vsmProps).reduce((result, [key, val]) => {
        // eslint-disable-next-line no-param-reassign
        result += `\n    ${'number' === typeof val ? ':' : ''}${key}="${val}"`;
        return result;
      }, '');

      if (!propsStr) {
        return `:menu="menu"`;
      }

      return `\n    :menu="menu"${propsStr}\n  `;
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
<script>`;
    },
  },
});
</script>
