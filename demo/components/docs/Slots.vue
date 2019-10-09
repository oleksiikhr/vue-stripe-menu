<template>
  <div>
    <a
      href="#slots"
      id="slots"
      class="section"
    >
      # Slots
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
        { attr: 'parameters', name: 'Parameters' },
        { attr: 'description', name: 'Description' }
      ],
      rows: [
        {
          name: 'default',
          parameters: 'MenuItem, index',
          description: 'The main content for the drop-down list'
        },
        {
          name: 'before-nav',
          description: 'Content to the left of the list'
        },
        {
          name: 'after-nav',
          description: 'Content to the right of the list'
        }
      ]
    }
  }
}
</script>
