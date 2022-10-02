<template>
  <div :class="['base-text', typeClasses]">
    <div
      :class="['base-text__content', background]"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
      }"
    />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'BaseText',
  props: {
    min: {
      type: Number,
      default: 120,
    },
    max: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 16,
    },
    type: {
      type: String,
      default: 'text',
      validator: (val) => ['text', 'title'].includes(val),
    },
    color: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary'].includes(val),
    },
  },
  setup(props) {
    const width = computed(() => {
      return Math.floor(Math.random() * (props.max - props.min + 1)) + props.min;
    });

    const typeClasses = computed(() => {
      if ('text' === props.type) {
        return 'mb-5';
      }

      return ['mb-20', 'background-hover'];
    });

    const background = computed(() => ('primary' === props.color ? 'background' : 'background--secondary'));

    return { width, typeClasses, background };
  },
};
</script>

<style lang="scss" scoped>
.base-text {
  padding: 5px 0;
}
</style>
