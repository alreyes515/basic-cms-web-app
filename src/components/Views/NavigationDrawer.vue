<template>
  <v-navigation-drawer
    clipped
    v-model="leftDrawer"
    mini-variant-width="74"
    width="240"
    permanent
    fixed
    app
  >
    <v-list>
      <h2 class="px-5 pt-2 pb-5">{{ title }}</h2>
      <v-list-item
        v-for="(item, i) in sideMenus.items"
          :key="i"
          :to="item.to"
          link
          class="mx-auto"
          active-class="active-nav"
        >
          <v-list-item-title v-text="item.title" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
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
    return {
      sideMenus: {
        items: [
          {
            title: "Products",
            to: "/"
          },
        ]
      },
      leftDrawer: true,
      mini: false
    }
  },

  methods: {
    GoTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.active-nav {
  border-right: solid 2px #2094ff;
}
</style>
