'use strict'

import { shallowMount } from '@vue/test-utils'
import Menu from '../../src/components/Menu'
import sinon from 'sinon'

const pointerEvent = {
  end: 'touchend',
  enter: 'mouseenter',
  leave: 'mouseleave'
}

const menu = [
  { title: 'First item', dropdown: 'first' },
  { title: 'Second item', dropdown: 'second' },
  { title: 'Third item' }
]

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Menu, {
    propsData: { menu },
    slots: {
      default: '<div>Content</div>'
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('vsmMenu Component', () => {
  describe('props', () => {
    it('[element] Default render a header element', () => {
      expect(wrapper.props('element')).toBe('header')
      expect(wrapper.element.tagName).toBe('HEADER')
    })

    it('[element] Can change root HTML element', () => {
      wrapper = shallowMount(Menu, {
        propsData: {
          element: 'div',
          menu
        }
      })

      expect(wrapper.props('element')).toBe('div')
      expect(wrapper.element.tagName).toBe('DIV')
    })
  })

  describe('DOM', () => {
    it('Number of elements', () => {
      expect(wrapper.findAll('.vsm-link').length).toBe(3)
    })

    it('Number of elements who has dropdown', () => {
      expect(wrapper.findAll('.vsm-link.vsm-has-dropdown').length).toBe(2)
    })
  })

  describe('computed', () => {
    it('Number of items having dropdown', () => {
      expect(wrapper.vm.menuHasDropdown.length).toBe(2)
    })

    it('Number of elements having dropdown', () => {
      expect(wrapper.vm.hasDropdownEls.length).toBe(2)
    })

    it('Number of dropdown sections', () => {
      expect(wrapper.vm.sectionEls.length).toBe(2)
    })
  })

  describe('events', () => {
    describe('global', () => {
      const eventEndStub = sinon.stub()
      const touchStartStub = sinon.stub()
      const touchMoveStub = sinon.stub()
      const resizeStub = sinon.stub()

      beforeEach(() => {
        // Override methods before document register this
        wrapper = shallowMount(Menu, {
          propsData: { menu },
          methods: {
            eventEndHandler: eventEndStub,
            touchStartHandler: touchStartStub,
            touchMoveHandler: touchMoveStub,
            windowResizeHandler: resizeStub
          }
        })
      })

      afterEach(() => {
        eventEndStub.reset()
        touchStartStub.reset()
        touchMoveStub.reset()
        resizeStub.reset()
      })

      it('register touchmove', () => {
        document.dispatchEvent(new TouchEvent('touchmove'))
        expect(touchMoveStub.called).toBeTruthy()
      })

      it('touchmove remove on destroy', () => {
        wrapper.destroy()

        document.dispatchEvent(new TouchEvent('touchmove'))
        expect(touchMoveStub.called).toBeFalsy()
      })

      it('register touchstart', () => {
        document.dispatchEvent(new TouchEvent('touchstart'))
        expect(touchStartStub.called).toBeTruthy()
      })

      it('touchstart remove on destroy', () => {
        wrapper.destroy()

        document.dispatchEvent(new TouchEvent('touchstart'))
        expect(touchStartStub.called).toBeFalsy()
      })

      it(`register ${pointerEvent.end}`, () => {
        document.body.dispatchEvent(new TouchEvent(pointerEvent.end))
        expect(eventEndStub.called).toBeTruthy()
      })

      it(`${pointerEvent.end} remove on destroy`, () => {
        wrapper.destroy()

        document.body.dispatchEvent(new TouchEvent(pointerEvent.end))
        expect(eventEndStub.called).toBeFalsy()
      })

      it('register resize', () => {
        window.dispatchEvent(new Event('resize'))
        expect(resizeStub.called).toBeTruthy()
      })

      it('resize remove on destroy', () => {
        wrapper.destroy()

        window.dispatchEvent(new Event('resize'))
        expect(resizeStub.called).toBeFalsy()
      })
    })

    describe('local', () => {
      it('Register events for each dropdown element', () => {
        wrapper.vm.hasDropdownEls.forEach((el) => {
          expect(el._vsm_menu).toBeTruthy()
        })
      })

      it('Register events for dropdown container', () => {
        expect(wrapper.vm.$refs.dropdownContainer._vsm_menu).toBeTruthy()
      })

      it('$emit on openDropdown, no active dropdown', () => {
        wrapper.vm.openDropdown(wrapper.vm.hasDropdownEls[1])
        expect(wrapper.emitted('open-dropdown')).toBeTruthy()
      })

      it('$emit on openDropdown, same active dropdown', () => {
        wrapper.vm._activeDropdown = wrapper.vm.hasDropdownEls[0]
        wrapper.vm.openDropdown(wrapper.vm.hasDropdownEls[0])
        expect(wrapper.emitted('open-dropdown')).toBeFalsy()
      })
    })
  })

  describe('methods', () => {
    it('Toggle dropdown, no active dropdown', () => {
      sinon.spy(wrapper.vm, 'openDropdown')

      const activeEl = wrapper.vm.hasDropdownEls[1]
      wrapper.vm.toggleDropdown(activeEl)

      expect(wrapper.vm.openDropdown.called).toBeTruthy()
      expect(wrapper.vm._activeDropdown).toBe(activeEl)
    })

    it('Toggle dropdown, has active dropdown', () => {
      sinon.spy(wrapper.vm, 'closeDropdown')

      const activeEl = wrapper.vm.hasDropdownEls[1]
      wrapper.vm._activeDropdown = activeEl
      wrapper.vm.toggleDropdown(activeEl)

      expect(wrapper.vm.closeDropdown.called).toBeTruthy()
      expect(wrapper.vm._activeDropdown).toBeUndefined()
    })

    it('Open Dropdown', () => {
      const activeEl = wrapper.vm.hasDropdownEls[1]
      wrapper.vm.openDropdown(activeEl)
      expect(wrapper.vm._activeDropdown).toBe(activeEl)
    })

    it('Close Dropdown', () => {
      wrapper.vm._activeDropdown = wrapper.vm.hasDropdownEls[1]
      wrapper.vm.closeDropdown()
      expect(wrapper.vm._activeDropdown).toBeUndefined()
    })
  })

  describe('render', () => {
    it('Register component with dropdown', () => {
      const component = { template: '<div>Content</div>' }

      wrapper = shallowMount(Menu, {
        propsData: {
          menu: [
            { title: 'First item', dropdown: 'first' },
            { title: 'Second item', dropdown: 'second', element: component }
          ]
        }
      })

      wrapper.vm.registerDropdownElsEvents()
    })
  })
})
