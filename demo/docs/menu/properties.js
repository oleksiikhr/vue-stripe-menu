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
    description: 'List of HTMLElements that have dropdown content',
    return: 'Array<HTMLElement>'
  },
  {
    name: 'dropdownRefs',
    description: 'An array of dropdown-generated items',
    return: 'Array<{el: HTMLElement, name: string, content: HTMLElement}>'
  }
]
