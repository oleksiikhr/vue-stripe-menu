<template>
  <footer>
    <a
      :href="homepage"
      title="Repository"
      target="_blank"
    >
      <github-svg />
    </a>
  </footer>
</template>

<script>
import { homepage } from '../../package'
import GithubSvg from './svg/Github'

export default {
  components: {
    GithubSvg
  },
  data () {
    return {
      homepage
    }
  }
}
</script>
