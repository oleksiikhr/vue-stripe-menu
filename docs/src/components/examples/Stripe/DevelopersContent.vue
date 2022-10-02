<template>
  <div class="p-30">
    <base-text :max="200" type="title" />
    <base-group v-for="i in 2" :key="`g1-${i}`" />
  </div>
  <div class="p-30">
    <base-group color="secondary" />
    <base-group color="secondary" />
  </div>
</template>

<script>
import BaseGroup from '../../base/BaseGroup.vue';
import BaseText from '../../base/BaseText.vue';

export default {
  components: {
    BaseText,
    BaseGroup,
  },
};
</script>
