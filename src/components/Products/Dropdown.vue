<script setup>
import { ref } from "vue";

defineProps({
  title: String,
  options: Array,
});

const open = ref(false);

const handleOpen = () => (open.value = !open.value);
</script>

<template>
  <div class="relative">
    <div
      class="rounded-lg pl-3 p-2.5 cursor-pointer flex items-center justify-between border border-[#EAEDF0]"
      @click="handleOpen"
    >
      <div class="text-sm leading-5 truncate text-primary">{{ title }}</div>
      <span
        class="inline-block text-[9px] leading-6 -rotate-90 icon-down transition-300 text-gray"
      ></span>
    </div>
    <div
      v-if="open"
      class="absolute shadow-3.6xl top-full w-full bg-white rounded-lg z-10 translate-y-3 overflow-x-hidden max-h-[318px] scroll-style options"
    >
      <div>
        <div
          v-for="(item, index) in options"
          :key="index"
          class="p-4 duration-300 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
        >
          <p class="text-base font-medium text-dark leading-130">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
