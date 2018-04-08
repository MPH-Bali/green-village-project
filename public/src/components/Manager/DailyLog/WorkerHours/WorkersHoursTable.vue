<template>
  <v-data-table
    :loading="$store.workerhours.pending"
    :headers="[
      { text: $t('tables.headers.name'), align: 'left', sortable: true, value: 'worker.name' },
      { text: $t('tables.headers.timeIn'), align: 'center', sortable: true, value: 'checkIn' },
      { text: $t('tables.headers.timeOut'), align: 'center', sortable: true, value: 'checkOut' },
      { text: $t('tables.headers.actions'), align: 'center', value: null }
    ]"
    :items="$store.workerhours.data || []"
    hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.worker.name }}</td>
      <td class="text-xs-center">{{ $moment(props.item.checkIn).format('hh:mm a') }}</td>
      <td class="text-xs-center">{{ $moment(props.item.checkOut).format('hh:mm a') }}</td>
      <td class="text-xs-center">
        <v-btn icon @click="$router.push({ name: 'workerHoursForm', params: { id: props.item.id }})">
          <v-icon size="17px" color="primary">fa-edit</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</template>
