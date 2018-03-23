import Vue from 'vue'
import I18n from 'vue-i18n'

import en from './en'
import id from './id'

Vue.use(I18n)

export default new I18n({
  locale: 'en', // set locale
  messages: { en, id }
})
