'use strict'

/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import Mob from '../../src/components/Mob'
import sinon from 'sinon'

const eventEndStub = sinon.stub()
let wrapper

beforeEach(() => {
  wrapper = shallowMount(Mob, {
    slots: {
      default: '<div>Content</div>'
    },
    methods: {
      eventEndHandler: eventEndStub,
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
    wrapper.find('.vsm-mob').trigger('click')
    document.body.dispatchEvent(new MouseEvent('click'))
    expect(eventEndStub.called).toBeTruthy()
    expect(wrapper.emitted().input).toBeTruthy()
  })

  test('Close dropdown on touchend outside', () => {
    wrapper.find('.vsm-mob').trigger('click')
    document.body.dispatchEvent(new TouchEvent('touchend'))
    expect(eventEndStub.called).toBeTruthy()
    expect(wrapper.emitted().input).toBeTruthy()
  })

  test('Don\'t close a dropdown on inner click', () => {
    wrapper.find('.vsm-section').trigger('click')
    expect(eventEndStub.called).toBeTruthy()
    expect(wrapper.emitted().input).toBeFalsy()
  })
})
