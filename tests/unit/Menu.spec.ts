/* eslint-disable no-underscore-dangle, @typescript-eslint/ban-ts-comment */
import { mount, Wrapper } from '@vue/test-utils';
import { nextTick, defineComponent } from 'vue';
import * as sinon from 'sinon';
import { SinonSpy } from 'sinon';
import Menu from '../../src/components/Menu';
import { VsmHTMLElement } from '../../src/types';

const pointerEvent = {
  end: 'touchend',
  enter: 'mouseenter',
  leave: 'mouseleave',
};

const menu = [
  { title: 'First item', dropdown: 'first' },
  { title: 'Second item', dropdown: 'second' },
  { title: 'Third item' },
];

const contentComponent = defineComponent({ render: (h) => h('DIV', {}, 'Content') });

describe('vsmMenu Component', () => {
  describe('props', () => {
    describe('element', () => {
      it('Default render an element', () => {
        const wrapper = mount(Menu, {
          propsData: { menu },
        });

        expect(wrapper.props('element')).toBe('header');
        expect(wrapper.element.tagName).toBe('HEADER');
      });

      it('Change an element on mount', () => {
        const wrapper = mount(Menu, {
          propsData: { element: 'div', menu },
        });

        expect(wrapper.props('element')).toBe('div');
        expect(wrapper.element.tagName).toBe('DIV');
      });

      it('Change an element dynamically and working dropdown', async () => {
        const wrapper = mount(Menu, {
          propsData: { handler: 'hover', menu },
          slots: { default: contentComponent },
        });

        await wrapper.setProps({ element: 'div' });
        await nextTick();

        await wrapper.find('.vsm-has-dropdown').trigger('mouseenter');
        expect(wrapper.vm.activeDropdown).not.toBeUndefined();
      });
    });

    describe('handler', () => {
      it('Hover - trigger mouseenter', async () => {
        const wrapper = mount(Menu, {
          propsData: { handler: 'hover', menu },
          slots: { default: contentComponent },
        });

        await wrapper.find('.vsm-has-dropdown').trigger('mouseenter');
        expect(wrapper.vm.activeDropdown).not.toBeUndefined();
      });

      it('Click - trigger mouseenter', async () => {
        const wrapper = mount(Menu, {
          propsData: { handler: 'click', menu },
          slots: { default: contentComponent },
        });

        await wrapper.find('.vsm-has-dropdown').trigger('mouseenter');
        expect(wrapper.vm.activeDropdown).toBeUndefined();
      });

      it('Click - trigger %pointerEvent.end%', async () => {
        const wrapper = mount(Menu, {
          propsData: { handler: 'click', menu },
          slots: { default: contentComponent },
        });

        await wrapper.find('.vsm-has-dropdown').trigger(pointerEvent.end);
        expect(wrapper.vm.activeDropdown).not.toBeUndefined();
      });

      it('Mouseenter trigger after change handler', async () => {
        const wrapper = mount(Menu, {
          propsData: { handler: 'hover', menu },
          slots: { default: contentComponent },
        });

        await wrapper.find('.vsm-has-dropdown').trigger('mouseenter');
        expect(wrapper.vm.activeDropdown).not.toBeUndefined();

        wrapper.vm.closeDropdown();
        await wrapper.setProps({ handler: 'click' });

        await wrapper.find('.vsm-has-dropdown').trigger('mouseenter');
        expect(wrapper.vm.activeDropdown).toBeUndefined();
      });
    });

    describe('menu', () => {
      it('Change menu dynamically and working dropdown', async () => {
        const wrapper = mount(Menu, {
          propsData: { handler: 'hover', menu: [...menu] },
          slots: { default: contentComponent },
        });

        const item = { title: 'Four item', dropdown: 'four' };
        wrapper.vm.menu.push(item);
        await nextTick();

        const el = wrapper.find(`.vsm-has-dropdown[data-dropdown="${item.dropdown}"]`);
        await nextTick();
        await el.trigger('mouseenter');
        expect(wrapper.vm.activeDropdown).not.toBeUndefined();
      });
    });
  });

  describe('DOM', () => {
    it('Number of elements', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: contentComponent },
      });

      expect(wrapper.findAll('.vsm-link').length).toBe(3);
    });

    it('Number of elements who has dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: contentComponent },
      });

      expect(wrapper.findAll('.vsm-link.vsm-has-dropdown').length).toBe(2);
    });
  });

  describe('computed', () => {
    it('Number of items having dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: contentComponent },
      });

      expect(wrapper.vm.itemsWithDropdown.length).toBe(2);
    });

    it('Number of elements having dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: contentComponent },
      });

      expect(wrapper.vm.elementsWithDropdown.length).toBe(2);
    });

    it('Number of dropdown sections', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: contentComponent },
      });

      expect(wrapper.vm.dropdownContainerItems.length).toBe(2);
    });
  });

  describe('events', () => {
    let eventEndStub: SinonSpy<unknown[], unknown>;
    let touchStartStub: SinonSpy<unknown[], unknown>;
    let touchMoveStub: SinonSpy<unknown[], unknown>;
    let resizeStub: SinonSpy<unknown[], unknown>;

    // eslint-disable-next-line
    let wrapper: Wrapper<any>;

    beforeEach(() => {
      // @ts-ignore
      eventEndStub = sinon.spy(Menu.methods, 'documentEventEndHandler');
      // @ts-ignore
      touchStartStub = sinon.spy(Menu.methods, 'documentTouchStartHandler');
      // @ts-ignore
      touchMoveStub = sinon.spy(Menu.methods, 'documentTouchMoveHandler');
      // @ts-ignore
      resizeStub = sinon.spy(Menu.methods, 'windowResizeHandler');

      wrapper = mount(Menu, {
        propsData: { menu },
        slots: {
          default: contentComponent,
        },
      });
    });

    afterEach(() => {
      eventEndStub.restore();
      touchStartStub.restore();
      touchMoveStub.restore();
      resizeStub.restore();
      wrapper.destroy();
    });

    describe('global', () => {
      it('register touchmove', () => {
        document.dispatchEvent(new TouchEvent('touchmove'));
        expect(touchMoveStub.calledOnce).toBeTruthy();
      });

      it('touchmove remove on destroy', () => {
        wrapper.destroy();

        document.dispatchEvent(new TouchEvent('touchmove'));
        expect(touchMoveStub.called).toBeFalsy();
      });

      it('register touchstart', () => {
        document.dispatchEvent(new TouchEvent('touchstart'));
        expect(touchStartStub.calledOnce).toBeTruthy();
      });

      it('touchstart remove on destroy', () => {
        wrapper.destroy();

        document.dispatchEvent(new TouchEvent('touchstart'));
        expect(touchStartStub.called).toBeFalsy();
      });

      it(`register ${pointerEvent.end}`, () => {
        document.body.dispatchEvent(new TouchEvent(pointerEvent.end));
        expect(eventEndStub.calledOnce).toBeTruthy();
      });

      it(`${pointerEvent.end} remove on destroy`, () => {
        wrapper.destroy();

        document.body.dispatchEvent(new TouchEvent(pointerEvent.end));
        expect(eventEndStub.called).toBeFalsy();
      });

      it('register resize', () => {
        window.dispatchEvent(new Event('resize'));
        expect(resizeStub.calledOnce).toBeTruthy();
      });

      it('resize remove on destroy', () => {
        wrapper.destroy();

        window.dispatchEvent(new Event('resize'));
        expect(resizeStub.called).toBeFalsy();
      });
    });

    describe('local', () => {
      it('Register events for each dropdown element', () => {
        wrapper.vm.elementsWithDropdown.forEach((el: VsmHTMLElement) => {
          expect(el._vsmMenu).toBeTruthy();
        });
      });

      it('Register events for dropdown container', () => {
        expect(wrapper.vm.$refs.dropdownContainer._vsmMenu).toBeTruthy();
      });

      it('$emit on openDropdown, no active dropdown', () => {
        wrapper.vm.openDropdown(wrapper.vm.elementsWithDropdown[1]);
        expect(wrapper.emitted('open-dropdown')).toBeTruthy();
      });

      it('$emit on openDropdown, same active dropdown', () => {
        // eslint-disable-next-line prefer-destructuring
        wrapper.vm.activeDropdown = wrapper.vm.elementsWithDropdown[0];
        wrapper.vm.openDropdown(wrapper.vm.elementsWithDropdown[0]);
        expect(wrapper.emitted('open-dropdown')).toBeFalsy();
      });
    });
  });

  describe('methods', () => {
    it('Toggle dropdown, no active dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: contentComponent },
      });

      sinon.spy(wrapper.vm, 'openDropdown');

      const activeEl = wrapper.vm.elementsWithDropdown[1];
      wrapper.vm.toggleDropdown(activeEl);

      expect(wrapper.vm.openDropdown.called).toBeTruthy();
      expect(wrapper.vm.activeDropdown).toBe(activeEl);
    });

    it('Toggle dropdown, has active dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: contentComponent },
      });

      sinon.spy(wrapper.vm, 'closeDropdown');

      const el = wrapper.vm.elementsWithDropdown[1];
      wrapper.vm.openDropdown(el);
      wrapper.vm.toggleDropdown(el);

      expect(wrapper.vm.closeDropdown.called).toBeTruthy();
      expect(wrapper.vm.activeDropdown).toBeUndefined();
    });

    it('Open Dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: contentComponent },
      });

      const el = wrapper.vm.elementsWithDropdown[1];
      wrapper.vm.openDropdown(el);
      expect(wrapper.vm.activeDropdown).toBe(el);
    });

    it('Close Dropdown', () => {
      const wrapper = mount(Menu, {
        propsData: { menu },
        slots: { default: contentComponent },
      });

      wrapper.vm.openDropdown(wrapper.vm.elementsWithDropdown[1]);
      wrapper.vm.closeDropdown();
      expect(wrapper.vm.activeDropdown).toBeUndefined();
    });
  });

  describe('render', () => {
    it('Register component with dropdown', () => {
      const wrapper = mount(Menu, {
        components: {
          baseComponent: contentComponent,
        },
        propsData: {
          menu: [
            { title: 'First item', dropdown: 'first' },
            {
              title: 'Second item',
              dropdown: 'second',
              element: 'baseComponent',
            },
          ],
        },
      });

      wrapper.vm.registerDropdownElementsEvents();
    });
  });
});
