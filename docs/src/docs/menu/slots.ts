export const title = '[Menu] Slots';

export const columns = [
  { attr: 'name', name: 'Name' },
  { attr: 'parameters', name: 'Parameters' },
  { attr: 'description', name: 'Description' },
];

export const rows = [
  {
    name: 'default',
    parameters: 'MenuItem, index',
    description: 'The main content for the dropdown list',
  },
  {
    name: 'before-nav',
    description: 'Content to the left of the list',
  },
  {
    name: 'after-nav',
    description: 'Content to the right of the list',
  },
  {
    name: 'title',
    parameters: 'MenuItem, index',
    description: 'Replace the output of menu[i].title with your own',
  },
];
