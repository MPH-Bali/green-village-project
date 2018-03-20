<template>
  <v-app>
    <v-toolbar flat class="elevation-1" app color="secondary" clipped-left>
      <v-toolbar-items class="ml-0">
        <v-btn flat color="primary">
          <v-icon>fa-recycle</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-title v-text="'Daily Log'" />
      <v-spacer />
      <v-toolbar-items class="mr-0">
        <v-btn flat>
          <v-icon size="30px">menu</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-content>
    <v-bottom-nav app :value="true" :active.sync="$route.path" color="grey darken-4">
      <v-btn flat color="primary"
        v-for="section in sections" :key="section.name"
        :value="section.route" @click.stop="$router.push(section.route)">
        <span class="mt-1">{{ section.name }}</span>
        <v-icon icon="blue" class="mt-1" size="20px">{{ section.icon }}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sections: [
        { name: 'Daily Log', icon: 'fa-calendar-alt', route: '/' },
        { name: 'Add Delivery', icon: 'fa-truck', route: '/delivery' },
        { name: 'Weight Material', icon: 'fa-weight', route: '/material' },
        { name: 'Worker Hours', icon: 'fa-clock', route: '/hours' },
        { name: 'Add Stock', icon: 'fa-cubes', route: '/stock' },
        { name: 'Create Sale', icon: 'fa-credit-card', route: '/sale' },
        { name: 'Add Expense', icon: 'fa-money-bill-alt', route: '/expense' },
        { name: 'Settings', icon: 'fa-cog', route: '/settings' }
      ]
    }
  },
  name: 'App'
}
</script>
