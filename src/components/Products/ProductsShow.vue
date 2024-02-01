<script setup>
import { defineAsyncComponent } from "vue";
import { data } from "@/data/uz";

const ProductCard = defineAsyncComponent(() => import("./ProductCard.vue"));
</script>

<template>
  <div class="products flex flex-wrap items-center justify-center py-8">
    <ProductCard
      v-for="product in data"
      :key="product.id"
      :productId="product.id"
      :producTitle="product.title"
    />
  </div>
</template>
