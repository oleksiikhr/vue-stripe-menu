<template>
  <div>
    <base-title title="Customize" />
    <component :is="'style'">
      {{ localStyles }}
    </component>
    <div class="mb-10">
      <small
        >* These changes are applied on the current header and added to the
        Install section.</small
      >
    </div>
    <br />
    <div class="mb-10">
      <div class="sub-title">[Props]</div>
      <div>
        <div v-for="item in vsmProps" :key="item.name" class="property-item">
          <label>
            <span>{{ item.property }}:</span>
            <input
              v-model="item.value"
              :placeholder="item.initial"
              :style="{
                color:
                  !item.value || item.value === item.initial
                    ? '#595959'
                    : '#de3939',
              }"
              spellcheck="false"
              @input="item.onInput"
            />
          </label>
          <small v-if="item.desc">{{ item.desc }}</small>
        </div>
      </div>
    </div>
    <div>
      <div class="sub-title">[Styles]</div>
      <div>
        <div v-for="(group, index) in allStyles" :key="index">
          <div v-for="item in group" :key="item.property" class="property-item">
            <label>
              <span>{{ item.property }}:</span>
              <input
                v-model="item.value"
                v-bind="item.attrs"
                :placeholder="item.initial"
                :style="{
                  color:
                    !item.value || item.value === item.initial
                      ? '#595959'
                      : '#de3939',
                }"
                spellcheck="false"
              />
            </label>
            <small v-if="item.desc">{{ item.desc }}</small>
          </div>
        </div>
      </div>
      <br />
      <a
        href="https://github.com/oleksiikhr/vue-stripe-menu/blob/main/src/scss/_variables.scss"
        target="_blank"
      >
        List of variables
      </a>
    </div>
  </div>
</template>

<script>
import BaseTitle from '../base/Title.vue';

export default {
  components: {
    BaseTitle,
  },
  emits: ['on-css', 'change-props'],
  data() {
    return {
      vsmProps: [
        {
          property: 'element',
          value: '',
          initial: 'header',
          desc: 'header/div/section or another HTMLElement',
          validator: (val) => !!val,
        },
        {
          property: 'handler',
          value: '',
          initial: 'hover',
          desc: 'hover/click',
          validator: (val) => ['hover', 'click'].includes(val),
        },
        {
          property: 'align',
          value: '',
          initial: 'center',
          desc: 'left/center/right (default value for all elements)',
          validator: (val) => ['left', 'center', 'right'].includes(val),
        },
        {
          property: 'screen-offset',
          value: '',
          initial: '10',
          desc: 'indent a dropdown menu from screen edges (reduce screen size)',
          validator: (val) => !isNaN(+val),
          convert: (val) => +val,
        },
        {
          property: 'dropdown-offset',
          value: '',
          initial: '0',
          desc: 'indent a dropdown menu from header',
          validator: (val) => !isNaN(+val),
          convert: (val) => +val,
        },
        {
          property: 'transition-timeout',
          value: '',
          initial: '250',
          desc: 'animation speed in ms (equals "$vsm-transition" style)',
          validator: (val) => !isNaN(+val),
          convert: (val) => +val,
        },
      ].map((item) => ({
        ...item,
        value: item.initial,
        onInput: this.onChangeMenuProps,
      })),

      // Initial values from *.scss
      generalStyles: [
        {
          property: 'header max-width',
          value: null,
          initial: '1024px',
          desc: 'for vsm-menu, empty - no styles',
          handler: (val) =>
            val &&
            `.vsm-menu {\n  max-width: ${val};\n  width: 100%;\n  margin: 0 auto;\n}`,
        },
        {
          property: 'header margin',
          value: null,
          initial: '0 10px',
          desc: 'for vsm-menu, empty - no styles',
          handler: (val) => val && `.vsm-nav {\n  margin: ${val};\n}`,
        },
        {
          property: 'link position',
          value: null,
          initial: 'center',
          desc: 'left/center/right, empty - no styles',
          handler: this.positionStyleHandler,
        },
        {
          property: '@media mobile',
          value: null,
          initial: '768px',
          desc: 'empty - no adaptive',
          handler: (val) =>
            val &&
            `@media screen and (max-width: ${val}) {\n  .vsm-mob-show {\n    display: block;\n  }\n  .vsm-mob-hide {\n    display: none;\n  }\n  .vsm-mob-full {\n    flex-grow: 1;\n  }\n}`,
        },
      ].map((item) => ({ ...item, value: item.initial })),
      vsmMenuStyles: [
        {
          property: '$vsm-transform-content',
          value: null,
          initial: '150px',
          desc: 'how far the content moves (inside the dropdown)',
        },
        { property: '$vsm-link-height', value: null, initial: '50px' },
        {
          property: '$vsm-background',
          value: null,
          initial: '#fff',
          desc: 'background for first element',
        },
        {
          property: '$vsm-background-alt',
          value: null,
          initial: '#f6f9fc',
          desc: 'background from second element',
        },
        { property: '$vsm-color', value: null, initial: '#6772e5' },
        { property: '$vsm-color-hover', value: null, initial: '#32325d' },
        {
          property: '$vsm-transition',
          value: null,
          initial: '250ms',
          desc: 'animation speed in ms (equals "transition-timeout" props)',
          attrs: { disabled: true },
        },
        {
          property: '$vsm-link-padding-x',
          value: null,
          initial: '25px',
          desc: 'spacing between the links',
        },
      ].map((item) => ({ ...item, value: item.initial })),
      vsmMobStyles: [
        { property: '$vsm-mob-dropdown-offset', value: null, initial: '10px' },
        {
          property: '$vsm-mob-background',
          value: null,
          initial: '$vsm-background',
        },
        {
          property: '$vsm-mob-transition',
          value: null,
          initial: '$vsm-transition',
        },
      ].map((item) => ({ ...item, value: item.initial })),
    };
  },
  computed: {
    allStyles() {
      return [this.generalStyles, this.vsmMenuStyles, this.vsmMobStyles];
    },
    vsmMenuStylesString() {
      return this.vsmMenuStyles
        .reduce((result, item) => {
          if (item.value && item.value !== item.initial) {
            result += `${item.property}: ${item.value};\n`;
          }

          return result;
        }, '')
        .trim();
    },
    vsmMobStylesString() {
      return this.vsmMobStyles
        .reduce((result, item) => {
          if (item.value && item.value !== item.initial) {
            result += `${item.property}: ${item.value};\n`;
          }

          return result;
        }, '')
        .trim();
    },
    generalStylesString() {
      return this.generalStyles
        .reduce((result, item) => {
          if ('function' === typeof item.handler) {
            const val = item.handler(item.value);
            result += val && `${val}\n\n`;
          }

          return result;
        }, '')
        .trim();
    },
    vsmMenuTransitionStyle() {
      return this.vsmMenuStyles.find(
        (item) => '$vsm-transition' === item.property
      );
    },
    vsmMenuTransitionProp() {
      return this.vsmProps.find(
        (item) => 'transition-timeout' === item.property
      );
    },
    filteredStyles() {
      let overrideStyles =
        this.vsmMenuStylesString && `${this.vsmMenuStylesString}\n`;
      overrideStyles +=
        this.vsmMobStylesString && `${this.vsmMobStylesString}\n`;

      let result = `// >>> SCSS style (required sass-loader, node-sass) <<<\n// https://github.com/oleksiikhr/vue-stripe-menu/blob/main/src/scss/_variables.scss\n`;
      result += `${overrideStyles ? `${overrideStyles}\n` : ''}`;
      result += `@import "~vue-stripe-menu/src/scss/index";\n\n// >>> CSS style <<<\n// @import 'vue-stripe-menu/dist/vue-stripe-menu.css';\n\n`;
      result += this.generalStylesString;

      return result.trim();
    },
    localStyles() {
      const fn = (obj) => {
        return obj.reduce((result, item) => {
          const value = item.value.replace(/\$([a-z-]+)/gm, 'var(--$1)');
          const initial = item.initial.replace(/\$([a-z-]+)/gm, 'var(--$1)');
          result += `${item.property.replace(/\$/gm, '--')}: ${
            value || initial
          };\n`;
          return result;
        }, '');
      };

      return `:root {${fn(this.vsmMenuStyles)}${fn(this.vsmMobStyles)}}${
        this.generalStylesString
      }`;
    },
  },
  watch: {
    filteredStyles: {
      handler(val) {
        this.$emit('on-css', val);
      },
      immediate: true,
    },
  },
  methods: {
    positionStyleHandler(val) {
      let position = '';

      switch (val.trim()) {
        case 'center':
          position = 'center';
          break;
        case 'left':
          position = 'flex-start';
          break;
        case 'right':
          position = 'flex-end';
          break;
        default:
          return '';
      }

      return `.vsm-link-container {\n  display: flex;\n  flex: 1 1 auto;\n  justify-content: ${position};\n}`;
    },
    onChangeMenuProps() {
      const obj = this.vsmProps.reduce((result, item) => {
        if (
          item.value !== item.initial &&
          (!item.validator || item.validator(item.value))
        ) {
          result[item.property] = item.convert
            ? item.convert(item.value)
            : item.value;
        }

        return result;
      }, {});

      this.vsmMenuTransitionStyle.value = `${
        this.vsmMenuTransitionProp.value || this.vsmMenuTransitionProp.initial
      }ms`;

      this.$emit('change-props', obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-title {
  font-size: 0.9em;
  font-weight: bold;
  margin-bottom: 10px;
}

.property-item {
  font-size: 0.8em;
  margin-bottom: 5px;

  label {
    > span {
      display: inline-block;
      text-align: right;
      width: 220px;
    }

    > input {
      border: 0;
      font-size: 0.9em;
      margin: 0;
      outline: none;
      padding: 2px 5px;
      width: 250px;

      &:disabled {
        background: rgb(0 0 0 / 5%);
      }
    }

    + * {
      margin-left: 5px;
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
  }

  > small {
    color: gray;
  }
}
</style>
