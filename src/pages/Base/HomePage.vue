<script setup>
import { defineAsyncComponent } from "vue";

const Categories = defineAsyncComponent(() => {
  return import("@/components/Category/Categories.vue");
});
const Products = defineAsyncComponent(() => {
  return import("@/components/Products/ProductsShow.vue");
});
</script>

<template>
  <div class="home-page">
    <Categories />
    <Products />
  </div>
</template>
