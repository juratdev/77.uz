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
        Вы можете найти все категории, которые вам нужны от покупателя
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

    <button
      class="flex items-center justify-center gap-2 border-[2px] border-[#D6D6D6]/50 bg-gray-4 hover:bg-gray-3 transition-300 rounded-full py-3 px-7 text-base font-semibold leading-130 text-dark mx-auto"
    >
      Показать больше
      <i class="text-xl leading-5 -rotate-90 icon-doubleDown text-dark"></i>
    </button>
  </div>
</template>
