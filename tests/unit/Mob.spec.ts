import { mount, VueWrapper } from '@vue/test-utils';
import sinon from 'sinon';
import Mob from '../../src/components/Mob.vue';

// eslint-disable-next-line
let wrapper: VueWrapper<any>;

beforeEach(() => {
  wrapper = mount(Mob, {
    slots: {
      default: '<div>Content</div>',
    },
  });
});

afterEach(() => {
  wrapper.unmount();
});

describe('vsmMob Component', () => {
  test('Working component without v-model', () => {
    expect(wrapper.vm.active).toBeFalsy();
    wrapper.find('.vsm-mob').trigger('click');
    expect(wrapper.vm.active).toBeTruthy();
    wrapper.find('.vsm-mob').trigger('click');
    expect(wrapper.vm.active).toBeFalsy();
  });

  test('Change v-model after open dropdown', () => {
    wrapper.find('.vsm-mob').trigger('click');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(1);
  });

  test('Change v-model after close dropdown', () => {
    wrapper.vm.active = true;
    wrapper.find('.vsm-mob').trigger('click');
    expect(wrapper.emitted().input).toEqual([[false]]);
    expect(wrapper.emitted().input.length).toBe(1);
  });

  test('Close dropdown on click outside', () => {
    const spy = sinon.spy(wrapper.vm, 'unregisterEvent');

    expect(wrapper.emitted().input).toBeFalsy();
    wrapper.vm.eventEndHandler(new MouseEvent('click'));
    expect(wrapper.emitted().input).toBeTruthy();

    wrapper.unmount();
    expect(spy.called).toBeTruthy();
  });

  test('Close dropdown on call method', () => {
    wrapper.find('.vsm-mob').trigger('click');
    expect(wrapper.vm.active).toBeTruthy();
    wrapper.vm.closeDropdown();
    expect(wrapper.vm.active).toBeFalsy();
  });
});
