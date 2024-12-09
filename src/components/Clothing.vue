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
import { onMounted, ref } from "vue";
import { useProductStore } from "../stores/ProductStore";
import StoreItem from "./StoreItem.vue";
import type { ProductDoc } from "../types/product";

const productStore = useProductStore();
const products = ref<ProductDoc[]>([]);

onMounted(() => {
  productStore.init();
  products.value = productStore.filterByCategory("Clothing") as ProductDoc[];
});
</script>
