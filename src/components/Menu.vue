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
            :class="['vsm-link', {
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
export default {
  name: 'VsmMenu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    element: {
      type: String,
      default: 'header'
    },
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
    screenOffset: {
      type: [Number, String],
      default: 10,
      validator: (val) => +val >= 0
    }
  },
  computed: {
    menuHasDropdown () {
      return this.menu.filter(item => item.dropdown)
    },
    hasDropdownEls () {
      const links = this.$refs.links || []

      return links.filter((el) => {
        return el.classList.contains('vsm-has-dropdown')
      })
    },
    sectionEls () {
      const sections = this.$refs.sections || []

      return sections.map((el) => ({
        el,
        name: el.getAttribute('data-dropdown'),
        content: el.children[0]
      }))
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
      document.addEventListener('touchmove', this.touchMoveHandler)
      document.addEventListener('touchstart', this.touchStartHandler)
      document.body.addEventListener(this._pointerEvent.end, this.eventEndHandler)
    },
    registerDropdownElsEvents () {
      this.hasDropdownEls.forEach((el) => {
        // Events have been registered
        if (el._vsm_menu) {
          return
        }

        el.addEventListener('focusin', () => {
          this.stopCloseTimeout()
          this.openDropdown(el)
        })

        el.addEventListener(this._pointerEvent.enter, (evt) => {
          if (evt.pointerType !== 'touch') {
            this.stopCloseTimeout()
            this.openDropdown(el)
          }
        })

        el.addEventListener(this._pointerEvent.end, (evt) => {
          evt.preventDefault()
          evt.stopPropagation()
          this.toggleDropdown(el)
        })

        el.addEventListener(this._pointerEvent.leave, (evt) => {
          if (evt.pointerType !== 'touch') {
            this.startCloseTimeout()
          }
        })

        el._vsm_menu = true
      })
    },
    registerDropdownContainerEvents () {
      // Events have been registered
      if (this.$refs.dropdownContainer._vsm_menu) {
        return
      }

      this.$refs.dropdownContainer.addEventListener(this._pointerEvent.end, (evt) => {
        evt.stopPropagation()
      })

      this.$refs.dropdownContainer.addEventListener(this._pointerEvent.enter, (evt) => {
        if (evt.pointerType !== 'touch') {
          this.stopCloseTimeout()
        }
      })

      this.$refs.dropdownContainer.addEventListener(this._pointerEvent.leave, (evt) => {
        if (evt.pointerType !== 'touch') {
          this.startCloseTimeout()
        }
      })

      this.$refs.dropdownContainer._vsm_menu = true
    },
    unregisterGlobalEvents () {
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

      const bodyOffset = document.body.offsetWidth

      // Crop the width of the content if it goes beyond the width of the screen
      if (offsetWidth > bodyOffset - (+this.screenOffset * 2)) {
        offsetWidth = bodyOffset - (+this.screenOffset * 2)
      }

      const ratioWidth = offsetWidth / +this.baseWidth
      const ratioHeight = offsetHeight / +this.baseHeight
      const rect = el.getBoundingClientRect()
      let pos = Math.round(Math.max(rect.left + rect.width / 2 - offsetWidth / 2, 10))

      const rightSide = rect.left + rect.width / 2 + offsetWidth / 2
      if (rightSide > bodyOffset) {
        pos = pos - (rightSide - bodyOffset) - +this.screenOffset
      }

      clearTimeout(this._disableTransitionTimeout)

      this._enableTransitionTimeout = setTimeout(() => {
        this.$el.classList.remove('vsm-no-transition')
      }, 50)

      this.$refs.dropdownContainer.style.transform = `translateX(${pos}px)`
      this.$refs.dropdownContainer.style.width = `${offsetWidth}px`
      this.$refs.dropdownContainer.style.height = `${offsetHeight}px`

      this.$refs.arrow.style.transform = `translateX(${Math.round(rect.left + rect.width / 2)}px) rotate(45deg)`
      this.$refs.background.style.transform = `translateX(${pos}px) scaleX(${ratioWidth}) scaleY(${ratioHeight})`
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
    }
  }
}
</script>
