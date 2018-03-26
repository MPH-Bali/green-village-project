import Vue from 'vue'
import I18n from 'vue-i18n'
import localStorage from 'local-storage'

import en from './en'
import id from './id'

Vue.use(I18n)

const getLocale = () => {
  return localStorage.get('locale') || 'en'
}

export default new I18n({
  locale: getLocale(), // set locale
  messages: { en, id }
})
