<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log(this.$route.path)
  }
}
</script>
