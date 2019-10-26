'use strict'

/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import Mob from '../../src/components/Mob'
import sinon from 'sinon'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Mob, {
    slots: {
      default: '<div>Content</div>'
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('vsmMob Component', () => {
  test('Working component without v-model', () => {
    expect(wrapper.find('.vsm-mob-content__wrap').isVisible()).toBeFalsy()
    wrapper.find('.vsm-mob').trigger('click')
    expect(wrapper.find('.vsm-mob-content__wrap').isVisible()).toBeTruthy()
    wrapper.find('.vsm-mob').trigger('click')
    expect(wrapper.find('.vsm-mob-content__wrap').isVisible()).toBeFalsy()
  })

  test('Change v-model after open dropdown', () => {
    wrapper.find('.vsm-mob').trigger('click')
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(1)
  })

  test('Change v-model after close dropdown', () => {
    wrapper.vm.active = true
    wrapper.find('.vsm-mob').trigger('click')
    expect(wrapper.emitted().input).toEqual([[false]])
    expect(wrapper.emitted().input.length).toBe(1)
  })

  test('Close dropdown on click outside', () => {
    const spy = sinon.spy(wrapper.vm, 'eventEndHandler')

    wrapper.find('.vsm-mob').trigger('click')
    document.body.dispatchEvent(new MouseEvent('click'))
    expect(spy.called).toBeTruthy()
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
