<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" v-for="product in products" :key="product.id">
        <StoreItem :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/ProductStore";
import StoreItem from "./StoreItem.vue";

const productStore = useProductStore();
const products = ref([]); 

onMounted(async () => {
  await productStore.init();
  products.value = [...productStore.products]; 
});
</script>

