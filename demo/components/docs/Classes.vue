<template>
  <div>
    <base-title title="Classes" />
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
        { attr: 'description', name: 'Description' }
      ],
      rows: [
        {
          name: 'vsm-mob-hide',
          description: 'Hide HTML elements in mobile design'
        },
        {
          name: 'vsm-mob-full',
          description: 'Add flex-grow: 1, see Demo example'
        }
      ]
    }
  }
}
</script>
