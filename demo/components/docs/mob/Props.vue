<template>
  <div>
    <base-title title="[Mob] Props" />
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
        { attr: 'parameters', name: 'Parameters' },
        { attr: 'description', name: 'Description' },
        { attr: 'type', name: 'Type' },
        { attr: 'default', name: 'Default' }
      ],
      rows: [
        {
          property: 'v-model',
          type: 'Boolean',
          parameters: '',
          description: 'The state of the open/close the menu',
          default: 'false'
        }
      ]
    }
  }
}
</script>
