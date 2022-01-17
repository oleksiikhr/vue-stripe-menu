<template>
  <div class="flex">
    <div class="primary p-30">
      <template v-for="i in 2" :key="`g1-${i}`">
        <base-text :max="200" type="title" />
        <base-group v-for="j in 3" :key="`g1-${i}-${j}`" />
        <br />
      </template>
    </div>
    <div class="secondary p-30">
      <template v-for="i in 3" :key="`g3-${i}`">
        <base-text :max="200" :height="15" type="title" color="secondary" />
        <base-group v-for="j in 2" :key="`g4-${i}-${j}`" size="small" color="secondary" />
      </template>
    </div>
  </div>
</template>

<script>
import BaseText from '../base/Text.vue'
import BaseGroup from '../base/Group.vue'

export default {
  components: {
    BaseText,
    BaseGroup,
  },
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;

  > div {
    // Making background is for both blocks to prevent
    // wrong display roundings
    &.primary {
      background-color: var(--vsm-background);
    }

    &.secondary {
      background-color: var(--vsm-background-alt);
    }
  }
}
</style>
