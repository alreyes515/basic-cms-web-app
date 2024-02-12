// Utilities
import { defineStore } from 'pinia'
import Axios from 'axios'

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      products: [],
      categories: []
    }
  },
  getters: {
    productsList(state) {
      return state.products;
    },
  },
  actions: {
    fetchProducts () {
      return new Promise((resolve, reject) => {
        Axios({
          method: 'get',
          url: 'https://fakestoreapi.com/products'
        })
        .then((response) => {
          this.products = response.data
          resolve(response)
        }).catch(
          (error) => {
            reject(error)
          }
        )
      })
    },

    viewProduct (id) {
      return new Promise((resolve, reject) => {
        Axios({
          method: 'get',
          url: `https://fakestoreapi.com/products/${id}`
        })
        .then((response) => {
          this.products = response.data
          resolve(response)
        }).catch(
          (error) => {
            reject(error)
          }
        )
      })
    },

    createProduct (payload) {
      return new Promise((resolve, reject) => {
        Axios.post('https://fakestoreapi.com/products', JSON.stringify(payload))
        .then((response) => {
          console.log(response)
          resolve(response)
        }).catch(
          (error) => {
            reject(error)
          }
        )
      })
    },

    updateProduct (payload, id) {
      console.log(payload, id)
      return new Promise((resolve, reject) => {
        Axios.patch(`https://fakestoreapi.com/products/${id}`, JSON.stringify(payload))
        .then((response) => {
          console.log(response)
          resolve(response)
        }).catch(
          (error) => {
            reject(error)
          }
        )
      })
    },

    deleteProduct (id) {
      return new Promise((resolve, reject) => {
        Axios(`https://fakestoreapi.com/products/${id}`,{
          method: 'DELETE'
        })
        .then((response) => {
          console.log(response)
          resolve(response)
        }).catch(
          (error) => {
            reject(error)
          }
        )
      })
    },

    fetchCategories () {
      return new Promise((resolve, reject) => {
        Axios({
          method: 'get',
          url: 'https://fakestoreapi.com/products/categories'
        })
        .then((response) => {
          this.categories = response.data
          resolve(response)
        }).catch(
          (error) => {
            reject(error)
          }
        )
      })
    },
  }
})
