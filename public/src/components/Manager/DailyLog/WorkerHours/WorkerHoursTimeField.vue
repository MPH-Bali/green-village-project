<template>
  <div>
    <p class='title'>Time {{ this.part }}</p>
      <v-layout>
        <v-flex xs6 sm6>
          <v-select solo flat :items="hours" 
                  v-model="time"
                  return-object
                  label="" class='grey-select banjar' />
        </v-flex>
        <v-flex xs6 sm6>
          <div class='ampmbutton'>
            <div @click='setAm' class='am' v-bind:class="{ 'active': am, 'inactive': !am }">
              AM
            </div>
            <div @click='setPm' class='pm' v-bind:class="{ 'active': !am, 'inactive': am }">
              PM
            </div>
          </div>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
export default {
  props: ['part', 'editTime'],
  data () {
    const hours = []
    for (let i = 12; i >= 1; i--) {
      hours.push((i < 10) ? `0${i}:00` : `${i}:00`)
    }

    return {
      hours,
      time: '',
      am: true
    }
  },
  computed: {
    timeText () {
      return (this.am) ? 'AM' : 'PM'
    }
  },
  methods: {
    setAm () {
      this.am = true
    },
    setPm () {
      this.am = false
    },
    returnTime () {
      const postfix = (this.am) ? ' AM' : ' PM'
      const formated = this.$moment(this.time + postfix, 'hh:mm A').toDate()
      this.$emit('done', {time: formated, part: this.part})
    }
  },
  watch: {
    time () {
      this.returnTime()
    },
    am () {
      if (this.time) {
        this.returnTime()
      }
    },
    editTime (time) {
      const formatted = this.$moment(time).format('hh:mm')
      const postfix = this.$moment(time).format('A')
      this.am = postfix === 'AM'
      this.time = formatted
    }
  }
}
</script>

<style scoped>
.grey-select {
  background-color: rgba(66, 133, 61, 0.1)!important;
}
.title {
  margin: 0!important;
}

.ampmbutton {
  padding-top: 1px;
}

.ampmbutton div{
  padding-top: 12px;
  display: inline-block;
  height: 45px;
  width: 50px;
  text-align: center;
  box-shadow: 0 0 2px rgba(0,0,0,0.5);
  cursor: pointer;
}

.ampmbutton .active {
  color: #4caf50;
  border: 1px solid #4caf50;
}

.ampmbutton .inactive {
  color: #dedede;
  border: 1px solid #dedede;
}

.ampmbutton .pm {
  margin-left: 5px;
}
</style>