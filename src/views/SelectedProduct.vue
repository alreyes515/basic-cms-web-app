<template>
  <div>
    <custom-navigation :title="`CMS Web App`" />
    <product-details />
  </div>
</template>

<script>
  import CustomNavigation from '@/components/Views/NavigationDrawer.vue'
  import ProductDetails from '@/components/Views/ProductDetails.vue'

  export default {
    name: 'main-view',
    components: {
      CustomNavigation,
      ProductDetails
    },
  }
</script>
