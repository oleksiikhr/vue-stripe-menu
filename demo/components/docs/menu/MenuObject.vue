<template>
  <div>
    <base-title title="[Menu] MenuObject" />
    <base-table
      :columns="columns"
      :rows="rows"
    />
  </div>
</template>

<script>
import BaseTable from '../../base/Table'
import BaseTitle from '../../BaseTitle'

export default {
  components: {
    BaseTable, BaseTitle
  },
  data () {
    return {
      columns: [
        { attr: 'property', name: 'Property' },
        { attr: 'type', name: 'type' },
        { attr: 'description', name: 'Description' }
      ],
      rows: [
        {
          property: 'title',
          type: 'String',
          description: 'Menu item name. Can also be redefined through the slot'
        },
        {
          property: 'dropdown',
          type: 'String',
          description: 'Unique value indicates that this item has a dropdown menu'
        },
        {
          property: 'element',
          type: 'String',
          description: 'HTML element in the header element, if not specified, it will be <button /> or <a />'
        },
        {
          property: 'attributes',
          type: 'Object',
          description: 'All attributes to be assigned in the header element (v-bind)'
        },
        {
          property: 'listeners',
          type: 'Object',
          description: 'All events to be assigned in the header element (v-on)'
        }
      ]
    }
  }
}
</script>
