<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(column, i) in columns"
          :key="i"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, i) in rows"
        :key="i"
        :class="{ required: row.required }"
      >
        <td
          v-for="(column, j) in columns"
          :key="j"
          :class="`column column_${column.attr}`"
        >
          {{ row[column.attr] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-spacing: unset;
  border-collapse: collapse;
}

thead {
  background: rgba(0, 0, 0, .03);
  border-bottom: 2px solid #cfcfcf;
}

tbody {
  tr {
    border-bottom: 1px solid #e2e2e2;
    td:first-child {
      color: #2a52d0;
    }
    &.required {
      border-left: 2px solid #982323;
    }
  }
}

th {
  text-align: left;
  padding: 15px;
  color: #757575;
  font-weight: 500;
}

td {
  padding: 15px;
  color: #34416b;
}

.column_type {
  color: #d67373;
  font-weight: bold;
  font-size: .8rem;
  padding: 2px 5px;
  text-transform: lowercase;
}
</style>
