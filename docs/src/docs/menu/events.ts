export const title = '[Menu] Events';

export const columns = [
  { attr: 'name', name: 'Name' },
  { attr: 'description', name: 'Description' },
  { attr: 'return', name: 'Return' },
];

export const rows = [
  {
    name: 'open-dropdown',
    description: 'Open the dropdown menu, return the active HTMLElement',
    return: 'HTMLElement',
  },
  {
    name: 'close-dropdown',
    description: 'Close the dropdown menu, return the closed HTMLElement',
    return: 'HTMLElement',
  },
];
