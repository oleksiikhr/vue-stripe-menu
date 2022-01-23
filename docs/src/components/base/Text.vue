<template>
  <div :class="['base-text', typeClasses]">
    <div
      :class="['base-text__content', background]"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
      }" />
  </div>
</template>

<script>
import rnd from '../../scripts/rnd';
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
      validator: (val) => ~['text', 'title'].indexOf(val),
    },
    color: {
      type: String,
      default: 'primary',
      validator: (val) => ~['primary', 'secondary'].indexOf(val),
    },
  },
  setup(props) {
    const width = computed(() => rnd(props.min, props.max));

    const typeClasses = computed(() => {
      if (props.type === 'text') {
        return 'mb-5';
      }

      return ['mb-20', 'background-hover'];
    });

    const background = computed(() => (props.color === 'primary' ? 'background' : 'background--secondary'));

    return { width, typeClasses, background };
  },
};
</script>

<style lang="scss" scoped>
.base-text {
  padding: 5px 0;
}
</style>
