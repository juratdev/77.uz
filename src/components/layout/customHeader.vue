<script setup>
import { data } from "../../data/uz";
</script>

<template>
  <header
    class="border-b border-gray-00 bg-white/90 mb-4 md:mb-3 sticky top-0 z-[5] backdrop-blur-[6px]"
  >
    <div class="flex justify-between containerMain">
      <div class="flex items-center gap-6">
        <div class="relative">
          <div class="">lang</div>
        </div>
        <a
          href="tel: +998885005000"
          class="gap-1 flex-y-center group max-lg:hidden"
          ><i
            class="text-xl leading-5 icon-phone text-gray-2 group-hover:text-blue transition-300"
          ></i
          ><span
            class="text-sm font-medium leading-130 text-dark hover:text-blue transition-300"
            >+998 88 500 50 00</span
          ></a
        >
      </div>
      <a
        href="/"
        class="absolute-x top-0 bg-white border border-t-0 border-gray-4 rounded-b-[20px] p-3 md:px-4 md:py-3"
        ><img class="max-md:h-12" src="../../assets/images/logo.svg" alt=""
      /></a>
      <div class="flex items-center gap-3 sm:gap-4">
        <a
          href="#"
          class="flex items-center gap-2 text-dark text-sm font-semibold leading-5 hover:text-blue transition-300 max-sm:p-1.5 max-sm:bg-gray-bg max-sm:rounded-lg"
        >
          <span class="max-md:hidden">Избранные</span></a
        >
        <span class="w-px h-8 bg-gray-bg max-sm:hidden"></span>
        <button
          class="bg-gray-4 text-dark hover:bg-gray-3 px-6 md:px-7 py-2.5 md:py-3 text-sm md:text-base font-semibold leading-130 rounded-lg relative transition-300 active:scale-95 disabled:bg-gray-bg disabled:text-gray-2 max-sm:!p-2.5"
          type="button"
        >
          <span
            class="gap-2 text-center opacity-100 flex-center transition-300 whitespace-nowrap"
            ><span class="max-sm:hidden">Войти</span
            ><span class="text-xl leading-5 icon-login"></span
          ></span>
        </button>
      </div>
    </div>
  </header>
</template>
