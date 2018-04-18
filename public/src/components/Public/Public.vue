<template>
  <v-app>
    <v-toolbar flat class="elevation-1" app color="secondary" clipped-left>
      <v-toolbar-items class="ml-0">
        <v-btn flat color="primary" @click="$router.push('/manager')" class="main-mph-btn">
         <img src="../../../static/icons/icon-72x72.png">
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items class="mr-0">
        <v-btn flat color="primary" @click="$router.push('/pickup-schedule')">{{ $t('common.pickupSchedule') }}</v-btn>
        <v-btn flat color="primary" @click="$router.push('/sign-up')" >{{ $t('common.signup') }}</v-btn>
        <v-menu offset-y :auto="true">
          <v-btn flat slot="activator">
            <img :src="currentLangItem && currentLangItem.img">
          </v-btn>
          <v-list class="py-0">
            <v-list-tile v-for="item in items" 
                        :key="item.title"  
                         :class="{ 'active-language': item.value === currentLang }" >
              <v-list-tile-title @click="setLanguage(item.value)" class="btn__content">
                <img :src="item.img"/>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>

      <v-layout>
        <v-flex row wrap xs12 md8 offset-md2 lg6 offset-lg3 text-xs-center>
          <v-layout row wrap>
            <v-slide-y-transition mode="out-in">
              <router-view v-if="$firestore.charts"/>
            </v-slide-y-transition>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout row wrap text-xs-center>
        <v-flex xs12 style="background: linear-gradient(#fafafa 50%, #424242 50%)">
          <v-btn target="_blank" href="https://www.facebook.com/MerahPutihHijau/" class="mx-3" icon color="accent">
            <v-icon color="primary">fab fa-facebook</v-icon>
          </v-btn>
          <v-btn target="_blank" href="https://www.instagram.com/mph.bali/" class="mx-3" icon color="accent">
            <v-icon color="primary">fab fa-instagram</v-icon>
          </v-btn>
          <v-btn class="mx-3" icon color="accent">
            <v-icon color="primary">fab fa-whatsapp</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 class="grey darken-3 white--text">
          <router-link to="contact-us">{{ $t('common.contactUs') }}</router-link>
          <p class="body-1 my-3">{{ $t('common.sendFeedback') }}</p>
          <p class="body-1 my-3">{{ $t('common.contribute') }}</p>
          <p class="body-1 my-3">{{ $t('common.faq') }}</p>
        </v-flex>
      </v-layout>

    </v-content>
  </v-app>
</template>

<script>
import localStorage from 'local-storage'

export default {
  data: () => ({
    items: [{
      title: 'Bahasa',
      value: 'id',
      img: 'http://www.countryflags.io/ID/shiny/32.png'
    }, {
      title: 'English',
      value: 'en',
      img: 'http://www.countryflags.io/GB/shiny/32.png'
    }],
    langItems: [{
      text: 'Bahasa',
      value: 'id'
    }, {
      text: 'English',
      value: 'en'
    }]
  }),
  created () {
    this.$firestore.syncCharts()
  },
  methods: {
    setLanguage (val) {
      localStorage.set('locale', val)
      this.$i18n.locale = val
    }
  },
  computed: {
    currentLang () {
      return this.$root.$options.i18n.locale
    },
    currentLangItem () {
      return this.items.find(item => item.value === this.currentLang)
    }
  }
}
</script>

<style scoped>
.main-mph-btn img {
  height: 72%;
}

.active-language {
  background-color: #42853d;
  color: white;
}
</style>
