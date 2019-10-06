<template>
  <div>
    <base-text
      :max="200"
      type="title"
    />
    <base-group
      v-for="i in 3"
      :key="`g1-${i}`"
    />
    <br>
    <base-text
      :max="200"
      type="title"
    />
    <base-group
      v-for="i in 2"
      :key="`g2-${i}`"
    />
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
