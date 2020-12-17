<template>
  <div>
    <base-title title="[Menu] Methods" />
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
  setup() {
    const columns = [
      { attr: 'name', name: 'Name' },
      { attr: 'parameters', name: 'Parameters' },
      { attr: 'description', name: 'Description' },
      { attr: 'return', name: 'Return' }
    ]

    const rows = [
      {
        name: 'toggleDropdown',
        parameters: 'HTMLElement',
        description: 'Open dropdown menu, if open - close',
        return: ''
      },
      {
        name: 'openDropdown',
        parameters: 'HTMLElement',
        description: 'Open dropdown menu for selected item',
        return: ''
      },
      {
        name: 'closeDropdown',
        parameters: '',
        description: 'Close any open dropdown menu',
        return: ''
      }
    ]

    return { columns, rows }
  }
}
</script>
