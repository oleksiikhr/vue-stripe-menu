<template>
  <div :class="['base-group', `base-group_size_${size}`, 'background-hover']">
    <div :class="['base-group__img', background]" />
    <div class="base-group__content">
      <base-text
        :color="color"
        :min="70"
        :max="100"
        :height="size === 'small' ? 13 : 16"
        class="base-group__content__title"
      />
      <base-text
        :color="color"
        :min="200"
        :max="300"
        :height="size === 'small' ? 11 : 14"
        class="base-group__content__subtitle"
      />
    </div>
  </div>
</template>

<script>
import rnd from '../../sciprts/rnd'
import BaseText from './Text'

export default {
  components: {
    BaseText
  },
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ~['medium', 'small'].indexOf(val)
    },
    color: {
      type: String,
      default: 'primary',
      validator: (val) => ~['primary', 'secondary'].indexOf(val)
    }
  },
  computed: {
    background () {
      return this.color === 'primary' ? 'background' : 'background--secondary'
    }
  },
  methods: {
    rnd
  }
}
</script>

<style lang="scss" scoped>
.base-group {
  display: flex;
  margin-bottom: 10px;
  padding: 10px 0;
}

.base-group__img {
  border-radius: 50%;
}

.base-group__content {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.base-group__content__title {
  width: 100%;
  height: 17px;
  margin-bottom: 3px;
  padding-top: 0;
}

.base-group__content__subtitle {
  width: 100%;
  height: 13px;
  padding: 0;
  margin: 0;
}

// Sizes
.base-group_size_medium {
  .base-group__img {
    min-width: 32px;
    height: 32px;
  }
}

.base-group_size_small {
  .base-group__img {
    min-width: 20px;
    height: 20px;
  }
}
</style>
