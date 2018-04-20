<template>
  <v-data-table
    :headers="[
      { text: 'Edit', align: 'center', sortable: false, width: 1 },
      { text: $t('tables.headers.time'), value: 'timestamp' },
      { text: $t('tables.headers.cost'), value: 'cost' },
      { text: $t('tables.headers.type'), value: 'type' },
      { text: $t('tables.headers.notes'), value: 'notes' }
    ]"
    :items="$store.expense.data || []"
    :loading="$store.expense.pending"
    hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">
        <v-btn icon @click.stop="$router.push({ name: 'expenseForm', params: { id: props.item.id }})">
          <v-icon size="17px" color="primary">fa-edit</v-icon>
        </v-btn>
      </td>
      <td>{{ $moment(props.item.timestamp).format('hh:mm A') }}</td>
      <td>{{ props.item.cost }} IDR</td>
      <td>{{ props.item.type }}</td>
      <td>{{ props.item.notes }}</td>
    </template>
  </v-data-table>
</template>
