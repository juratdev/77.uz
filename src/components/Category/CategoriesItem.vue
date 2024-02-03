<script setup>
import { defineProps } from "vue";
const props = defineProps({
  id: String,
  title: String,
  icon: String,
  product_count: Number,
});
</script>

<template>
  <a class="flex items-center cursor-pointer">
    <div
      class="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-icon relative z-[1] border border-gray-4 group-hover/category:border-blue transition-300"
    >
      <img :src="props.icon" alt="" />
      <!-- <i class="text-2xl icon-men" :class="props.icon"></i> -->
    </div>
    <div
      class="rounded-xl group-hover/category:border-blue bg-white border border-gray-4 shadow py-[22px] pl-11 pr-3 -ml-8 w-full flex justify-between items-center relative z-0 transition-300"
    >
      <div class="flex flex-col gap-1 text-left">
        <h2
          class="text-base font-semibold leading-normal text-dark line-clamp-1"
        >
          {{ props.title }}
        </h2>
        <p class="text-sm font-normal text-gray-1 leading-130">
          {{ props.product_count }} объявлений
        </p>
      </div>
      <i
        class="text-[8px] leading-6 -rotate-90 icon-down text-gray-2 group-hover/category:text-blue transition-300"
      ></i></div
  ></a>
</template>
