<template>
  <li
    :class="[
      'vsm-mob-container',
      'vsm-mob-show',
      {
        'vsm-open': active,
      },
    ]"
  >
    <div class="vsm-mob" @click="onClickHamburger">
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
        <div v-show="active" class="vsm-mob-content__wrap">
          <slot name="close">
            <div class="vsm-mob-close" @click="onClickHamburger" />
          </slot>
          <slot />
        </div>
      </transition>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { isOutsideClick, touchEvent } from '../utils/dom';

export default defineComponent({
  name: 'VsmMob',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input', 'update:modelValue'],
  data() {
    return {
      active: this.value,
      event: 'click',
    };
  },
  watch: {
    value(val) {
      if (this.active !== val) {
        this.active = val;
      }
    },
    active(val) {
      if (val) {
        this.registerEvent();
      } else {
        this.unregisterEvent();
      }
    },
  },
  mounted() {
    this.reloadEvent();
  },
  beforeUnmount() {
    this.unregisterEvent();
  },
  methods: {
    closeDropdown() {
      this.emitValue(false);
    },
    onClickHamburger() {
      this.emitValue(!this.active);
    },
    reloadEvent() {
      this.event = touchEvent();
    },
    registerEvent() {
      document.body.addEventListener(this.event, this.eventEndHandler);
    },
    unregisterEvent() {
      document.body.removeEventListener(this.event, this.eventEndHandler);
    },
    emitValue(toggle: boolean) {
      this.active = toggle;
      this.$emit('input', toggle);
      this.$emit('update:modelValue', toggle);
    },
    eventEndHandler(evt: Event) {
      if (isOutsideClick(this.$el, evt)) {
        this.emitValue(false);
      }
    },
  },
});
</script>
