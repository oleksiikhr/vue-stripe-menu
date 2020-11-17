<template>
  <li
    :class="['vsm-section', 'vsm-section_mob', {
      'vsm-open': active
    }]"
  >
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
export default {
  name: 'VsmMob',
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
        this.registerEvent()
      } else {
        this.unregisterEvent()
      }
    }
  },
  mounted () {
    const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints
    this._touchEvent = touchSupport ? 'touchend' : 'click'
  },
  beforeDestroy () {
    this.unregisterEvent()
  },
  methods: {
    closeDropdown () {
      this.emitValue(false)
    },
    onClickHamburger () {
      this.emitValue(!this.active)
    },
    registerEvent () {
      document.body.addEventListener(this._touchEvent, this.eventEndHandler)
    },
    unregisterEvent () {
      document.body.removeEventListener(this._touchEvent, this.eventEndHandler)
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
