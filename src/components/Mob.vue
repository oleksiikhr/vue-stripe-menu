<template>
  <li :class="['vsm-section', 'vsm-section_mob', {
    'vsm-open': active
  }]">
    <div
      class="vsm-mob"
      @click="onClickHamburger"
    >
      <slot name="hamburger">
        <div class="vsm-mob__hamburger">
          <div class="vsm-mob-line" />
          <div class="vsm-mob-line" />
          <div class="vsm-mob-line" />
        </div>
      </slot>
    </div>
      <div class="vsm-mob-content">
      <transition name="vsm-mob-anim">
        <div
          v-show="active"
          class="vsm-mob-content__wrap"
        >
          <div
            class="vsm-mob-close"
            @click="onClickHamburger"
          />
          <slot />
        </div>
      </transition>
    </div>
  </li>
</template>

<script>
const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints
const touchEvent = touchSupport ? 'touchend' : 'click'

export default {
  name: 'vsmMob',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // Support change value without accept props
      active: this.value
    }
  },
  watch: {
    // Support for changing a variable externally
    value (val) {
      if (this.active !== val) {
        this.active = val
      }
    },
    // Lock the permanent event on click, hang event only when the menu is opened
    active (val) {
      if (val) {
        document.body.addEventListener(touchEvent, this.eventEndHandler)
      } else {
        document.body.removeEventListener(touchEvent, this.eventEndHandler)
      }
    }
  },
  beforeDestroy () {
    document.body.removeEventListener(touchEvent, this.eventEndHandler)
  },
  methods: {
    onClickHamburger () {
      this.emitValue(!this.active)
    },
    emitValue (toggle) {
      this.active = toggle
      this.$emit('input', toggle)
    },
    // Close Dropdown content after outside click
    eventEndHandler (evt) {
      if (this.$el !== evt.target && !this.$el.contains(evt.target)) {
        this.emitValue(false)
      }
    }
  }
}
</script>
