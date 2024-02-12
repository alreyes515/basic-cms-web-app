<template>
  <v-main>
    <v-sheet
      class="mx-auto pa-2 pt-6"
      color="grey-lighten-2"
    >
      <v-container fluid>
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-text-field
            v-model="search"
            clearable
            class="mb-8 px-6"
            density="compact"
            flat
            hide-details
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            style="width: 600px;"
            @keyup.enter="searchByTitle()"
          ></v-text-field>

          <v-btn
            class="rounded-pill font-weight-medium mr-3 float-right mb-5"
            color="primary"
            depressed
            height="46px"
            dark
            outlined
            @click="isOpen=true"
          >
            + Add Product
          </v-btn>
        </div>
       
        <v-row align="center">
          <v-col
            v-for="(product, key) in products"
            :key="key"
            cols="3"
          > 
          <v-card
            class="mx-auto"
            max-width="344"
            @click="goTo(product.id)"
          >
            <v-img
              :src="product.image"
              height="200px"
            ></v-img>

            <v-card-title>
              {{ product.title }}
            </v-card-title>

            <v-card-actions>
              <v-card-text style="color: #f57224; font-size: 18px; line-height: 1.5;" class="font-weight-bold mt-2" color="red">
                ${{ Number(product.price).toFixed(2) }}
              </v-card-text>

              <v-spacer></v-spacer>

              <v-rating
                class="float-right"
                :length="5"
                :size="20"
                :model-value="product.rating.rate"
                active-color="orange-lighten-3"
                readonly=""
              />

            </v-card-actions>
          </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <ProductModal :isOpen="isOpen" :isNew="true" />
  </v-main>
</template>

<script>
import { useProductsStore } from '@/store/app';
import ProductModal from '@/components/Views/ProductModal.vue'

export default {
  components: {
    ProductModal
  },
  data () {
    return {
      product: {},
      products: [],
      resultProducts: [],
      isOpen: false,
      search: ''
    }
  },
  computed: {},
  methods: {
    async searchByTitle() {
      await this.getData();
      const result = this.products.filter(obj => obj.title.toLowerCase().includes(this.search.toLowerCase()));
      this.products = result;
    },
    async getData() {
      const products = useProductsStore();
      await products.fetchProducts();

      this.products = products.products;
    },
    async createProduct() {
      const payload = {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
      }

      const product = useProductsStore();
      await product.createProduct(payload);
    },

    goTo(id) {
      this.$router.push(`/${id}`)
    }
    
  },
  mounted () {},
  created () {
    this.getData()
  },
  watch: {}
}
</script>