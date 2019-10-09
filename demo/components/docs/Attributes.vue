<template>
  <div>
    <a
      href="#props"
      id="props"
      class="section"
    >
      # Props
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
        { attr: 'property', name: 'Property' },
        { attr: 'parameters', name: 'Parameters' },
        { attr: 'description', name: 'Description' },
        { attr: 'type', name: 'Type' },
        { attr: 'default', name: 'Default' }
      ],
      rows: [
        {
          property: 'menu',
          type: 'Array',
          parameters: 'MenuObject',
          description: '',
          required: true
        },
        {
          property: 'element',
          description: 'HTML element for root element',
          type: 'String',
          default: 'header'
        },
        {
          property: 'base-width',
          description: 'The relationship between the width of the content and this value',
          type: 'string, number',
          default: 380
        },
        {
          property: 'base-height',
          description: 'The relationship between the height of the content and this value',
          type: 'string, number',
          default: 380
        }
      ]
    }
  }
}
</script>
