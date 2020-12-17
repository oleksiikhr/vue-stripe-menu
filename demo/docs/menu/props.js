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
    description: 'Description of the menu items, see below',
    required: true
  },
  {
    property: 'element',
    description: 'HTML element for root element',
    type: 'String',
    default: 'header'
  },
  {
    property: 'base-width',
    description: 'The relationship between the width of the content and this value',
    type: 'string, number',
    default: 380
  },
  {
    property: 'base-height',
    description: 'The relationship between the height of the content and this value',
    type: 'string, number',
    default: 400
  },
  {
    property: 'screen-offset',
    description: 'Offset from the window screen',
    type: 'string, number',
    default: 10
  },
  {
    property: 'handler',
    parameters: 'hover, click',
    description: 'What event should you open dropdown for',
    type: 'string',
    default: 'hover'
  }
]
