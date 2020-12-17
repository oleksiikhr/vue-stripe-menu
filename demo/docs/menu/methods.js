'use strict'

export const title = '[Menu] Methods'

export const columns = [
  { attr: 'name', name: 'Name' },
  { attr: 'parameters', name: 'Parameters' },
  { attr: 'description', name: 'Description' },
  { attr: 'return', name: 'Return' }
]

export const rows = [
  {
    name: 'toggleDropdown',
    parameters: 'HTMLElement',
    description: 'Open dropdown menu, if open - close',
    return: ''
  },
  {
    name: 'openDropdown',
    parameters: 'HTMLElement',
    description: 'Open dropdown menu for selected item',
    return: ''
  },
  {
    name: 'closeDropdown',
    parameters: '',
    description: 'Close any open dropdown menu',
    return: ''
  }
]
