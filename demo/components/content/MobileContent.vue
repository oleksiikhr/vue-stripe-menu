<template>
  <div class="p-30">
    <base-text />
    <br>
    <base-group />
    <base-group />
    <base-group />
    <base-group />
  </div>
</template>

<script>
import BaseGroup from '../base/Group'
import BaseText from '../base/Text'

export default {
  components: {
    BaseGroup,
    BaseText
  }
}
</script>
