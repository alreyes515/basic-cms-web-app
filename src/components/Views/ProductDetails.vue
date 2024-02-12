<template>
  <v-container class="overview-container">
    <v-row>
      <v-col cols="12">
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                {{ product.title }}
              </v-card-title>
              
              <v-card-subtitle class="pb-2 pt-1">
                <v-chip outlined color="primary" label class="primary--text text-capitalize">{{ product.category }}</v-chip>
              </v-card-subtitle>
              
              <div class="pl-5">
                <span style="width: 40px;">{{ product.description }}</span>
              </div>

              <v-card-subtitle class="pt-4">
              Rating
              <v-chip v-if="product.rating" outlined color="#C71111" label class="warning--text text--darken-5 text-capitalize">{{ product.rating.rate }}</v-chip>
            </v-card-subtitle>

            <div class="d-flex flex-no-wrap justify-space-between">
              <v-card-text style="color: #f57224; font-size: 18px; line-height: 1.5;" class="font-weight-bold mt-2" color="red">
                ${{ Number(product.price).toFixed(2) }}
              </v-card-text>

              <v-btn
                class="rounded-pill font-weight-medium mr-3 float-right mb-5"
                color="primary"
                depressed
                height="46px"
                dark
                outlined
                @click="isOpen=true"
              >
                Edit Product
              </v-btn>

              <v-btn
                class="rounded-pill font-weight-medium mr-3 float-right mb-5"
                color="error"
                depressed
                height="46px"
                dark
                outlined
                @click="deleteProduct()"
              >
                Delete Product
              </v-btn>
            </div>
            </div>

            <v-avatar
              class="ma-3"
              size="200"
              rounded="0"
            >
              <v-img
                :src="product.image"
                height="600px"
                width="400px"
              ></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <ProductModal :isOpen="isOpen" :isNew="false" :formDetails="product" />
  </v-container>
</template>

<script>
import { useProductsStore } from '@/store/app';
import ProductModal from '@/components/Views/ProductModal.vue'

export default {
  data () {
    return {
      product: {},
      isOpen: false
    }
  },
  components: {
    ProductModal
  },
  
  methods: {
    async findProduct () {
      const stateProduct = useProductsStore();
      await stateProduct.viewProduct(this.$route.params.id);

      this.product = stateProduct.products;
    },
    async deleteProduct() {
      const stateProduct = useProductsStore();
      await stateProduct.deleteProduct(this.$route.params.id);
      setTimeout(() => {
        this.$router.push('/')
      }, 1500);
    },
  },
  created () {
    this.findProduct()
  },
  watch: {}
}
</script>

<style lang="scss" scoped>

.overview-container {
  max-width: 1200px;
}
</style>
