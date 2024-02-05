<script setup>
// import { defineAsyncComponent } from "vue";
import { data } from "@/data/uz";

// const ProductCard = defineAsyncComponent(() => import("./ProductCard.vue"));
import ProductCard from "./ProductCard.vue";
</script>

<template>
  <div
    class="flex flex-col items-center justify-center pt-10 pb-10 products containerMain"
  >
    <div class="text-center products__title">
      <h1 class="text-[2rem] font-[700] mb-[.5rem]">
        {{ $t("products.title") }}
      </h1>
      <p class="text-[#8E9297]">
        {{ $t("products.minTitle") }}
      </p>
    </div>
    <div
      class="grid grid-cols-2 gap-6 py-8 my-6 sm:grid-cols-3 lg:grid-cols-4 md:my-10 products"
    >
      <ProductCard
        v-for="product in data"
        :key="product.id"
        v-bind="{ product }"
      />
    </div>

    <RouterLink
      to="/products/list"
      class="flex items-center gap-3 border-[2px] border-[#D6D6D6]/50 bg-gray-4 hover:bg-gray-200 transition-300 duration-300 rounded-full py-3 px-7 text-base font-semibold leading-130 text-black"
    >
      {{ $t("products.buttonMore") }}
      <i class="text-base leading-5 text-black -rotate-90 icon-doubleDown"></i>
    </RouterLink>
  </div>
</template>
