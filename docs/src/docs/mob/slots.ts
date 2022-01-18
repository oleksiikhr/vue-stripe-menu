'use strict';

export const title = '[Mob] Slots';

export const columns = [
  { attr: 'name', name: 'Name' },
  { attr: 'parameters', name: 'Parameters' },
  { attr: 'description', name: 'Description' },
];

export const rows = [
  {
    name: 'default',
    description: 'Main content',
  },
  {
    name: 'hamburger',
    description: 'Replace hamburger button',
  },
  {
    name: 'close',
    description: 'Replace close button',
  },
];
