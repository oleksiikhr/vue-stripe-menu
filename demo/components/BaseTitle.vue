<template>
  <a
    :id="generatedId"
    :href="`#${generatedId}`"
    class="section"
  >
    # <slot>{{ title }}</slot>
  </a>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    generatedId () {
      if (this.id) {
        return this.id
      }

      let id = this.title

      // TODO
      // if (this.$slots.default) {
      //   id = this.$slots.default[0].text
      // }

      return id.trim().toLowerCase().replace(/[^a-z-]/gi, '-')
    }
  }
}
</script>
