<template>
  <div class="p-30">
    <base-text />
    <br />
    <base-group />
    <base-group />
    <base-group />
    <base-group />
  </div>
</template>

<script>
import BaseGroup from '../base/Group.vue'
import BaseText from '../base/Text.vue'

export default {
  components: {
    BaseGroup,
    BaseText,
  },
}
</script>
