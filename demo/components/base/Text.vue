<template>
  <div :class="['base-text', typeClasses]">
    <div
      :class="['base-text__content', background]"
      :style="{
        width: `${width}px`,
        height: `${height}px`
      }"
    />
  </div>
</template>

<script>
import rnd from '../../sciprts/rnd'

export default {
  props: {
    min: {
      type: Number,
      default: 120
    },
    max: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 16
    },
    type: {
      type: String,
      default: 'text',
      validator: (val) => ~['text', 'title'].indexOf(val)
    },
    color: {
      type: String,
      default: 'primary',
      validator: (val) => ~['primary', 'secondary'].indexOf(val)
    }
  },
  computed: {
    width () {
      return rnd(this.min, this.max)
    },
    typeClasses () {
      if (this.type === 'text') {
        return 'mb-5'
      }

      return ['mb-20', 'background-hover']
    },
    background () {
      return this.color === 'primary' ? 'background' : 'background--secondary'
    }
  }
}
</script>

<style lang="scss" scoped>
.base-text {
  padding: 5px 0;
}
</style>
