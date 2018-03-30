<template>
  <div>
    <button @click="add">Add</button>
    <button @click="$store.foo.unsubscribe">unsubscribe</button>
    <p v-for="foo in $store.foo.data" :key="foo.id">
      <span class="mx-2">{{ foo.id }}</span>
      <span class="mx-2">{{ foo.bar }}</span>
      <span class="mx-2" @click="$store.foo.remove(foo.id)"> del</span>
    </p>
    <h1 v-if="$store.foo.pending">loading</h1>
  </div>
</template>

<script>
export default {
  created () {
    this.$sync({
      foo: this.$db.collection('foo')
    })
  },
  methods: {
    add () {
      this.$store.foo.add({ bar: 'foo' })
    }
  }
}
</script>
