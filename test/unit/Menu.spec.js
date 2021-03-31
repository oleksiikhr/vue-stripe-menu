'use strict'

import { mount } from '@vue/test-utils'
import Menu from '../../src/components/Menu'
import sinon from 'sinon'
import 'babel-polyfill'

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

describe('vsmMenu Component', () => {
  describe('props', () => {
    describe('element', () => {
      it('Default render a header element', () => {
        const wrapper = mount(Menu, {
          propsData: { menu },
          slots: { default: '<div>Content</div>' }
        })

        expect(wrapper.props('element')).toBe('header')
        expect(wrapper.element.tagName).toBe('HEADER')
      })

      it('Can change root HTML element', () => {
        const wrapper = mount(Menu, {
          propsData: { element: 'div', menu }
        })

        expect(wrapper.props('element')).toBe('div')
        expect(wrapper.element.tagName).toBe('DIV')
      })
    })

    describe('handler', () => {
      it('Hover - trigger mouseenter', async () => {
        const wrapper = mount(Menu, {
          propsData: { handler: 'hover', menu },
          slots: { default: '<div>Content</div>' }
        })

        const el = wrapper.find('.vsm-has-dropdown')
        await el.trigger('mouseenter')

        expect(wrapper.vm._activeDropdown).not.toBeUndefined()
      })

      it('Click - trigger mouseenter', async () => {
        const wrapper = mount(Menu, {
          propsData: { handler: 'click', menu },
          slots: { default: '<div>Content</div>' }
        })

        const el = wrapper.find('.vsm-has-dropdown')
        await el.trigger('mouseenter')

        expect(wrapper.vm._activeDropdown).toBeUndefined()
      })

      it('Click - trigger %pointerEvent.end%', async () => {
        const wrapper = mount(Menu, {
          propsData: { handler: 'click', menu },
          slots: { default: '<div>Content</div>' }
        })

        const el = wrapper.find('.vsm-has-dropdown')
        await el.trigger(pointerEvent.end)

        expect(wrapper.vm._activeDropdown).not.toBeUndefined()
      })

      it('Mouseenter trigger after change handler', async () => {
        const wrapper = mount(Menu, {
          propsData: { handler: 'hover', menu },
          slots: { default: '<div>Content</div>' }
        })

        const el = wrapper.find('.vsm-has-dropdown')
        await el.trigger('mouseenter')
        expect(wrapper.vm._activeDropdown).not.toBeUndefined()

        wrapper.vm.closeDropdown()
        await wrapper.setProps({ handler: 'click' })

        await el.trigger('mouseenter')
        expect(wrapper.vm._activeDropdown).toBeUndefined()
      })
    })
  })

  describe('DOM', () => {
    it('Number of elements', () => {
      const wrapper = mount(Menu, {
        propsData: { element: 'div', menu },
        slots: { default: '<div>Content</div>' }
      })

      expect(wrapper.findAll('.vsm-link').length).toBe(3)
    })

    it('Number of elements who has dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { element: 'div', menu },
        slots: { default: '<div>Content</div>' }
      })

      expect(wrapper.findAll('.vsm-link.vsm-has-dropdown').length).toBe(2)
    })
  })

  describe('computed', () => {
    it('Number of items having dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { element: 'div', menu },
        slots: { default: '<div>Content</div>' }
      })

      expect(wrapper.vm.menuHasDropdown.length).toBe(2)
    })

    it('Number of elements having dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { element: 'div', menu },
        slots: { default: '<div>Content</div>' }
      })

      expect(wrapper.vm.hasDropdownEls.length).toBe(2)
    })

    it('Number of dropdown sections', () => {
      const wrapper = mount(Menu, {
        propsData: { element: 'div', menu },
        slots: { default: '<div>Content</div>' }
      })

      expect(wrapper.vm.sectionEls.length).toBe(2)
    })
  })

  describe('events', () => {
    let eventEndStub
    let touchStartStub
    let touchMoveStub
    let resizeStub
    let wrapper

    beforeEach(() => {
      eventEndStub = sinon.spy(Menu.methods, 'eventEndHandler')
      touchStartStub = sinon.spy(Menu.methods, 'touchStartHandler')
      touchMoveStub = sinon.spy(Menu.methods, 'touchMoveHandler')
      resizeStub = sinon.spy(Menu.methods, 'windowResizeHandler')

      wrapper = mount(Menu, {
        propsData: { menu },
        slots: {
          default: '<div>Content</div>'
        }
      })
    })

    afterEach(() => {
      eventEndStub.restore()
      touchStartStub.restore()
      touchMoveStub.restore()
      resizeStub.restore()
      wrapper.unmount()
    })

    describe('global', () => {
      it('register touchmove', () => {
        document.dispatchEvent(new TouchEvent('touchmove'))
        expect(touchMoveStub.calledOnce).toBeTruthy()
      })

      it('touchmove remove on destroy', () => {
        wrapper.unmount()

        document.dispatchEvent(new TouchEvent('touchmove'))
        expect(touchMoveStub.called).toBeFalsy()
      })

      it('register touchstart', () => {
        document.dispatchEvent(new TouchEvent('touchstart'))
        expect(touchStartStub.calledOnce).toBeTruthy()
      })

      it('touchstart remove on destroy', () => {
        wrapper.unmount()

        document.dispatchEvent(new TouchEvent('touchstart'))
        expect(touchStartStub.called).toBeFalsy()
      })

      it(`register ${pointerEvent.end}`, () => {
        document.body.dispatchEvent(new TouchEvent(pointerEvent.end))
        expect(eventEndStub.calledOnce).toBeTruthy()
      })

      it(`${pointerEvent.end} remove on destroy`, () => {
        wrapper.unmount()

        document.body.dispatchEvent(new TouchEvent(pointerEvent.end))
        expect(eventEndStub.called).toBeFalsy()
      })

      it('register resize', () => {
        window.dispatchEvent(new Event('resize'))
        expect(resizeStub.calledOnce).toBeTruthy()
      })

      it('resize remove on destroy', () => {
        wrapper.unmount()

        window.dispatchEvent(new Event('resize'))
        expect(resizeStub.called).toBeFalsy()
      })
    })

    describe('local', () => {
      it('Register events for each dropdown element', () => {
        wrapper.vm.hasDropdownEls.forEach((el) => {
          expect(el._vsmMenu).toBeTruthy()
        })
      })

      it('Register events for dropdown container', () => {
        expect(wrapper.vm.$refs.dropdownContainer._vsmMenu).toBeTruthy()
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
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: '<div>Content</div>' }
      })

      sinon.spy(wrapper.vm, 'openDropdown')

      const activeEl = wrapper.vm.hasDropdownEls[1]
      wrapper.vm.toggleDropdown(activeEl)

      expect(wrapper.vm.openDropdown.called).toBeTruthy()
      expect(wrapper.vm._activeDropdown).toBe(activeEl)
    })

    it('Toggle dropdown, has active dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: '<div>Content</div>' }
      })

      sinon.spy(wrapper.vm, 'closeDropdown')

      const el = wrapper.vm.hasDropdownEls[1]
      wrapper.vm.openDropdown(el)
      wrapper.vm.toggleDropdown(el)

      expect(wrapper.vm.closeDropdown.called).toBeTruthy()
      expect(wrapper.vm._activeDropdown).toBeUndefined()
    })

    it('Open Dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: '<div>Content</div>' }
      })

      const el = wrapper.vm.hasDropdownEls[1]
      wrapper.vm.openDropdown(el)
      expect(wrapper.vm._activeDropdown).toBe(el)
    })

    it('Close Dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: '<div>Content</div>' }
      })

      wrapper.vm.openDropdown(wrapper.vm.hasDropdownEls[1])
      wrapper.vm.closeDropdown()
      expect(wrapper.vm._activeDropdown).toBeUndefined()
    })
  })

  describe('render', () => {
    it('Register component with dropdown', () => {
      const baseComponent = { template: '<div>Content</div>' }

      const wrapper = mount(Menu, {
        components: {
          baseComponent
        },
        propsData: {
          menu: [
            { title: 'First item', dropdown: 'first' },
            { title: 'Second item', dropdown: 'second', element: 'baseComponent' }
          ]
        }
      })

      wrapper.vm.registerDropdownElsEvents()
    })
  })
})
