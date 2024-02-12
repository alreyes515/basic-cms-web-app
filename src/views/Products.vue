<template>
  <div>
    <custom-navigation :title="`CMS Web App`" />
    <products-list />
  </div>
</template>

<script>
  import CustomNavigation from '@/components/Views/NavigationDrawer.vue'
  import ProductsList from '@/components/Views/ProductsList.vue'

  export default {
    name: 'main-view',
    components: {
      CustomNavigation,
      ProductsList
    },
  }
</script>
