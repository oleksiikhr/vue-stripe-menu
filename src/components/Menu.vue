<template>
  <component :is="element" class="vsm-menu vsm-no-transition">
    <nav class="vsm-nav">
      <ul ref="root" class="vsm-root">
        <slot name="before-nav" />
        <li ref="linkContainer" class="vsm-link-container vsm-mob-hide">
          <component
            :is="item.element || (item.dropdown ? 'button' : 'a')"
            v-for="(item, index) in menu"
            :key="index"
            :class="[
              'vsm-link',
              item.attributes?.class,
              {
                'vsm-has-dropdown': item.dropdown,
              },
            ]"
            :data-dropdown="item.dropdown"
            :data-align="item.align"
            :aria-haspopup="item.dropdown && 'true'"
            :aria-expanded="item.dropdown && 'false'"
            tabindex="0"
            v-bind="item.attributes"
            v-on="item.listeners || {}"
          >
            <slot name="title" :item="item" :index="index">
              <span>{{ item.title }}</span>
            </slot>
          </component>
        </li>
        <slot name="after-nav" />
      </ul>
    </nav>
    <div class="vsm-dropdown vsm-mob-hide">
      <div ref="background" class="vsm-background">
        <div ref="backgroundAlt" class="vsm-background-alt" />
      </div>
      <div ref="arrow" class="vsm-arrow" />
      <div ref="dropdownContainer" class="vsm-dropdown-container">
        <div
          v-for="(item, index) in itemsWithDropdown"
          :key="index"
          class="vsm-dropdown-section"
          :data-dropdown="item.dropdown"
          :data-align="item.align"
          aria-hidden="false"
        >
          <div class="vsm-dropdown-content">
            <slot :item="item" :index="index" />
          </div>
        </div>
      </div>
    </div>
  </component>
</template>

<script lang="ts">
/* eslint-disable no-underscore-dangle, no-param-reassign */
import { defineComponent } from 'vue';
import { pointerEvents } from '../utils/dom';
import { VsmHTMLElement, VsmItem } from '../types';

export default defineComponent({
  name: 'VsmMenu',
  props: {
    menu: {
      type: Array as () => Array<{
        // Display menu item, can be overridden with slots
        title: string; // 'News'
        // Activate dropdown content, must be unique!
        dropdown: string | undefined; // 'news'
        // Don't want a button element? Pass HTMLElement or Vue component
        element: string | undefined; // 'router-link'
        // Offset the position of the dropdown menu
        align: 'left' | 'center' | 'right';
        // Accepts v-bind
        attributes: { [key: string]: unknown };
        // Accepts v-on
        listeners: { [key: string]: (evt: Event) => unknown };
        // Other attributes
        [key: string]: unknown;
      }>,
      required: true,
    },
    /**
     * Change root HTMLElement
     * @example div, section
     */
    element: {
      type: String,
      default: 'header',
      validator: (val: string) => !!val,
    },
    /**
     * Dropdown content does not go beyond screen size
     * screen + this value
     */
    screenOffset: {
      type: [Number, String],
      default: 10,
      validator: (val: number | string) => 0 <= +val,
    },
    dropdownOffset: {
      type: [Number, String],
      default: 0,
      validator: (val: number | string) => 0 <= +val,
    },
    /**
     * By default, the dropdown list drops out on hover,
     * you can change this behavior on click
     */
    handler: {
      type: String as () => 'string' | 'hover',
      default: 'hover',
      validator: (val: string) => ['hover', 'click'].includes(val),
    },
    /**
     * Must be equals as $vsm-transition (scss variable)
     * @default .25s
     */
    transitionTimeout: {
      type: [Number, String],
      default: 250,
    },
    /**
     * Offset the position of the dropdown menu
     */
    align: {
      type: String,
      default: 'center',
      validator: (val: string) => ['left', 'center', 'right'].includes(val),
    },
  },
  emits: ['open-dropdown', 'close-dropdown'],
  data() {
    return {
      activeDropdown: undefined as HTMLElement | undefined,
      activeContainerItem: undefined as VsmItem | undefined,
      elementsWithDropdown: [] as VsmHTMLElement[],
      dropdownContainerItems: [] as Array<VsmItem>,
      pointerEvent: {} as { end: string; enter: string; leave: string },
      isDragging: false,
      closeDropdownTimeout: undefined as ReturnType<typeof setTimeout> | undefined,
      enableTransitionTimeout: undefined as ReturnType<typeof setTimeout> | undefined,
      disableTransitionTimeout: undefined as ReturnType<typeof setTimeout> | undefined,
      lastWindowWidth: undefined as number | undefined,
    };
  },
  computed: {
    itemsWithDropdown() {
      return this.menu.filter((item) => item.dropdown);
    },
  },
  watch: {
    async element() {
      await this.$nextTick();
      this.updateDataElements();
      this.registerDropdownElementsEvents();
    },
    handler() {
      this.registerDropdownElementsEvents(true);
      this.registerDropdownContainerEvents(true);
    },
    menu: {
      async handler() {
        await this.$nextTick();
        this.updateDataElements();
        this.registerDropdownElementsEvents();
      },
      deep: true,
    },
  },
  mounted() {
    this.identifyPointerEvents();
    this.registerGlobalListeners();
    this.updateDataElements();
    this.registerDropdownElementsEvents();
    this.registerDropdownContainerEvents();
  },
  beforeUnmount() {
    this.removeGlobalListeners();
  },
  methods: {
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Main Functions -
     * | ------------------------------------------------------------------------------------------------
     */
    toggleDropdown(element: HTMLElement) {
      if (this.activeDropdown === element) {
        this.closeDropdown();
      } else {
        this.openDropdown(element);
      }
    },
    openDropdown(element: HTMLElement) {
      if (this.activeDropdown === element) {
        return;
      }

      this.$emit('open-dropdown', element);

      this.$el.classList.add('vsm-overlay-active', 'vsm-dropdown-active');
      this.activeDropdown = element;
      this.activeDropdown.setAttribute('aria-expanded', 'true');
      this.elementsWithDropdown.forEach((el) => el.classList.remove('vsm-active'));
      element.classList.add('vsm-active');

      const activeDataDropdown = element.getAttribute('data-dropdown');
      let direction = 'vsm-left';

      this.dropdownContainerItems.forEach((item) => {
        item.el.classList.remove('vsm-active', 'vsm-left', 'vsm-right');

        if (item.name === activeDataDropdown) {
          item.el.setAttribute('aria-hidden', 'false');
          item.el.classList.add('vsm-active');
          direction = 'vsm-right';
          this.activeContainerItem = item;
        } else {
          item.el.setAttribute('aria-hidden', 'true');
          item.el.classList.add(direction);
        }
      });

      this.resizeDropdown();
    },
    closeDropdown() {
      if (!this.activeDropdown || !this.activeContainerItem) {
        return;
      }

      this.$emit('close-dropdown', this.activeDropdown);
      this.elementsWithDropdown.forEach((el) => el.classList.remove('vsm-active'));

      this.activeContainerItem.el.setAttribute('aria-hidden', 'true');

      this.clearEnableTransitionTimeout();
      this.startDisableTransitionTimeout();

      this.$el.classList.remove('vsm-overlay-active', 'vsm-dropdown-active');

      this.activeDropdown.setAttribute('aria-expanded', 'false');
      this.activeContainerItem = undefined;
      this.activeDropdown = undefined;
    },
    resizeDropdown() {
      if (!this.activeDropdown || !this.activeContainerItem) {
        return;
      }

      const bodyWidth = document.documentElement.offsetWidth;
      const rootRect = this.$el.getBoundingClientRect();
      const rect = this.activeDropdown.getBoundingClientRect();

      const { offsetHeight } = this.activeContainerItem.content;
      let { offsetWidth } = this.activeContainerItem.content;

      // Find the beginning of the position of the menu item
      const startPosition = rect.left - rootRect.left;

      // Step back from the button to the left so that the middle of
      // the content is found in the center of the element
      let position = null;
      switch (this.activeContainerItem.align || this.align) {
        case 'left':
          position = startPosition;
          break;
        case 'right':
          position = startPosition - offsetWidth + rect.width;
          break;
        default:
          // center
          position = startPosition - offsetWidth / 2 + rect.width / 2;
      }

      // Do not let go of the left side of the screen
      if (position + rootRect.left < +this.screenOffset) {
        position = +this.screenOffset - rootRect.left;
      }

      // Now also check the right side of the screen
      const rightOffset = position + rootRect.left + offsetWidth;
      if (rightOffset > bodyWidth - +this.screenOffset) {
        position -= rightOffset - bodyWidth + +this.screenOffset;

        // Recheck the left side of the screen
        if (position < +this.screenOffset - rootRect.left) {
          // Just set the menu to the full width of the screen
          position = +this.screenOffset - rootRect.left;
          offsetWidth = bodyWidth - +this.screenOffset * 2;
        }
      }

      // Possible blurring font with decimal values
      position = Math.round(position);

      const dropdownOffset = +this.dropdownOffset + this.activeDropdown.offsetTop;

      // Activate transition
      this.clearDisableTransitionTimeout();
      this.startEnableTransitionTimeout();

      const dropdownContainer = this.$refs.dropdownContainer as HTMLElement;
      dropdownContainer.style.transform = `translate(${position}px, ${dropdownOffset}px)`;
      dropdownContainer.style.width = `${offsetWidth}px`;
      dropdownContainer.style.height = `${offsetHeight}px`;

      (this.$refs.arrow as HTMLElement).style.transform = `translate(${Math.round(
        startPosition + rect.width / 2
      )}px, ${dropdownOffset}px) rotate(45deg)`;
      (this.$refs.background as HTMLElement).style.transform = `translate(${position}px, ${dropdownOffset}px)`;
      (this.$refs.background as HTMLElement).style.width = `${offsetWidth}px`;
      (this.$refs.background as HTMLElement).style.height = `${offsetHeight}px`;
      (this.$refs.backgroundAlt as HTMLElement).style.transform = `translateY(${
        (this.activeContainerItem.content.firstElementChild as HTMLElement).offsetHeight
      }px)`;
    },
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Timeout -
     * | ------------------------------------------------------------------------------------------------
     */
    startCloseDropdownTimeout() {
      this.closeDropdownTimeout = setTimeout(() => this.closeDropdown(), 50);
    },
    clearCloseDropdownTimeout() {
      clearTimeout(this.closeDropdownTimeout);
    },
    startEnableTransitionTimeout() {
      this.enableTransitionTimeout = setTimeout(() => this.$el.classList.remove('vsm-no-transition'), 50);
    },
    clearEnableTransitionTimeout() {
      clearTimeout(this.enableTransitionTimeout);
    },
    startDisableTransitionTimeout() {
      this.disableTransitionTimeout = setTimeout(
        () => this.$el.classList.add('vsm-no-transition'),
        +this.transitionTimeout
      );
    },
    clearDisableTransitionTimeout() {
      clearTimeout(this.disableTransitionTimeout);
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
          return;
        }

        if (el._vsmMenuHandlers) {
          Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) => {
            el.removeEventListener(eventName, fn);
          });
        }

        if ('hover' === this.handler) {
          el._vsmMenuHandlers = {
            focusin: () => {
              this.clearCloseDropdownTimeout();
              this.openDropdown(el);
            },
            [this.pointerEvent.enter]: (evt) => {
              if ('touch' !== (evt as PointerEvent).pointerType) {
                this.clearCloseDropdownTimeout();
                this.openDropdown(el);
              }
            },
            [this.pointerEvent.leave]: (evt) => {
              if ('touch' !== (evt as PointerEvent).pointerType) {
                this.startCloseDropdownTimeout();
              }
            },
          };
        } else {
          el._vsmMenuHandlers = {};
        }

        el._vsmMenuHandlers[this.pointerEvent.end] = (evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          this.toggleDropdown(el);
        };

        Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) => {
          el.addEventListener(eventName, fn);
        });

        el._vsmMenu = true;
      });
    },
    registerDropdownContainerEvents(force = false) {
      const el = this.$refs.dropdownContainer as VsmHTMLElement;

      // Events have been registered
      if (el._vsmMenu && !force) {
        return;
      }

      if (el._vsmMenuHandlers) {
        Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) => {
          el.removeEventListener(eventName, fn);
        });
      }

      if ('hover' === this.handler) {
        el._vsmMenuHandlers = {
          [this.pointerEvent.enter]: (evt) => {
            if ('touch' !== (evt as PointerEvent).pointerType) {
              this.clearCloseDropdownTimeout();
            }
          },
          [this.pointerEvent.leave]: (evt) => {
            if ('touch' !== (evt as PointerEvent).pointerType) {
              this.startCloseDropdownTimeout();
            }
          },
        };
      } else {
        el._vsmMenuHandlers = {};
      }

      el._vsmMenuHandlers[this.pointerEvent.end] = (evt) => {
        evt.stopPropagation();
      };

      Object.entries(el._vsmMenuHandlers).forEach(([eventName, fn]) => {
        el.addEventListener(eventName, fn);
      });

      el._vsmMenu = true;
    },
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Global Listener Handlers -
     * | ------------------------------------------------------------------------------------------------
     */
    registerGlobalListeners() {
      window.addEventListener('resize', this.windowResizeHandler);
      document.addEventListener('touchmove', this.documentTouchMoveHandler);
      document.addEventListener('touchstart', this.documentTouchStartHandler);
      document.body.addEventListener(this.pointerEvent.end, this.documentEventEndHandler);
    },
    removeGlobalListeners() {
      window.removeEventListener('resize', this.windowResizeHandler);
      document.removeEventListener('touchmove', this.documentTouchMoveHandler);
      document.removeEventListener('touchstart', this.documentTouchStartHandler);
      document.body.removeEventListener(this.pointerEvent.end, this.documentEventEndHandler);
    },
    windowResizeHandler() {
      // Recalculates the dropdown only in cases where the screen width changes
      if (this.lastWindowWidth === window.innerWidth) {
        return;
      }

      this.lastWindowWidth = window.innerWidth;

      if (this.activeDropdown) {
        this.$el.classList.add('vsm-no-transition');
        this.resizeDropdown();
        return;
      }

      // Don't do unnecessary actions
      if (!(this.$refs.background as HTMLElement).getAttribute('style')) {
        return;
      }

      // vsm-no-transition does not apply to dropdown (which has an opacity property),
      // with a long animation you can see unnecessary animation
      this.$el.classList.add('vsm-no-transition', 'vsm-no-transition_dropdown');
      setTimeout(() => this.$el.classList.remove('vsm-no-transition_dropdown'));

      // The dropdown position may remain on the right side of the screen,
      // causing a horizontal scroll
      this.closeDropdown();
      this.clearAllStyles();
    },
    documentTouchMoveHandler() {
      this.isDragging = true;
    },
    documentTouchStartHandler() {
      this.isDragging = false;
    },
    documentEventEndHandler() {
      if (!this.isDragging) {
        this.closeDropdown();
      }
    },
    /*
     * | ------------------------------------------------------------------------------------------------
     * | - Utils -
     * | ------------------------------------------------------------------------------------------------
     */
    identifyPointerEvents() {
      this.pointerEvent = pointerEvents();
    },
    updateDataElements() {
      this.elementsWithDropdown = Array.from((this.$refs.linkContainer as HTMLElement).children).filter((el) =>
        el.classList.contains('vsm-has-dropdown')
      ) as VsmHTMLElement[];

      this.dropdownContainerItems = Array.from((this.$refs.dropdownContainer as HTMLElement).children).map((el) => ({
        el: el as HTMLElement,
        name: el.getAttribute('data-dropdown') as string,
        align: el.getAttribute('data-align') as string,
        content: el.firstElementChild as VsmHTMLElement,
      }));
    },
    clearAllStyles() {
      (this.$refs.dropdownContainer as HTMLElement).removeAttribute('style');
      (this.$refs.arrow as HTMLElement).removeAttribute('style');
      (this.$refs.background as HTMLElement).removeAttribute('style');
      (this.$refs.backgroundAlt as HTMLElement).removeAttribute('style');
    },
  },
});
</script>
