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
import { onMounted, computed } from "vue";
import { useProductStore } from "../stores/ProductStore";
import StoreItem from "./StoreItem.vue";
import type { ProductDoc } from "../types/product";

const productStore = useProductStore();
const products = computed(() => productStore.filterByCategory("Electronics") as ProductDoc[]);

onMounted(() => {
  productStore.init();
});
</script>
