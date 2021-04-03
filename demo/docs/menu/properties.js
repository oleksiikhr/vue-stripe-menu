'use strict'

export const title = '[Menu] Properties'

export const columns = [
  { attr: 'name', name: 'Name' },
  { attr: 'description', name: 'Description' },
  { attr: 'return', name: 'Return' }
]

export const rows = [
  {
    name: 'linkRefs',
    description: 'An array of link-generated HTMLElements',
    return: 'Array<HTMLElement>'
  },
  {
    name: 'dropdownRefs',
    description: 'An array of dropdown-generated HTMLElements',
    return: 'Array<HTMLElement>'
  },
  {
    name: 'itemsWithDropdown',
    description: 'Filtered menu items with dropdown',
    return: 'Array<MenuObject>'
  },
  {
    name: 'elementsWithDropdown',
    description: 'List of HTMLElements that have dropdown content',
    return: 'Array<HTMLElement>'
  },
  {
    name: 'dropdownContainerItems',
    description: 'List of dropdown HTMLElements',
    return: 'Array<{el: HTMLElement, name: string, content: HTMLElement}'
  }
]
