<template>
  <div>
    <base-title :title="title" />
    <base-table :columns="columns" :rows="rows" />
  </div>
</template>

<script>
import BaseTable from '../base/Table.vue'
import BaseTitle from '../base/Title.vue'

export default {
  components: {
    BaseTable,
    BaseTitle,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
}
</script>
