<template>
  <v-card>
    <template v-if="!inEdit">
      <v-banner color="success" top>
        <v-row class="text-center" justify="space-between">
          <v-col>
            <v-card-subtitle class="text-blue">
              {{ product.data.rating + "/5 customers recommend" }}
            </v-card-subtitle>
          </v-col>
          <v-col>
            <v-card-subtitle class="text-green">
              {{ "$" + product.data.price }}
            </v-card-subtitle>
          </v-col>
          <v-col>
            <v-card-subtitle class="text-brown">
              {{ product.data.stock + " In stock near you" }}
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-banner>
      <v-card-title class="text-center">
        {{ product.data.name }}
      </v-card-title>
      <v-img :src="product.data.image" aspect-ratio="1.7"></v-img>
      <v-card-text class="text-center">
        {{ product.data.description }}
      </v-card-text>
    </template>
    <template v-else>
      <v-card-title>
        <v-text-field v-model="editedProduct.name" label="Name" outlined></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="editedProduct.image" label="Image URL" outlined></v-text-field>
      </v-card-text>
      <v-card-text>
        <v-textarea v-model="editedProduct.description" label="Description" outlined></v-textarea>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-slider v-model="editedProduct.rating" :max="5" :min="0" label="Rating" step="0.1"></v-slider>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="editedProduct.price" label="Price" type="number" outlined></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="editedProduct.stock" label="Stock" type="number" outlined></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </template>

    <v-card-actions>
      <v-btn v-if="!inEdit" @click="toggleEdit" color="blue">Modify</v-btn>
      <v-btn v-if="inEdit" @click="updateProduct" color="green">Save Changes</v-btn>
      <v-btn v-if="inEdit" @click="cancelEdit" color="red">Cancel</v-btn>
      <v-btn @click="deleteProduct" color="red">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useProductStore } from "../stores/ProductStore";
import type { ProductDoc, Product } from "../types/product";

type Props = {
  product: ProductDoc;
};
const props = defineProps<Props>();
const productStore = useProductStore();
const inEdit = ref(false);
const editedProduct = ref<Product>({ ...props.product.data });
const toggleEdit = () => {
  inEdit.value = true;
};
const cancelEdit = () => {
  inEdit.value = false;
  editedProduct.value = { ...props.product.data };
};
const updateProduct = async () => {
  const confirmed = confirm("are you happy with these changes?");
  if (confirmed) {
    await productStore.updateProduct(props.product.id, editedProduct.value);
    inEdit.value = false;
  }
};
const deleteProduct = async () => {
  const confirmed = confirm("are you absolutely sure?");
  if (confirmed) {
    await productStore.deleteProduct(props.product.id);
  }
};
</script>
