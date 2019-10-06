<template>
  <header class="vsm-menu vsm-no-transition">
    <nav>
      <ul
        ref="root"
        class="vsm-root"
      >
        <slot name="before-nav" />
        <li class="vsm-section vsm-section_menu">
          <component
            ref="links"
            v-for="(item, index) in menu"
            :key="index"
            :is="item.element || (item.dropdown ? 'button' : 'a')"
            :class="['vsm-link', {
              'vsm-has-dropdown': item.dropdown
            }]"
            :data-dropdown="item.dropdown"
            :aria-haspopup="item.dropdown && 'true'"
            :aria-expanded="item.dropdown && 'false'"
            v-bind="item.attributes"
            v-on="item.listeners"
          >
            <slot name="title" :item="item" :index="index">
              <span>{{ item.title }}</span>
            </slot>
          </component>
        </li>
        <slot name="after-nav" />
      </ul>
    </nav>
    <div class="vsm-dropdown">
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
          ref="sections"
          v-for="(item, index) in menuHasDropdown"
          :key="index"
          class="vsm-dropdown-section"
          :data-dropdown="item.dropdown"
          aria-hidden="false"
        >
          <div class="vsm-dropdown-content">
            <slot :item="item" :index="index" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// The PointerEvent interface represents the state of a DOM event
const pointerEvent = window.PointerEvent ? {
  end: 'pointerup',
  enter: 'pointerenter',
  leave: 'pointerleave'
} : {
  end: 'touchend',
  enter: 'mouseenter',
  leave: 'mouseleave'
}

export default {
  name: 'vsmMenu',
  props: {
    menu: {
      type: Array,
      required: true
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
    }
  },
  computed: {
    menuHasDropdown () {
      return this.menu.filter(item => item.dropdown)
    }
  },
  created () {
    this._touchMoveHandler = () => {
      this._isDragging = true
    }

    this._touchStartHandler = () => {
      this._isDragging = false
    }

    this._pointerEventEndHandler = () => {
      if (!this._isDragging) {
        this.closeDropdown()
      }
    }

    document.addEventListener('touchmove', this._touchMoveHandler)
    document.addEventListener('touchstart', this._touchStartHandler)
    document.body.addEventListener(pointerEvent.end, this._pointerEventEndHandler)
  },
  mounted () {
    this._linksHasDropdown = this.$refs.links.filter((el) => {
      return el.classList.contains('vsm-has-dropdown')
    })

    this._sections = this.$refs.sections.map((el) => {
      return {
        el,
        name: el.getAttribute('data-dropdown'),
        content: el.children[0]
      }
    })

    this._linksHasDropdown.forEach((el) => {
      el.addEventListener(pointerEvent.end, (evt) => {
        evt.preventDefault()
        evt.stopPropagation()
        this.toggleDropdown(el)
      })
      el.addEventListener('focusin', () => {
        this.stopCloseTimeout()
        this.openDropdown(el)
      })
      el.addEventListener(pointerEvent.enter, (evt) => {
        if (evt.pointerType !== 'touch') {
          this.stopCloseTimeout()
          this.openDropdown(el)
        }
      })
      el.addEventListener(pointerEvent.leave, (evt) => {
        if (evt.pointerType !== 'touch') {
          this.startCloseTimeout()
        }
      })
    })

    this.$refs.dropdownContainer.addEventListener(pointerEvent.end, (evt) => {
      evt.stopPropagation()
    })
    this.$refs.dropdownContainer.addEventListener(pointerEvent.enter, (evt) => {
      if (evt.pointerType !== 'touch') {
        this.stopCloseTimeout()
      }
    })
    this.$refs.dropdownContainer.addEventListener(pointerEvent.leave, (evt) => {
      if (evt.pointerType !== 'touch') {
        this.startCloseTimeout()
      }
    })
  },
  beforeDestroy () {
    document.removeEventListener('touchmove', this._touchMoveHandler)
    document.removeEventListener('touchstart', this._touchStartHandler)
    document.body.removeEventListener(pointerEvent.end, this._pointerEventEndHandler)
  },
  methods: {
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

      this.$el.classList.add('vsm-overlay-active')
      this.$el.classList.add('vsm-dropdown-active')
      this._activeDropdown = el
      this._activeDropdown.setAttribute('aria-expanded', 'true')
      this._linksHasDropdown.forEach(el => el.classList.remove('vsm-active'))
      el.classList.add('vsm-active')

      const activeDataDropdown = el.getAttribute('data-dropdown')
      let direction = 'vsm-left'
      let offsetWidth
      let offsetHeight
      let content

      this._sections.forEach((item) => {
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

      const ratioWidth = offsetWidth / +this.baseWidth
      const ratioHeight = offsetHeight / +this.baseHeight
      const rect = el.getBoundingClientRect()
      const pos = Math.round(Math.max(rect.left + rect.width / 2 - offsetWidth / 2, 10))
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

      this._linksHasDropdown.forEach((el) => {
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
    }
  }
}
</script>
