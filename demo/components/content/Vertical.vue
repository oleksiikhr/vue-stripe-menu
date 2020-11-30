<template>
  <div class="divide">
    <div class="primary">
      <template
        v-for="i in 2"
        :key="`g1-${i}`"
      >
        <base-text
          :max="200"
          type="title"
        />
        <base-group
          v-for="j in 3"
          :key="`g1-${i}-${j}`"
        />
        <br>
      </template>
    </div>
    <div class="secondary">
      <template
        v-for="i in 3"
        :key="`g3-${i}`"
      >
        <base-text
          :max="200"
          :height="15"
          type="title"
          color="secondary"
        />
        <base-group
          v-for="j in 2"
          :key="`g4-${i}-${j}`"
          size="small"
          color="secondary"
        />
      </template>
    </div>
  </div>
</template>

<script>
import BaseText from '../base/Text'
import BaseGroup from '../base/Group'

export default {
  components: {
    BaseText, BaseGroup
  }
}
</script>

<style lang="scss" scoped>
.divide {
  display: flex;
  padding: 0;
  > div {
    padding: 30px;
    // Making background is for both blocks to prevent
    // wrong display roundings
    &.primary {
      background-color: #fff;
    }
    &.secondary {
      background-color: #f6f9fc;
    }
  }
}
</style>
