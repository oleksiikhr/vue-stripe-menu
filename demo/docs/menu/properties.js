'use strict'

export const title = '[Menu] Properties'

export const columns = [
  { attr: 'name', name: 'Name' },
  { attr: 'description', name: 'Description' },
  { attr: 'return', name: 'Return' }
]

export const rows = [
  {
    name: 'hasDropdownEls',
    description: 'List of HTML elements that have dropdown content',
    return: 'Array<HTMLDivElement>'
  },
  {
    name: '$refs.links',
    description: 'List of HTML elements obtained from menu props',
    return: 'Array<HTMLDivElement>'
  }
]
