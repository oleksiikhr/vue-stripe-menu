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
            ref="links"
            :key="index"
            :class="['vsm-link', item.attributes ? item.attributes.class : null, {
              'vsm-has-dropdown': item.dropdown
            }]"
            :data-dropdown="item.dropdown"
            :aria-haspopup="item.dropdown && 'true'"
            :aria-expanded="item.dropdown && 'false'"
            v-bind="item.attributes"
            v-on="item.listeners"
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
          ref="sections"
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
import Vue from 'vue'

export default {
  name: 'VsmMenu',
  props: {
    /**
     * An array of objects that, when initialized,
     * turn into HTML elements
     * @example
     *  [{
     *   // display menu item
     *   title: 'News',
     *   // activate dropdown content, must be unique!
     *   dropdown: 'news',
     *   // change the HTML element to ours
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
     * @example
     *  div
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
      const links = this.$refs.links || []
      const elements = []

      links.forEach((link) => {
        const el = link instanceof Vue ? link.$el : link

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
      const sections = this.$refs.sections || []

      return sections.map((el) => ({
        el,
        name: el.getAttribute('data-dropdown'),
        content: el.children[0]
      }))
    }
  },
  watch: {
    handler (val) {
      this.handler = val
      this.registerDropdownElsEvents(true)
      this.registerDropdownContainerEvents(true)
    }
  },
  mounted () {
    // PointerEvent interface represents the state of a DOM event
    this._pointerEvent = window.PointerEvent ? {
      end: 'pointerup',
      enter: 'pointerenter',
      leave: 'pointerleave'
    } : {
      end: 'touchend',
      enter: 'mouseenter',
      leave: 'mouseleave'
    }

    this.registerGlobalEvents()
    this.registerDropdownElsEvents()
    this.registerDropdownContainerEvents()
  },
  beforeDestroy () {
    this.unregisterGlobalEvents()
  },
  methods: {
    registerGlobalEvents () {
      window.addEventListener('resize', this.windowResizeHandler)
      document.addEventListener('touchmove', this.touchMoveHandler)
      document.addEventListener('touchstart', this.touchStartHandler)
      document.body.addEventListener(this._pointerEvent.end, this.eventEndHandler)
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
              this.stopCloseTimeout()
              this.openDropdown(el)
            },
            [this._pointerEvent.enter]: (evt) => {
              if (evt.pointerType !== 'touch') {
                this.stopCloseTimeout()
                this.openDropdown(el)
              }
            },
            [this._pointerEvent.leave]: (evt) => {
              if (evt.pointerType !== 'touch') {
                this.startCloseTimeout()
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
              this.stopCloseTimeout()
            }
          },
          [this._pointerEvent.leave]: (evt) => {
            if (evt.pointerType !== 'touch') {
              this.startCloseTimeout()
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
    unregisterGlobalEvents () {
      window.removeEventListener('resize', this.windowResizeHandler)
      document.removeEventListener('touchmove', this.touchMoveHandler)
      document.removeEventListener('touchstart', this.touchStartHandler)
      document.body.removeEventListener(this._pointerEvent.end, this.eventEndHandler)
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

      this.$el.classList.add('vsm-overlay-active')
      this.$el.classList.add('vsm-dropdown-active')
      this._activeDropdown = el
      this._activeDropdown.setAttribute('aria-expanded', 'true')
      this.hasDropdownEls.forEach(el => el.classList.remove('vsm-active'))
      el.classList.add('vsm-active')

      const activeDataDropdown = el.getAttribute('data-dropdown')
      let direction = 'vsm-left'
      let offsetWidth
      let offsetHeight
      let content

      this.sectionEls.forEach((item) => {
        item.el.classList.remove('vsm-active')
        item.el.classList.remove('vsm-left')
        item.el.classList.remove('vsm-right')

        if (item.name === activeDataDropdown) {
          item.el.setAttribute('aria-hidden', 'false')
          item.el.classList.add('vsm-active')
          direction = 'vsm-right'
          offsetWidth = item.content.offsetWidth
          offsetHeight = item.content.offsetHeight
          content = item.content
        } else {
          item.el.classList.add(direction)
          item.el.setAttribute('aria-hidden', 'true')
        }
      })

      const bodyWidth = document.documentElement.offsetWidth
      const rootRect = this.$el.getBoundingClientRect()
      const rect = el.getBoundingClientRect()

      // Find the beginning of a menu item
      const leftPosition = rect.left - rootRect.left

      // Step back from the button to the left so that
      // the middle of the content is found in the
      // center of the element
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
      clearTimeout(this._disableTransitionTimeout)
      this._enableTransitionTimeout = setTimeout(() => {
        this.$el.classList.remove('vsm-no-transition')
      }, 50)

      this.$refs.dropdownContainer.style.transform = `translate(${centerPosition}px, ${el.offsetTop}px)`
      this.$refs.dropdownContainer.style.width = `${offsetWidth}px`
      this.$refs.dropdownContainer.style.height = `${offsetHeight}px`

      this.$refs.arrow.style.transform = `translate(${leftPosition + (rect.width / 2)}px, ${el.offsetTop}px) rotate(45deg)`
      this.$refs.background.style.transform = `translate(${centerPosition}px, ${el.offsetTop}px) scaleX(${ratioWidth}) scaleY(${ratioHeight})`
      this.$refs.backgroundAlt.style.transform = `translateY(${content.children[0].offsetHeight / ratioHeight}px)`
    },
    closeDropdown () {
      if (!this._activeDropdown) {
        return
      }

      this.$emit('close-dropdown', this._activeDropdown)

      this.hasDropdownEls.forEach((el) => {
        el.classList.remove('vsm-active')
      })

      const activeDropdownSection = this.$refs.dropdownContainer.querySelector('[aria-hidden="false"]')
      if (activeDropdownSection) {
        activeDropdownSection.setAttribute('aria-hidden', 'true')
      }

      clearTimeout(this._enableTransitionTimeout)

      this._disableTransitionTimeout = setTimeout(() => {
        this.$el.classList.add('vsm-no-transition')
      }, 50)

      this.$el.classList.remove('vsm-overlay-active')
      this.$el.classList.remove('vsm-dropdown-active')

      this._activeDropdown.setAttribute('aria-expanded', 'false')
      this._activeDropdown = undefined
    },
    startCloseTimeout () {
      this._closeDropdownTimeout = setTimeout(() => {
        this.closeDropdown()
      }, 50)
    },
    stopCloseTimeout () {
      clearTimeout(this._closeDropdownTimeout)
    },
    touchMoveHandler () {
      this._isDragging = true
    },
    touchStartHandler () {
      this._isDragging = false
    },
    eventEndHandler () {
      if (!this._isDragging) {
        this.closeDropdown()
      }
    },
    /*
     * When the screen is reduced, the active drop-down content
     * does not change its size, because of this,
     * horizontal scrolling may occur
     */
    windowResizeHandler () {
      // Block dropdown from closing on scroll
      // (show/hide browser top header)
      if (this._lastWindowWidth === window.innerWidth) {
        return
      }

      this._lastWindowWidth = window.innerWidth

      this.$refs.dropdownContainer.style = null
      this.$refs.arrow.style = null
      this.$refs.background.style = null
      this.$refs.backgroundAlt.style = null

      this.closeDropdown()
    }
  }
}
</script>
