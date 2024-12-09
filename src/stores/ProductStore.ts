import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { initProducts } from "../data-init";
import type { Product, ProductDoc } from "../types/product";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[],
  }),

  actions: {
    async init() {
      const productsCollection = collection(db, "products");
      let snapshot = await getDocs(productsCollection);

      if (snapshot.empty) {
        for (const product of initProducts) {
          await addDoc(productsCollection, product);
        }
        snapshot = await getDocs(productsCollection);
      }

      const products: ProductDoc[] = [];
      snapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data() as Product;
        products.push({ id: docSnapshot.id, data });
      });
      this.products = products;
    },

    async createProduct(newProduct: Product) {
      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, newProduct);
      await this.init();
    },

    async deleteProduct(productId: string) {
      const productDoc = doc(db, "products", productId);
      await deleteDoc(productDoc);
      await this.init();
    },

    async updateProduct(productId: string, updatedData: Product) {
      const productDoc = doc(db, "products", productId);
      await updateDoc(productDoc, updatedData);
      await this.init();
    },

    filterByCategory(category: string): ProductDoc[] {
      return this.products.filter(
        (product) => product.data.category === category
      );
    },

    filterByRating(minRating: number): ProductDoc[] {
      return this.products.filter(
        (product) => product.data.rating >= minRating
      );
    },
  },
});
