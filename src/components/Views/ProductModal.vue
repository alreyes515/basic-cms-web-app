<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <v-card>
        <v-card-title>
          <span class="title">Product Details</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Title"
                  v-model="title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Image"
                  v-model="image"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  v-model="description"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="categories.length ? categories : []"
                  v-model="category"
                  label="Category*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Price"
                  type="number"
                  v-model="price"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="isNew ? saveNewProduct() : updateProduct()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { useProductsStore } from '@/store/app';
  export default {
    props: {
      isNew: {
        type: Boolean,
        default: true,
        required: true
      },
      formDetails: {
        type: Object,
        default: () => ({}),
      },
      isOpen: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data () {
      return {
        dialog: false,
        title: '',
        description: '',
        category: '',
        image: '',
        price: null,
        categories: []
      }
    },
    created() {
      this.getCategories()
    },
    methods: {
      async getCategories() {
        const categories = useProductsStore();
        await categories.fetchCategories();

        this.categories = categories.categories;
        console.log('categories', this.categories)
      },
      async updateProduct() {
        const payload = {
          title: this.title,
          price: this.price,
          description: this.description,
          image: this.image,
          category: this.category
        }
        const product = useProductsStore();
        await product.updateProduct(payload, this.$route.params.id);
        setTimeout(() => {
          this.dialog = false
        }, 500);
      },
      async saveNewProduct() {
        const payload = {
          title: this.title,
          price: this.price,
          description: this.description,
          image: this.image,
          category: this.category
        }
        const product = useProductsStore();
        await product.createProduct(payload);
        setTimeout(() => {
          this.dialog = false
        }, 500);
      },
    },
    watch: {
      isOpen(val) {
        this.dialog = val
      },
      formDetails(val) {
        if (!this.isNew) {
          this.title = val.title
          this.description = val.description
          this.image = val.image
          this.price = val.price
          this.category = val.category
        }
      }
    }
  }
</script>