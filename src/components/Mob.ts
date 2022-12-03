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
  destroyed() {
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
      if (isOutsideClick(<HTMLElement>this.$el, evt)) {
        this.emitValue(false);
      }
    },
  },
  render(h) {
    return h(
      'LI',
      {
        class: [
          'vsm-mob-container',
          'vsm-mob-show',
          {
            'vsm-open': this.active,
          },
        ],
      },
      [
        h(
          'DIV',
          {
            class: ['vsm-mob'],
            on: {
              click: this.onClickHamburger,
            },
          },
          this.$slots.hamburger ?? [
            h(
              'DIV',
              {
                class: ['vsm-mob__hamburger'],
              },
              [
                h('DIV', {
                  class: 'vsm-mob-line',
                }),
                h('DIV', {
                  class: 'vsm-mob-line',
                }),
                h('DIV', {
                  class: 'vsm-mob-line',
                }),
              ]
            ),
          ]
        ),
        h(
          'DIV',
          {
            class: ['vsm-mob-content'],
          },
          [
            h(
              'transition',
              {
                props: {
                  name: 'vsm-mob-anim',
                },
              },
              [
                h(
                  'DIV',
                  {
                    directives: [
                      {
                        name: 'show',
                        value: this.active,
                      },
                    ],
                    class: ['vsm-mob-content__wrap'],
                  },
                  (
                    this.$slots.close ?? [
                      h('DIV', {
                        class: ['vsm-mob-close'],
                        on: {
                          click: this.onClickHamburger,
                        },
                      }),
                    ]
                  ).concat(this.$slots.default ?? [])
                ),
              ]
            ),
          ]
        ),
      ]
    );
  },
});
