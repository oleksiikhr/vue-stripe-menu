<template>
  <li class="vsm-section vsm-section_mob">
    <div class="vsm-mob">
      <slot name="hamburger">
        <div class="vsm-mob__hamburger">
          <div class="vsm-mob-line" />
          <div class="vsm-mob-line" />
          <div class="vsm-mob-line" />
        </div>
      </slot>
    </div>
    <div>
      <slot />
    </div>
  </li>
</template>

<script>
export default {
  name: 'vsmMob'
}
</script>
