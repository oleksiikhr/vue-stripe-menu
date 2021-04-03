<template>
  <div>
    <base-title title="Customize" />
    <component :is="'style'">
      {{ styles }}
    </component>
    <div>
      <strong>Props</strong>
    </div>
    <div>
      <strong>Styles</strong>
      <div
        v-for="(group, index) in allStyles"
        :key="index"
      >
        <div
          v-for="item in group"
          :key="item.property"
          class="property-item"
        >
          <label>
            <span>{{ item.property }}:</span>
            <input
              v-model="item.value"
              :placeholder="item.initial"
            />
            <small v-if="item.desc">// {{ item.desc }}</small>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTitle from '../base/Title'

export default {
  components: {
    BaseTitle
  },
  emits: [
    'on-css', 'on-handler', 'on-screen-offset', 'on-disable-window-resize-handler'
  ],
  data() {
    return {
      handler: 'hover',
      screenOffset: 10,
      disableWindowResizeHandler: false,

      // Initial values from *.scss
      vsmMenuStyles: [
        { property: '--vsm-border-radius', value: null, initial: '4px', desc: 'Some content' },
        { property: '--vsm-transform-content', value: null, initial: '150px' },
        { property: '--vsm-arrow-size', value: null, initial: '12px' },
        { property: '--vsm-arrow-shadow', value: null, initial: '-3px -3px 5px rgba(82, 95, 127, .04)' },
        { property: '--vsm-arrow-border-radius', value: null, initial: '4px 0 0 0' },
        { property: '--vsm-index', value: null, initial: '1000' },
        { property: '--vsm-link-height', value: null, initial: '50px' },
        { property: '--vsm-background', value: null, initial: '#fff' },
        { property: '--vsm-background-alt', value: null, initial: '#f6f9fc' },
        { property: '--vsm-background-arrow', value: null, initial: 'var(--vsm-background)' },
        { property: '--vsm-color', value: null, initial: '#6772e5' },
        { property: '--vsm-color-hover', value: null, initial: '#32325d' },
        { property: '--vsm-transition', value: null, initial: '.25s' },
        { property: '--vsm-transition-link', value: null, initial: '.1s ease' },
        { property: '--vsm-shadow', value: null, initial: '0 50px 100px -20px rgba(50, 50, 93, .25), 0 30px 60px -30px rgba(0, 0, 0, .3), 0 -18px 60px -10px rgba(0, 0, 0, .025)' },
      ],
      vsmMobStyles: [
        { property: '--vsm-mob-hamburger-size', value: null, initial: '50px' },
        { property: '--vsm-mob-close-size', value: null, initial: '50px' },
        { property: '--vsm-mob-background', value: null, initial: 'var(--vsm-background)' },
        { property: '--vsm-mob-shadow', value: null, initial: 'var(--vsm-shadow)' },
      ],
      generalStyles: [
        { property: 'max-width', value: '1024px', initial: '1024px' }
      ]
    }
  },
  computed: {
    allStyles() {
      return [this.vsmMenuStyles, this.vsmMobStyles, this.generalStyles]
    },
    vsmMenuStylesString() {
      let result = ''

      this.vsmMenuStyles.forEach((item) => {
        if (item.value && item.value !== item.initial) {
          result += `  ${item.property}: ${item.value};\n`
        }
      })

      return result
    },
    vsmMobStylesString() {
      return this.vsmMobStyles.reduce((result, item) => {
        if (item.value && item.value !== item.initial) {
          result += `  ${item.property}: ${item.value};\n`
        }

        return result
      }, '')
    },
    generalStylesString() {
      return ''+
`.vsm-menu {
  max-width: ${this.generalStyles[0].value};
  width: 100%;
  margin: 0 auto;
}

.vsm-nav {
  margin: 0 10px;
}

.vsm-root {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vsm-section_menu {
  flex: 1 1 auto;
  justify-content: center;
}

.vsm-link {
  padding: 0 25px;
}

@media screen and (max-width: 768px) {
  .vsm-mob-show {
    display: block;
  }
  .vsm-mob-hide {
    display: none;
  }
  .vsm-mob-full {
    flex-grow: 1;
  }
}`
    },
    styles() {
      let result = ''

      result = this.vsmMenuStylesString && `.vsm-menu {\n${this.vsmMenuStylesString}}\n\n`
      result += this.vsmMobStylesString && `.vsm-section_mob {\n${this.vsmMobStylesString}}\n\n`
      result += this.generalStylesString

      return result.trim()
    },
  },
  watch: {
    styles: {
      handler(val) {
        this.$emit('on-css', val)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.property-item {
  margin-bottom: 5px;
  label > * {
    margin: 0 3px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
