<template>
  <div>
    <base-title title="[Mob] Methods" />
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
        { attr: 'description', name: 'Description' },
        { attr: 'return', name: 'Return' }
      ],
      rows: [
        {
          name: 'closeDropdown',
          parameters: '',
          description: 'Close dropdown menu',
          return: ''
        }
      ]
    }
  }
}
</script>
