<template>
  <div>
    <a
      href="#events"
      id="events"
      class="section"
    >
      # Events
    </a>
    <base-table
      :columns="columns"
      :rows="rows"
    />
  </div>
</template>

<script>
import BaseTable from '../base/Table'

export default {
  components: {
    BaseTable
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
