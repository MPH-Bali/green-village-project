import Vue from 'vue'

// Register all components globally
const components = require.context('.', true, /.*\.vue$/)
components.keys().forEach(fileName => {
  Vue.component(
    fileName.split('/').slice(-1).pop().replace('.vue', ''),
    components(fileName).default || components(fileName)
  )
})
