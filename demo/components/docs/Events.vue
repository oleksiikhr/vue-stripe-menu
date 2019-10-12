<template>
  <div>
    <base-title title="Events" />
    <base-table
      :columns="columns"
      :rows="rows"
    />
  </div>
</template>

<script>
import BaseTable from '../base/Table'
import BaseTitle from '../BaseTitle'

export default {
  components: {
    BaseTable, BaseTitle
  },
  data () {
    return {
      columns: [
        { attr: 'name', name: 'Name' },
        { attr: 'description', name: 'Description' },
        { attr: 'return', name: 'Return' }
      ],
      rows: [
        {
          name: 'open-dropdown',
          description: 'Open the dropdown menu, return the active DOM Element',
          return: 'Element'
        },
        {
          name: 'close-dropdown',
          description: 'Close the dropdown menu, return the active DOM Element',
          return: 'Element'
        }
      ]
    }
  }
}
</script>
