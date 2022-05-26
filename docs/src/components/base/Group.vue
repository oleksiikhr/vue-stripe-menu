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
import { computed } from 'vue';
import BaseText from './Text.vue';

export default {
  name: 'BaseGroup',
  components: {
    BaseText,
  },
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['medium', 'small'].includes(val),
    },
    color: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary'].includes(val),
    },
  },
  setup(props) {
    const background = computed(() =>
      'primary' === props.color ? 'background' : 'background--secondary'
    );

    return { background };
  },
};
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
  height: 17px;
  margin-bottom: 3px;
  padding-top: 0;
  width: 100%;
}

.base-group__content__subtitle {
  height: 13px;
  margin: 0;
  padding: 0;
  width: 100%;
}

// Sizes
.base-group_size_medium {
  .base-group__img {
    height: 32px;
    min-width: 32px;
  }
}

.base-group_size_small {
  .base-group__img {
    height: 20px;
    min-width: 20px;
  }
}
</style>
