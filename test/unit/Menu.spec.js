'use strict'

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
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

describe('vsmMenu Component', () => {
  describe('props', () => {
    describe('element', () => {
      it('Default render an element', () => {
        const wrapper = mount(Menu, {
          props: { menu }
        })

        expect(wrapper.props('element')).toBe('header')
        expect(wrapper.element.tagName).toBe('HEADER')
      })

      it('Change an element on mount', () => {
        const wrapper = mount(Menu, {
          props: { element: 'div', menu }
        })

        expect(wrapper.props('element')).toBe('div')
        expect(wrapper.element.tagName).toBe('DIV')
      })

      it('Change an element dynamically and working dropdown', async () => {
        const wrapper = mount(Menu, {
          props: { handler: 'hover', menu },
          slots: { default: '<div>Content</div>' }
        })

        await wrapper.setProps({ element: 'div' })
        await nextTick()

        await wrapper.find('.vsm-has-dropdown').trigger('mouseenter')
        expect(wrapper.vm._activeDropdown).not.toBeUndefined()
      })
    })

    describe('handler', () => {
      it('Hover - trigger mouseenter', async () => {
        const wrapper = mount(Menu, {
          props: { handler: 'hover', menu },
          slots: { default: '<div>Content</div>' }
        })

        await wrapper.find('.vsm-has-dropdown').trigger('mouseenter')
        expect(wrapper.vm._activeDropdown).not.toBeUndefined()
      })

      it('Click - trigger mouseenter', async () => {
        const wrapper = mount(Menu, {
          props: { handler: 'click', menu },
          slots: { default: '<div>Content</div>' }
        })

        await wrapper.find('.vsm-has-dropdown').trigger('mouseenter')
        expect(wrapper.vm._activeDropdown).toBeUndefined()
      })

      it('Click - trigger %pointerEvent.end%', async () => {
        const wrapper = mount(Menu, {
          props: { handler: 'click', menu },
          slots: { default: '<div>Content</div>' }
        })

        await wrapper.find('.vsm-has-dropdown').trigger(pointerEvent.end)
        expect(wrapper.vm._activeDropdown).not.toBeUndefined()
      })

      it('Mouseenter trigger after change handler', async () => {
        const wrapper = mount(Menu, {
          props: { handler: 'hover', menu },
          slots: { default: '<div>Content</div>' }
        })

        await wrapper.find('.vsm-has-dropdown').trigger('mouseenter')
        expect(wrapper.vm._activeDropdown).not.toBeUndefined()

        wrapper.vm.closeDropdown()
        await wrapper.setProps({ handler: 'click' })

        await wrapper.find('.vsm-has-dropdown').trigger('mouseenter')
        expect(wrapper.vm._activeDropdown).toBeUndefined()
      })
    })

    describe('menu', () => {
      it('Change menu dynamically and working dropdown', async () => {
        const wrapper = mount(Menu, {
          props: { handler: 'hover', menu: [...menu] },
          slots: { default: '<div>Content</div>' }
        })

        const item = { title: 'Four item', dropdown: 'four' }
        wrapper.vm.menu.push(item)
        await nextTick()

        const el = wrapper.find(`.vsm-has-dropdown[data-dropdown="${item.dropdown}"]`)
        await nextTick()
        await el.trigger('mouseenter')
        expect(wrapper.vm._activeDropdown).not.toBeUndefined()
      })
    })
  })

  describe('DOM', () => {
    it('Number of elements', () => {
      const wrapper = mount(Menu, {
        props: { menu },
        slots: { default: '<div>Content</div>' }
      })

      expect(wrapper.findAll('.vsm-link').length).toBe(3)
    })

    it('Number of elements who has dropdown', () => {
      const wrapper = mount(Menu, {
        props: { menu },
        slots: { default: '<div>Content</div>' }
      })

      expect(wrapper.findAll('.vsm-link.vsm-has-dropdown').length).toBe(2)
    })
  })

  describe('computed', () => {
    it('Number of items having dropdown', () => {
      const wrapper = mount(Menu, {
        props: { menu },
        slots: { default: '<div>Content</div>' }
      })

      expect(wrapper.vm.itemsWithDropdown.length).toBe(2)
    })

    it('Number of elements having dropdown', () => {
      const wrapper = mount(Menu, {
        props: { menu },
        slots: { default: '<div>Content</div>' }
      })

      expect(wrapper.vm.elementsWithDropdown.length).toBe(2)
    })

    it('Number of dropdown sections', () => {
      const wrapper = mount(Menu, {
        props: { menu },
        slots: { default: '<div>Content</div>' }
      })

      expect(wrapper.vm.dropdownContainerItems.length).toBe(2)
    })
  })

  describe('events', () => {
    let eventEndStub
    let touchStartStub
    let touchMoveStub
    let resizeStub
    let wrapper

    beforeEach(() => {
      eventEndStub = sinon.spy(Menu.methods, 'documentEventEndHandler')
      touchStartStub = sinon.spy(Menu.methods, 'documentTouchStartHandler')
      touchMoveStub = sinon.spy(Menu.methods, 'documentTouchMoveHandler')
      resizeStub = sinon.spy(Menu.methods, 'windowResizeHandler')

      wrapper = mount(Menu, {
        props: { menu },
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
        wrapper.vm.elementsWithDropdown.forEach((el) => {
          expect(el._vsmMenu).toBeTruthy()
        })
      })

      it('Register events for dropdown container', () => {
        expect(wrapper.vm.$refs.dropdownContainer._vsmMenu).toBeTruthy()
      })

      it('$emit on openDropdown, no active dropdown', () => {
        wrapper.vm.openDropdown(wrapper.vm.elementsWithDropdown[1])
        expect(wrapper.emitted('open-dropdown')).toBeTruthy()
      })

      it('$emit on openDropdown, same active dropdown', () => {
        wrapper.vm._activeDropdown = wrapper.vm.elementsWithDropdown[0]
        wrapper.vm.openDropdown(wrapper.vm.elementsWithDropdown[0])
        expect(wrapper.emitted('open-dropdown')).toBeFalsy()
      })
    })
  })

  describe('methods', () => {
    it('Toggle dropdown, no active dropdown', () => {
      const wrapper = mount(Menu, {
        props: { menu },
        slots: { default: '<div>Content</div>' }
      })

      sinon.spy(wrapper.vm, 'openDropdown')

      const activeEl = wrapper.vm.elementsWithDropdown[1]
      wrapper.vm.toggleDropdown(activeEl)

      expect(wrapper.vm.openDropdown.called).toBeTruthy()
      expect(wrapper.vm._activeDropdown).toBe(activeEl)
    })

    it('Toggle dropdown, has active dropdown', () => {
      const wrapper = mount(Menu, {
        props: { menu },
        slots: { default: '<div>Content</div>' }
      })

      sinon.spy(wrapper.vm, 'closeDropdown')

      const el = wrapper.vm.elementsWithDropdown[1]
      wrapper.vm.openDropdown(el)
      wrapper.vm.toggleDropdown(el)

      expect(wrapper.vm.closeDropdown.called).toBeTruthy()
      expect(wrapper.vm._activeDropdown).toBeUndefined()
    })

    it('Open Dropdown', () => {
      const wrapper = mount(Menu, {
        props: { menu },
        slots: { default: '<div>Content</div>' }
      })

      const el = wrapper.vm.elementsWithDropdown[1]
      wrapper.vm.openDropdown(el)
      expect(wrapper.vm._activeDropdown).toBe(el)
    })

    it('Close Dropdown', () => {
      const wrapper = mount(Menu, {
        props: { menu },
        slots: { default: '<div>Content</div>' }
      })

      wrapper.vm.openDropdown(wrapper.vm.elementsWithDropdown[1])
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
        props: {
          menu: [
            { title: 'First item', dropdown: 'first' },
            { title: 'Second item', dropdown: 'second', element: 'baseComponent' }
          ]
        }
      })

      wrapper.vm.registerDropdownElementsEvents()
    })
  })
})
