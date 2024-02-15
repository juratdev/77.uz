<script setup>
import { defineProps } from "vue";
defineProps({
  item: {
    id: String,
    name: String,
    icon: String,
    product_count: Number,
  },
});
</script>

<template>
  <div class="flex items-center cursor-pointer group shadow-3.5xl">
    <div
      class="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-icon relative z-[1] border border-gray-4 group-hover:border-blue duration-300 transition-300"
    >
      <img :src="item.icon" class="category-icon" :alt="item.name" />
      <!-- <i class="text-2xl icon-men text-blue" :class="item.icon"></i> -->
    </div>
    <div
      class="rounded-xl group-hover:border-blue bg-white border border-gray-4 shadow py-[22px] pl-11 pr-3 -ml-8 w-full flex justify-between items-center relative z-0 transition-300 duration-300"
    >
      <div class="flex flex-col gap-1 text-left">
        <h2
          class="text-base font-semibold leading-normal text-dark line-clamp-1"
        >
          {{ item.name }}
        </h2>
        <p class="text-sm font-normal text-gray-1 leading-130">
          {{ item.product_count }} объявлений
        </p>
      </div>
      <i
        class="text-[8px] leading-6 -rotate-90 icon-down text-gray-2 group-hover:border-blu transition-300 duration-300 group-hover:text-blue"
      ></i>
    </div>
  </div>
</template>

<style>
.category-icon {
  filter: invert(54%) sepia(52%) saturate(4419%) hue-rotate(194deg)
    brightness(98%) contrast(95%);
}
</style>
