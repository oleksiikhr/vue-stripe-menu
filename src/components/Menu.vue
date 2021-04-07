<template>
  <component
    :is="element"
    class="vsm-menu vsm-no-transition"
  >
    <nav class="vsm-nav">
      <ul
        ref="root"
        class="vsm-root"
      >
        <slot name="before-nav" />
        <li
          ref="linkContainer"
          class="vsm-section vsm-section_menu vsm-mob-hide"
        >
          <component
            :is="item.element || (item.dropdown ? 'button' : 'a')"
            v-for="(item, index) in menu"
            :key="index"
            :class="['vsm-link', item.attributes ? item.attributes.class : null, {
              'vsm-has-dropdown': item.dropdown
            }]"
            :data-dropdown="item.dropdown"
            :aria-haspopup="item.dropdown && 'true'"
            :aria-expanded="item.dropdown && 'false'"
            tabindex="0"
            v-bind="item.attributes"
            v-on="item.listeners || {}"
          >
            <slot
              name="title"
              :item="item"
              :index="index"
            >
              <span>{{ item.title }}</span>
            </slot>
          </component>
        </li>
        <slot name="after-nav" />
      </ul>
    </nav>
    <div class="vsm-dropdown vsm-mob-hide">
      <div
        ref="background"
        class="vsm-background"
      >
        <div
          ref="backgroundAlt"
          class="vsm-background-alt"
        />
      </div>
      <div
        ref="arrow"
        class="vsm-arrow"
      />
      <div
        ref="dropdownContainer"
        class="vsm-dropdown-container"
      >
        <div
          v-for="(item, index) in itemsWithDropdown"
          :key="index"
          class="vsm-dropdown-section"
          :data-dropdown="item.dropdown"
          aria-hidden="false"
        >
          <div class="vsm-dropdown-content">
            <slot
              :item="item"
              :index="index"
            />
          </div>
        </div>
      </div>
    </div>
  </component>
</template>

<script>
// This values depends on .vsm-background styles (width/height)
const BASE_WIDTH = 400;
const BASE_HEIGHT = 400;

export default {
  name: 'VsmMenu',
  props: {
    /**
     * @example
     *  [{
     *   // display menu item, can be overridden with slots
     *   title: 'News',
     *   // activate dropdown content, must be unique!
     *   dropdown: 'news',
     *   // change the default HTMLElement (element/global component)
     *   element: 'router-link',
     *   // v-bind accepts
     *   attributes: {
     *     class: ['my-class1', { 'my-class2': true }],
     *     'data-cool': 'yes'
     *   },
     *   // v-on accepts
     *   listeners: {
     *     mouseover: (evt) => console.log('news hover', evt)
     *   },
     *   // other attributes
     *   customAttribute: true,
     *  }]
     * },
     */
    menu: {
      type: Array,
      required: true
    },
    /**
     * Change root HTMLElement
     * @example div, section
     */
    element: {
      type: String,
      default: 'header',
      validator: (val) => !!val
    },
    /**
     * Dropdown content does not go beyond screen size
     * screen + this value
     */
    screenOffset: {
      type: [Number, String],
      default: 10,
      validator: (val) => +val >= 0
    },
    dropdownOffset: {
      type: [Number, String],
      default: 0,
      validator: (val) => +val >= 0
    },
    /**
     * By default, the dropdown list drops out on hover,
     * you can change this behavior on click
     */
    handler: {
      type: String,
      default: 'hover',
      validator: (val) => ['hover', 'click'].includes(val)
    }
  },
  emits: [
    'open-dropdown', 'close-dropdown'
  ],
  data() {
    return {
      elementsWithDropdown: [],
      dropdownContainerItems: []
    }
  },
  computed: {
    itemsWithDropdown() {
      return this.menu.filter(item => item.dropdown)
    }
  },
  watch: {
    handler() {
      this.registerDropdownElementsEvents(true)
      this.registerDropdownContainerEvents(true)
    },
    menu: {
      async handler() {
        await this.$nextTick()
        this.updateDataElements()
        this.registerDropdownElementsEvents()
      },
      deep: true
    }
  },
  mounted() {
    this.identifyPointerEvents()
    this.registerGlobalListeners()
    this.updateDataElements()
    this.registerDropdownElementsEvents()
    this.registerDropdownContainerEvents()
  },
  beforeUnmount() {
    this.removeGlobalListeners()
  },
  methods: {
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Main Functions -
     * | ------------------------------------------------------------------------------------------------
     */
    toggleDropdown(el) {
      if (this._activeDropdown === el) {
        this.closeDropdown()
      } else {
        this.openDropdown(el)
      }
    },
    openDropdown(el) {
      if (this._activeDropdown === el) {
        return
      }

      this.$emit('open-dropdown', el)

      this.$el.classList.add('vsm-overlay-active', 'vsm-dropdown-active')
      this._activeDropdown = el
      this._activeDropdown.setAttribute('aria-expanded', 'true')
      this.elementsWithDropdown.forEach(el => el.classList.remove('vsm-active'))
      el.classList.add('vsm-active')

      const activeDataDropdown = el.getAttribute('data-dropdown')
      let direction = 'vsm-left'

      this.dropdownContainerItems.forEach((item) => {
        item.el.classList.remove('vsm-active', 'vsm-left', 'vsm-right')

        if (item.name === activeDataDropdown) {
          item.el.setAttribute('aria-hidden', 'false')
          item.el.classList.add('vsm-active')
          direction = 'vsm-right'
          this._activeContainerItem = item
        } else {
          item.el.setAttribute('aria-hidden', 'true')
          item.el.classList.add(direction)
        }
      })

      this.resizeDropdown()
    },
    closeDropdown() {
      if (!this._activeDropdown) {
        return
      }

      this.$emit('close-dropdown', this._activeDropdown)
      this.elementsWithDropdown.forEach((el) => el.classList.remove('vsm-active'))

      this._activeContainerItem.el.setAttribute('aria-hidden', 'true')

      this.clearEnableTransitionTimeout()
      this.startDisableTransitionTimeout()

      this.$el.classList.remove('vsm-overlay-active', 'vsm-dropdown-active')

      this._activeDropdown.setAttribute('aria-expanded', 'false')
      this._activeContainerItem = undefined
      this._activeDropdown = undefined
    },
    resizeDropdown() {
      if (!this._activeContainerItem) {
        return
      }

      const bodyWidth = document.documentElement.offsetWidth
      const rootRect = this.$el.getBoundingClientRect()
      const rect = this._activeDropdown.getBoundingClientRect()

      let { offsetHeight, offsetWidth } = this._activeContainerItem.content

      // Find the beginning of a menu item
      const leftPosition = rect.left - rootRect.left

      // Step back from the button to the left so that the middle of
      // the content is found in the center of the element
      let centerPosition = leftPosition - (offsetWidth / 2) + (rect.width / 2)

      // Do not let go of the left side of the screen
      if (centerPosition + rootRect.left < +this.screenOffset) {
        centerPosition = +this.screenOffset - rootRect.left
      }

      // Now also check the right side of the screen
      const rightOffset = centerPosition + rootRect.left + offsetWidth
      if (rightOffset > bodyWidth - +this.screenOffset) {
        centerPosition -= (rightOffset - bodyWidth + +this.screenOffset)

        // Recheck the left side of the screen
        if (centerPosition < +this.screenOffset - rootRect.left) {
          // Just set the menu to the full width of the screen
          centerPosition = +this.screenOffset - rootRect.left
          offsetWidth = bodyWidth - +this.screenOffset * 2
        }
      }

      // Possible blurring font with decimal values
      centerPosition = Math.round(centerPosition)

      const dropdownOffset = +this.dropdownOffset + this._activeDropdown.offsetTop
      const ratioWidth = offsetWidth / BASE_WIDTH
      const ratioHeight = offsetHeight / BASE_HEIGHT

      // Activate transition
      this.clearDisableTransitionTimeout()
      this.startEnableTransitionTimeout()

      // offsetWidth+1 - required for content with a width of, for example 15.23 (offsetWidth = 15),
      // due to which the content is displayed incorrectly. Use getBoundingClientRect()
      // precision is also inappropriate due to instability
      this.$refs.dropdownContainer.style.transform = `translate(${centerPosition}px, ${dropdownOffset}px)`
      this.$refs.dropdownContainer.style.width = `${offsetWidth+1}px`
      this.$refs.dropdownContainer.style.height = `${offsetHeight}px`

      this.$refs.arrow.style.transform = `translate(${leftPosition + (rect.width / 2)}px, ${dropdownOffset}px) rotate(45deg)`
      this.$refs.background.style.transform = `translate(${centerPosition}px, ${dropdownOffset}px) scaleX(${ratioWidth}) scaleY(${ratioHeight})`
      this.$refs.backgroundAlt.style.transform = `translateY(${this._activeContainerItem.content.firstElementChild.offsetHeight / ratioHeight}px)`
    },
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Timeout -
     * | ------------------------------------------------------------------------------------------------
     */
    startCloseDropdownTimeout() {
      this._closeDropdownTimeout = setTimeout(() => this.closeDropdown(), 50)
    },
    clearCloseDropdownTimeout() {
      clearTimeout(this._closeDropdownTimeout)
    },
    startEnableTransitionTimeout() {
      this._enableTransitionTimeout = setTimeout(() => this.$el.classList.remove('vsm-no-transition'), 50)
    },
    clearEnableTransitionTimeout() {
      clearTimeout(this._enableTransitionTimeout)
    },
    startDisableTransitionTimeout() {
      this._disableTransitionTimeout = setTimeout(() => this.$el.classList.add('vsm-no-transition'), 50)
    },
    clearDisableTransitionTimeout() {
      clearTimeout(this._disableTransitionTimeout)
    },
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Events -
     * | ------------------------------------------------------------------------------------------------
     */
    registerDropdownElementsEvents(force = false) {
      this.elementsWithDropdown.forEach((el) => {
        // Events have been registered
        if (el._vsmMenu && !force) {
          return
        }

        if (el._vsmMenuHandlers) {
          Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) => {
            el.removeEventListener(eventName, fn)
          })
        }

        if (this.handler === 'hover') {
          el._vsmMenuHandlers = {
            focusin: () => {
              this.clearCloseDropdownTimeout()
              this.openDropdown(el)
            },
            [this._pointerEvent.enter]: (evt) => {
              if (evt.pointerType !== 'touch') {
                this.clearCloseDropdownTimeout()
                this.openDropdown(el)
              }
            },
            [this._pointerEvent.leave]: (evt) => {
              if (evt.pointerType !== 'touch') {
                this.startCloseDropdownTimeout()
              }
            }
          }
        } else {
          el._vsmMenuHandlers = {}
        }

        el._vsmMenuHandlers[this._pointerEvent.end] = (evt) => {
          evt.preventDefault()
          evt.stopPropagation()
          this.toggleDropdown(el)
        }

        Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) => {
          el.addEventListener(eventName, fn)
        })

        el._vsmMenu = true
      })
    },
    registerDropdownContainerEvents(force = false) {
      const el = this.$refs.dropdownContainer

      // Events have been registered
      if (el._vsmMenu && !force) {
        return
      }

      if (el._vsmMenuHandlers) {
        Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) => {
          el.removeEventListener(eventName, fn)
        })
      }

      if (this.handler === 'hover') {
        el._vsmMenuHandlers = {
          [this._pointerEvent.enter]: (evt) => {
            if (evt.pointerType !== 'touch') {
              this.clearCloseDropdownTimeout()
            }
          },
          [this._pointerEvent.leave]: (evt) => {
            if (evt.pointerType !== 'touch') {
              this.startCloseDropdownTimeout()
            }
          }
        }
      } else {
        el._vsmMenuHandlers = {}
      }

      el._vsmMenuHandlers[this._pointerEvent.end] = (evt) => {
        evt.stopPropagation()
      }

      Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) => {
        el.addEventListener(eventName, fn)
      })

      el._vsmMenu = true
    },
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Global Listener Handlers -
     * | ------------------------------------------------------------------------------------------------
     */
    registerGlobalListeners() {
      window.addEventListener('resize', this.windowResizeHandler)
      document.addEventListener('touchmove', this.documentTouchMoveHandler)
      document.addEventListener('touchstart', this.documentTouchStartHandler)
      document.body.addEventListener(this._pointerEvent.end, this.documentEventEndHandler)
    },
    removeGlobalListeners() {
      window.removeEventListener('resize', this.windowResizeHandler)
      document.removeEventListener('touchmove', this.documentTouchMoveHandler)
      document.removeEventListener('touchstart', this.documentTouchStartHandler)
      document.body.removeEventListener(this._pointerEvent.end, this.documentEventEndHandler)
    },
    windowResizeHandler() {
      // Recalculates the dropdown only in cases where the screen width changes
      if (this._lastWindowWidth === window.innerWidth) {
        return
      }

      this._lastWindowWidth = window.innerWidth
      this.$el.classList.add('vsm-no-transition')

      this.resizeDropdown()
    },
    documentTouchMoveHandler() {
      this._isDragging = true
    },
    documentTouchStartHandler() {
      this._isDragging = false
    },
    documentEventEndHandler() {
      if (!this._isDragging) {
        this.closeDropdown()
      }
    },
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Utils -
     * | ------------------------------------------------------------------------------------------------
     */
    identifyPointerEvents() {
      this._pointerEvent = window.PointerEvent ? {
        end: 'pointerup',
        enter: 'pointerenter',
        leave: 'pointerleave'
      } : {
        end: 'touchend',
        enter: 'mouseenter',
        leave: 'mouseleave'
      }
    },
    updateDataElements() {
      this.elementsWithDropdown = Array.from(this.$refs.linkContainer.children)
        .filter((el) => el.classList.contains('vsm-has-dropdown'))

      this.dropdownContainerItems = Array.from(this.$refs.dropdownContainer.children)
        .map((el) => ({ el, name: el.getAttribute('data-dropdown'), content: el.firstElementChild }))
    }
  }
}
</script>
