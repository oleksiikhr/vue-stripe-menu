<template>
  <div class="w--wrap">
    <base-title title="Customize" />
    <component :is="'style'">
      {{ styles }}
    </component>
    <pre>{{ styles }}</pre>
  </div>
</template>

<script>
import BaseTitle from './base/Title'

export default {
  components: {
    BaseTitle
  },
  data() {
    return {
      borderRadius: '4px',
      transformContent: '150px',
      arrowSize: '12px',
      arrowShadow: '-3px -3px 5px rgba(82, 95, 127, .04)',
      arrowBorderRadius: '4px 0 0 0',
      index: '1000',
      lineHeight: '50px',
      background: '#fff',
      backgroundAlt: '#f6f9fc',
      backgroundArrow: 'var(--vsm-background)',
      color: '#6772e5',
      colorHover: '#32325d',
      transition: '.25s',
      transitionLink: '.1s ease',
      shadow: '0 50px 100px -20px rgba(50, 50, 93, .25),' +
        '\n                0 30px 60px -30px rgba(0, 0, 0, .3),' +
        '\n                0 -18px 60px -10px rgba(0, 0, 0, .025)',

      mobHamburgerSize: '50px',
      mobCloseSize: '50px',
      mobBackground: 'var(--vsm-background)',
      mobShadow: 'var(--vsm-shadow)'
    }
  },
  computed: {
    styles() {
      return ''+
`.vsm-menu {
  /* Radius for dropdown content */
  --vsm-border-radius: ${this.borderRadius};

  /* Animating content in dropdown menu when changing active menu */
  --vsm-transform-content: ${this.transformContent};

  /* Dropdown arrow */
  --vsm-arrow-size: ${this.arrowSize};
  --vsm-arrow-shadow: ${this.arrowShadow};
  --vsm-arrow-border-radius: ${this.arrowBorderRadius};

  --vsm-index: ${this.index};
  --vsm-link-height: ${this.lineHeight};

  --vsm-background: ${this.background};
  --vsm-background-alt: ${this.backgroundAlt};
  --vsm-background-arrow: ${this.backgroundArrow};

  /* Primary color for links, hamburger/close button */
  --vsm-color: ${this.color};
  --vsm-color-hover: ${this.colorHover};

  /* Speed to change dropdown content and hover on links, hamburger */
  --vsm-transition: ${this.transition};
  --vsm-transition-link: ${this.transitionLink};

  /* Dropdown content (menu + mob) */
  --vsm-shadow: ${this.shadow};
}

.vsm-mob {
  --vsm-mob-hamburger-size: ${this.mobHamburgerSize};
  --vsm-mob-close-size: ${this.mobCloseSize};
  --vsm-mob-background: ${this.mobBackground};
  --vsm-mob-shadow: ${this.mobShadow};
}`
    }
  }
}
</script>
