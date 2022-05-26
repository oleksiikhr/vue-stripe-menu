export const title = '[Menu/Parameter] - MenuObject';

export const columns = [
  { attr: 'property', name: 'Property' },
  { attr: 'type', name: 'type' },
  { attr: 'description', name: 'Description' },
];

export const rows = [
  {
    property: 'title',
    type: 'String',
    description: 'Menu item name. Can also be redefined through the slot',
  },
  {
    property: 'dropdown',
    type: 'String',
    description: 'Unique value indicates that this item has a dropdown menu',
  },
  {
    property: 'align',
    type: 'String',
    description: 'Offset the position of the dropdown menu',
  },
  {
    property: 'element',
    type: 'String',
    description:
      'HTMLElement or global component in the header element, if not specified, it will be <button /> or <a />',
  },
  {
    property: 'attributes',
    type: 'Object',
    description: 'All attributes to be assigned in the header element (v-bind)',
  },
  {
    property: 'listeners',
    type: 'Object',
    description: 'All events to be assigned in the header element (v-on)',
  },
];
