<template>
  <component
    :is="element"
    class="vsm-menu vsm-no-transition"
  >
    <nav>
      <ul
        ref="root"
        class="vsm-root"
      >
        <slot name="before-nav" />
        <li class="vsm-section vsm-section_menu vsm-mob-hide">
          <component
            :is="item.element || (item.dropdown ? 'button' : 'a')"
            v-for="(item, index) in menu"
            :ref="setLinkRef"
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
          v-for="(item, index) in menuHasDropdown"
          :ref="setSectionRef"
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
export default {
  name: 'VsmMenu',
  props: {
    /**
     * An array of objects that, when initialized, turn into HTML elements
     * @example
     *  [{
     *   // display menu item
     *   title: 'News',
     *   // activate dropdown content, must be unique!
     *   dropdown: 'news',
     *   // change the default HTML element (element/component)
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
     *   new_item: true,
     *  }]
     * },
     */
    menu: {
      type: Array,
      required: true
    },
    /**
     * Change root HTML element
     * @example div, section
     */
    element: {
      type: String,
      default: 'header'
    },
    /**
     * Problems displaying the menu? Try changing the two lower
     * properties to the average width and height
     * of your dropdown content.
     */
    baseWidth: {
      type: [Number, String],
      default: 380,
      validator: (val) => +val > 0
    },
    baseHeight: {
      type: [Number, String],
      default: 400,
      validator: (val) => +val > 0
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
    /**
     * By default, the dropdown list drops out on hover,
     * you can change this behavior on click
     */
    handler: {
      type: String,
      default: 'hover',
      validator: (val) => ['hover', 'click'].includes(val)
    },
    // TODO logic + docs
    disableWindowResizeHandler: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'open-dropdown', 'close-dropdown'
  ],
  data() {
    return {
      linkRefs: [],
      sectionRefs: []
    }
  },
  computed: {
    /**
     * Menu items that have dropdown content
     */
    menuHasDropdown () {
      return this.menu.filter(item => item.dropdown)
    },
    /**
     * HTML menu elements that have dropdown content
     */
    hasDropdownEls () {
      const elements = []

      this.linkRefs.forEach((link) => {
        const el = link.$el || link

        if (el.classList.contains('vsm-has-dropdown')) {
          elements.push(el)
        }
      })

      return elements
    },
    /**
     * HTML dropdown content
     */
    sectionEls () {
      return this.sectionRefs.map((el) => ({
        el,
        name: el.getAttribute('data-dropdown'),
        content: el.children[0]
      }))
    }
  },
  watch: {
    handler () {
      this.registerDropdownElsEvents(true)
      this.registerDropdownContainerEvents(true)
    }
  },
  beforeUpdate() {
    this.linkRefs = []
    this.sectionRefs = []
  },
  mounted () {
    // PointerEvent interface represents the state of a DOM event
    this.identifyPointerEvents()
    this.registerGlobalListeners()
    this.registerDropdownElsEvents()
    this.registerDropdownContainerEvents()
  },
  beforeUnmount () {
    this.removeGlobalListeners()
  },
  methods: {
    identifyPointerEvents () {
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
    registerDropdownElsEvents (force = false) {
      this.hasDropdownEls.forEach((el) => {
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
    registerDropdownContainerEvents (force = false) {
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
    toggleDropdown (el) {
      if (this._activeDropdown === el) {
        this.closeDropdown()
      } else {
        this.openDropdown(el)
      }
    },
    openDropdown (el) {
      if (this._activeDropdown === el) {
        return
      }

      this.$emit('open-dropdown', el)

      this.$el.classList.add('vsm-overlay-active', 'vsm-dropdown-active')
      this._activeDropdown = el
      this._activeDropdown.setAttribute('aria-expanded', 'true')
      this.hasDropdownEls.forEach(el => el.classList.remove('vsm-active'))
      el.classList.add('vsm-active')

      const activeDataDropdown = el.getAttribute('data-dropdown')
      let direction = 'vsm-left'

      this.sectionEls.forEach((item) => {
        item.el.classList.remove('vsm-active', 'vsm-left', 'vsm-right')

        if (item.name === activeDataDropdown) {
          item.el.setAttribute('aria-hidden', 'false')
          item.el.classList.add('vsm-active')
          direction = 'vsm-right'
          this._activeSectionElement = item
        } else {
          item.el.setAttribute('aria-hidden', 'true')
          item.el.classList.add(direction)
        }
      })

      this.resizeDropdown()
    },
    resizeDropdown () {
      if (!this._activeSectionElement) {
        return
      }

      const bodyWidth = document.documentElement.offsetWidth
      const rootRect = this.$el.getBoundingClientRect()
      const rect = this._activeDropdown.getBoundingClientRect()

      let { offsetHeight, offsetWidth } = this._activeSectionElement.content

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

      const ratioWidth = offsetWidth / +this.baseWidth
      const ratioHeight = offsetHeight / +this.baseHeight

      // Activate transition
      this.clearDisableTransitionTimeout()
      this.startEnableTransitionTimeout()

      this.$refs.dropdownContainer.style.transform = `translate(${centerPosition}px, ${this._activeDropdown.offsetTop}px)`
      this.$refs.dropdownContainer.style.width = `${offsetWidth}px`
      this.$refs.dropdownContainer.style.height = `${offsetHeight}px`

      this.$refs.arrow.style.transform = `translate(${leftPosition + (rect.width / 2)}px, ${this._activeDropdown.offsetTop}px) rotate(45deg)`
      this.$refs.background.style.transform = `translate(${centerPosition}px, ${this._activeDropdown.offsetTop}px) scaleX(${ratioWidth}) scaleY(${ratioHeight})`
      this.$refs.backgroundAlt.style.transform = `translateY(${this._activeSectionElement.content.children[0].offsetHeight / ratioHeight}px)`
    },
    closeDropdown () {
      if (!this._activeDropdown) {
        return
      }

      this.$emit('close-dropdown', this._activeDropdown)
      this.hasDropdownEls.forEach((el) => el.classList.remove('vsm-active'))

      this._activeSectionElement.el.setAttribute('aria-hidden', 'true')

      this.clearEnableTransitionTimeout()
      this.startDisableTransitionTimeout()

      this.$el.classList.remove('vsm-overlay-active', 'vsm-dropdown-active')

      this._activeDropdown.setAttribute('aria-expanded', 'false')
      this._activeSectionElement = undefined
      this._activeDropdown = undefined
    },
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Utils -
     * | ------------------------------------------------------------------------------------------------
     */
    startCloseDropdownTimeout () {
      this._closeDropdownTimeout = setTimeout(() => this.closeDropdown(), 50)
    },
    clearCloseDropdownTimeout () {
      clearTimeout(this._closeDropdownTimeout)
    },
    startEnableTransitionTimeout () {
      this._enableTransitionTimeout = setTimeout(() => this.$el.classList.remove('vsm-no-transition'), 50)
    },
    clearEnableTransitionTimeout () {
      clearTimeout(this._closeDropdownTimeout)
    },
    startDisableTransitionTimeout () {
      this._disableTransitionTimeout = setTimeout(() => this.$el.classList.add('vsm-no-transition'), 50)
    },
    clearDisableTransitionTimeout () {
      clearTimeout(this._disableTransitionTimeout)
    },
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Global Handlers -
     * | ------------------------------------------------------------------------------------------------
     */
    registerGlobalListeners () {
      window.addEventListener('resize', this.windowResizeHandler)
      document.addEventListener('touchmove', this.documentTouchMoveHandler)
      document.addEventListener('touchstart', this.documentTouchStartHandler)
      document.body.addEventListener(this._pointerEvent.end, this.documentEventEndHandler)
    },
    removeGlobalListeners () {
      window.removeEventListener('resize', this.windowResizeHandler)
      document.removeEventListener('touchmove', this.documentTouchMoveHandler)
      document.removeEventListener('touchstart', this.documentTouchStartHandler)
      document.body.removeEventListener(this._pointerEvent.end, this.documentEventEndHandler)
    },
    windowResizeHandler () {
      // Recalculates the dropdown only in cases where the screen width changes
      if (this._lastWindowWidth === window.innerWidth) {
        return
      }

      this._lastWindowWidth = window.innerWidth
      this.$el.classList.add('vsm-no-transition')

      this.resizeDropdown()
    },
    documentTouchMoveHandler () {
      this._isDragging = true
    },
    documentTouchStartHandler () {
      this._isDragging = false
    },
    documentEventEndHandler () {
      if (!this._isDragging) {
        this.closeDropdown()
      }
    },
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Refs -
     * | ------------------------------------------------------------------------------------------------
     */
    setLinkRef (ref) {
      this.linkRefs.push(ref)
    },
    setSectionRef (ref) {
      this.sectionRefs.push(ref)
    }
  }
}
</script>
