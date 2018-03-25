<template>
  <div class="loadingWheelContainer">
    <v-progress-circular indeterminate :size="70" :width="7" color="primary"></v-progress-circular>
  </div>
</template>

<style scoped>
  .loadingWheelContainer{
    display: flex;
    height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;    
  }
</style>

