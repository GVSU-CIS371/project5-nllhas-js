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
import { computed, onMounted } from "vue";
import { useProductStore } from "../stores/ProductStore";
import StoreItem from "./StoreItem.vue";

const productStore = useProductStore();
const products = computed(() => productStore.products); 

onMounted(async () => {
  await productStore.init();
});
</script>

