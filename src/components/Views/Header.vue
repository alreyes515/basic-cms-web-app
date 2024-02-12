<template>
  <v-app-bar
    color="grey-lighten-4"
    flat
    height="72"
  >
    <h2 class="px-5">{{ title }}</h2>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  mounted () {},
  created () {},
  watch: {}
}
</script>