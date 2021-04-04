<template>
  <div>
    <base-title title="Customize" />
    <component :is="'style'">
      {{ styles }}
    </component>
    <div class="mb-10">
      <div class="sub-title">
        [Props]
      </div>
      <div>
        <div
          v-for="item in vsmProps"
          :key="item.name"
          class="property-item"
        >
          <label>
            <span>{{ item.property }}:</span>
            <input
              v-model="item.value"
              :placeholder="item.initial"
              :style="{ color: !item.value || item.value === item.initial ? '#595959' : '#de3939' }"
              spellcheck="false"
              @input="item.onInput"
            >
          </label>
          <small v-if="item.desc">{{ item.desc }}</small>
        </div>
      </div>
    </div>
    <div>
      <div class="sub-title">
        [Styles]
      </div>
      <div>
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
                :style="{ color: !item.value || item.value === item.initial ? '#595959' : '#de3939' }"
                spellcheck="false"
              >
            </label>
            <small v-if="item.desc">{{ item.desc }}</small>
          </div>
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
    'on-css', 'change-props'
  ],
  data() {
    return {
      vsmProps: [
        { property: 'element', value: '', initial: 'header', desc: '', validator: (val) => !!val },
        { property: 'handler', value: '', initial: 'hover', desc: 'hover/click', validator: (val) => ['hover', 'click'].includes(val) },
        { property: 'screenOffset', value: '', initial: '10', desc: 'Indent dropdown from screen edges', validator: (val) => !isNaN(+val) },
        { property: 'dropdownOffset', value: '', initial: '0', desc: '', validator: (val) => !isNaN(+val) }
      ].map((item) => ({ ...item, value: item.initial, onInput: this.onChangeMenuProps })),

      // Initial values from *.scss
      vsmMenuStyles: [
        { property: '--vsm-border-radius', value: null, initial: '4px' },
        { property: '--vsm-transform-content', value: null, initial: '150px' },
        { property: '--vsm-arrow-size', value: null, initial: '12px' },
        { property: '--vsm-arrow-shadow', value: null, initial: '-3px -3px 5px rgba(82, 95, 127, .04)' },
        { property: '--vsm-arrow-border-radius', value: null, initial: '4px 0 0 0' },
        { property: '--vsm-index', value: null, initial: '1000' },
        { property: '--vsm-link-height', value: null, initial: '50px' },
        { property: '--vsm-background', value: null, initial: '#fff', desc: 'background for first element' },
        { property: '--vsm-background-alt', value: null, initial: '#f6f9fc', desc: 'background from second element' },
        { property: '--vsm-background-arrow', value: null, initial: 'var(--vsm-background)' },
        { property: '--vsm-color', value: null, initial: '#6772e5' },
        { property: '--vsm-color-hover', value: null, initial: '#32325d' },
        { property: '--vsm-transition', value: null, initial: '.25s' },
        { property: '--vsm-transition-link', value: null, initial: '.1s ease' },
        { property: '--vsm-shadow', value: null, initial: '0 50px 100px -20px rgba(50, 50, 93, .25), 0 30px 60px -30px rgba(0, 0, 0, .3), 0 -18px 60px -10px rgba(0, 0, 0, .025)' },
      ].map((item) => ({ ...item, value: item.initial })),
      vsmMobStyles: [
        { property: '--vsm-mob-hamburger-size', value: null, initial: '50px' },
        { property: '--vsm-mob-close-size', value: null, initial: '50px' },
        { property: '--vsm-mob-background', value: null, initial: 'var(--vsm-background)' },
        { property: '--vsm-mob-shadow', value: null, initial: 'var(--vsm-shadow)' },
      ].map((item) => ({ ...item, value: item.initial })),
      generalStyles: [
        { property: 'header max-width', value: null, initial: '1024px', desc: 'for vsm-menu', handler: (val) => val && `.vsm-menu {\n  max-width: ${val};\n  width: 100%;\n  margin: 0 auto;\n}` },
        { property: 'header margin', value: null, initial: '0 10px', desc: 'for vsm-menu', handler: (val) => val && `.vsm-nav {\n  margin: ${val};\n}` },
        { property: 'link position', value: null, initial: 'center', desc: 'left/center/right', handler: this.positionStyleHandler },
        { property: 'link indent', value: null, initial: '0 25px', desc: 'padding between links', handler: (val) => val && `.vsm-link {\n  padding: ${val};\n}` },
        { property: '@media mobile', value: null, initial: '768px', handler: (val) => val && `@media screen and (max-width: ${val}) {\n  .vsm-mob-show {\n    display: block;\n  }\n  .vsm-mob-hide {\n    display: none;\n  }\n  .vsm-mob-full {\n    flex-grow: 1;\n  }\n}` },
      ].map((item) => ({ ...item, value: item.initial }))
    }
  },
  computed: {
    allStyles() {
      return [this.generalStyles, this.vsmMenuStyles, this.vsmMobStyles]
    },
    vsmMenuStylesString() {
      return this.vsmMenuStyles.reduce((result, item) => {
        if (item.value && item.value !== item.initial) {
          result += `  ${item.property}: ${item.value};\n`
        }

        return result
      }, '').trim()
    },
    vsmMobStylesString() {
      return this.vsmMobStyles.reduce((result, item) => {
        if (item.value && item.value !== item.initial) {
          result += `  ${item.property}: ${item.value};\n`
        }

        return result
      }, '').trim()
    },
    generalStylesString() {
      return this.generalStyles.reduce((result, item) => {
        if (item.handler) {
          result += `${item.handler(item.value)}\n\n`
        }

        return result
      }, '').trim()
    },
    styles() {
      let result = this.vsmMenuStylesString && `.vsm-menu {\n  ${this.vsmMenuStylesString}\n}\n\n`
          result += this.vsmMobStylesString && `.vsm-section_mob {\n  ${this.vsmMobStylesString}\n}\n\n`
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
  },
  methods: {
    positionStyleHandler(val) {
      const common = `.vsm-root {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}`

      switch (val.trim()) {
        case 'center':
          return `${common}\n\n.vsm-section_menu {\n  flex: 1 1 auto;\n  justify-content: center;\n}`
        case 'left':
          return `${common}\n\n.vsm-section_menu {\n  flex: 1 1 auto;\n  justify-content: flex-start;\n}`
        case 'right':
          return `${common}\n\n.vsm-section_menu {\n  flex: 1 1 auto;\n  justify-content: flex-end;\n}`
        default:
          return common
      }
    },
    onChangeMenuProps() {
      const obj = this.vsmProps.reduce((result, item) => {
        if (!item.validator || item.validator(item.value)) {
          result[item.property] = item.value
        }

        return result
      }, {})

      this.$emit('change-props', obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.mb-10 {
  margin-bottom: 10px;
}

.sub-title {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: .9em;
}

.property-item {
  margin-bottom: 5px;
  font-size: .8em;
  label {
    > span {
      display: inline-block;
      width: 220px;
      text-align: right;
    }
    > input {
      margin: 0;
      padding: 2px 5px;
      border: 0;
      outline: none;
      width: 250px;
      font-size: .9em;
    }
    > * {
      margin: 0 3px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    + * {
      margin-left: 5px;
    }
  }
  > small {
    color: gray;
  }
}
</style>
