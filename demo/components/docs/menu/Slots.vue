<template>
  <div>
    <base-title title="[Menu] Slots" />
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
          parameters: 'MenuItem, index',
          description: 'The main content for the dropdown list (slot-scope)'
        },
        {
          name: 'before-nav',
          description: 'Content to the left of the list'
        },
        {
          name: 'after-nav',
          description: 'Content to the right of the list'
        },
        {
          name: 'title',
          parameters: 'MenuItem, index',
          description: 'Replace the output of menu[i].title with your own'
        }
      ]
    }
  }
}
</script>
