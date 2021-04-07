'use strict'

export const title = '[Menu] Props'

export const columns = [
  { attr: 'property', name: 'Property' },
  { attr: 'parameters', name: 'Parameters' },
  { attr: 'description', name: 'Description' },
  { attr: 'type', name: 'Type' },
  { attr: 'default', name: 'Default' }
]

export const rows = [
  {
    property: 'menu',
    type: 'Array',
    parameters: 'MenuObject',
    description: 'Description of the menu items',
    required: true
  },
  {
    property: 'element',
    description: 'HTMLElement for the root element',
    type: 'String',
    default: 'header'
  },
  {
    property: 'screen-offset',
    description: 'Offset from the window screen',
    type: 'String, Number',
    default: 10
  },
  {
    property: 'dropdown-offset',
    description: 'Offset from the dropdown menu',
    type: 'String, Number',
    default: 0
  },
  {
    property: 'handler',
    parameters: 'hover, click',
    description: 'On what event to open dropdown menu',
    type: 'String',
    default: 'hover'
  }
]
