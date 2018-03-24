<template>
  <v-layout row wrap class='add-worker'>
    <v-flex xs6 >
      <p class='subheading'>Worker name</p>
      <v-select solo flat :items="workers" 
              v-model="formdata.worker"
              item-text="name" 
              item-value="id"
              return-object
              label="" class='grey-select banjar' />

      <div class='devider-container'>
        <div class='devider subheadingfont'><span>Morning</span></div>
      </div>

      <v-layout row wrap>
        <v-flex xs6 >
          <p class='subheading'>In</p>
          <v-layout row wrap>
            <v-flex xs6 >
              <v-text-field
                type="number" 
                class='grey-select' 
                solo flat 
                name="input-1">
              </v-text-field>
            </v-flex>
            <v-flex xs6 >
              <v-text-field
                type="number" 
                class='grey-select' 
                solo flat 
                name="input-1">
              </v-text-field>
            </v-flex>
            <div class="separator"><span>:</span></div>
          </v-layout>
        </v-flex>
        <v-flex xs6 >
          <p class='subheading'>Out</p>
          <v-layout row wrap>
            <v-flex xs6 >
              <v-text-field
                type="number" 
                class='grey-select' 
                solo flat 
                name="input-1">
              </v-text-field>
            </v-flex>
            <v-flex xs6 >
              <v-text-field
                type="number" 
                class='grey-select' 
                solo flat 
                name="input-1">
              </v-text-field>
            </v-flex>
            <div class="separator"><span>:</span></div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs6 x>
      <p class='subheading'>Notes</p>
      <v-text-field
              v-model="formdata.notes"
              type="number" 
              class='grey-select' 
              solo flat 
              name="input-1"></v-text-field>

      <div class='devider-container'>
        <div class='devider subheadingfont'><span>Afternoon</span></div>
      </div>

      <v-layout row wrap>
        <v-flex xs6 >
          <p class='subheading'>In</p>
          <v-layout row wrap>
            <v-flex xs6 >
              <v-text-field
                type="number" 
                class='grey-select' 
                solo flat 
                name="input-1">
              </v-text-field>
            </v-flex>
            <v-flex xs6 >
              <v-text-field
                type="number" 
                class='grey-select' 
                solo flat 
                name="input-1">
              </v-text-field>
            </v-flex>
            <div class="separator"><span>:</span></div>
          </v-layout>
        </v-flex>
        <v-flex xs6 >
          <p class='subheading'>Out</p>
          <v-layout row wrap>
            <v-flex xs6 >
              <v-text-field
                type="number" 
                class='grey-select' 
                solo flat 
                name="input-1">
              </v-text-field>
            </v-flex>
            <v-flex xs6 >
              <v-text-field
                type="number" 
                class='grey-select' 
                solo flat 
                name="input-1">
              </v-text-field>
            </v-flex>
            <div class="separator"><span>:</span></div>
          </v-layout>
        </v-flex>
      </v-layout>


    </v-flex>

    <v-flex xs4>
      <v-card dark color="primary">
        <v-card-text class="px-0"></v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs4>
      <v-card dark color="primary">
        <v-card-text class="px-0"></v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs4>
      <v-card dark color="primary">
        <v-card-text class="px-0"></v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        worker: null,
        notes: ''
      }
    }
  },
  computed: {
    workers () {
      return this.$firestore.collections.person.filter((person) => person.type && person.type.employee)
    }
  }
}
</script>

<style scoped>
.subheading {
  margin-bottom: 0px!important;
}

.add-worker {
  background-color: white;
}
.grey-select {
  background-color: rgba(66, 133, 61, 0.1)!important;
}

.separator {
  text-align: center;
  width: 100%;
  margin-top: -40px;
}

.devider-container {
  padding-top: 3vw;
}

.devider{
  text-align: center;
  border-bottom: 1px solid #ecf2eb; 
  line-height: 0.1em;
  margin: 10px 0 20px; 
}

.devider span{
  background-color: white;
  color: #152935;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  padding-left: 5px;
  padding-right: 5px;
}
</style>