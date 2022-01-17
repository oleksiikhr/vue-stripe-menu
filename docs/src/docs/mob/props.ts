'use strict'

export const title = '[Mob] Props'

export const columns = [
  { attr: 'property', name: 'Property' },
  { attr: 'parameters', name: 'Parameters' },
  { attr: 'description', name: 'Description' },
  { attr: 'type', name: 'Type' },
  { attr: 'default', name: 'Default' },
]

export const rows = [
  {
    property: 'v-model',
    type: 'Boolean',
    parameters: '',
    description: 'The state of the open/close the menu',
    default: 'false',
  },
]
