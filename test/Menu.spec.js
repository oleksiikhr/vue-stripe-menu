'use strict'

import { shallowMount } from '@vue/test-utils'
import Menu from '../src/components/Menu'

const menu = [
  { title: 'First item', dropdown: 'first' },
  { title: 'Second item', dropdown: 'second' },
  { title: 'No dropdown' }
]

describe('vsmMenu Component', () => {
  describe('props', () => {
    it('[element] Default render a header element', () => {
      const wrapper = shallowMount(Menu, {
        propsData: { menu }
      })

      expect(wrapper.is('header')).toBeTruthy()
    })

    it ('[element] Can change root HTML element', () => {
      const wrapper = shallowMount(Menu, {
        propsData: {
          element: 'div',
          menu
        }
      })

      expect(wrapper.is('div')).toBeTruthy()
    })
  })

  // TODO
})
