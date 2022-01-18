'use strict';

export const title = '[Menu] Methods';

export const columns = [
  { attr: 'name', name: 'Name' },
  { attr: 'parameters', name: 'Parameters' },
  { attr: 'description', name: 'Description' },
  { attr: 'return', name: 'Return' },
];

export const rows = [
  {
    name: 'toggleDropdown',
    parameters: 'HTMLElement',
    description: 'Open dropdown menu, if it is an active HTMLElement - close',
  },
  {
    name: 'openDropdown',
    parameters: 'HTMLElement',
    description: 'Open dropdown menu for selected HTMLElement',
  },
  {
    name: 'closeDropdown',
    description: 'Close active dropdown menu',
  },
  {
    name: 'resizeDropdown',
    description: 'Recalculate size and location of dropdown menu',
  },
];
