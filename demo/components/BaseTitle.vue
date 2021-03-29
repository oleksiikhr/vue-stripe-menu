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

      return this.title ? this.title.trim().toLowerCase().replace(/[^a-z-]/gi, '-') : ''
    }
  }
}
</script>
