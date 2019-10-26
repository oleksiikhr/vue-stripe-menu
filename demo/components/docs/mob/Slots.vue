<template>
  <div>
    <base-title title="[Mob] Slots" />
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
        { attr: 'name', name: 'Name' },
        { attr: 'parameters', name: 'Parameters' },
        { attr: 'description', name: 'Description' }
      ],
      rows: [
        {
          name: 'default',
          description: 'The main content for the dropdown list'
        },
        {
          name: 'hamburger',
          description: 'Replace button to open dropdown'
        }
      ]
    }
  }
}
</script>
