<template>
  <a :id="generatedId" :href="generatedHref" class="section">
    # <slot>{{ title }}</slot>
  </a>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    generatedId() {
      if (this.id) {
        return this.id
      }

      if (!this.title) {
        return null
      }

      return this.title
        .trim()
        .toLowerCase()
        .replace(/[^a-z-]/gi, '-')
    },
    generatedHref() {
      return this.generatedId && `#${this.generatedId}`
    },
  },
}
</script>
