<script setup>
import CategoriesItem from "./CategoriesItem.vue";
import { categories } from "../../data/uz";
</script>

<template>
  <section class="bg-white">
    <div class="text-center containerMain">
      <div class="w-[50%] mt-24 mx-auto top-[-2rem] relative">
        <i
          class="icon-search absolute left-3 top-5 text-[1.2rem] text-[#D5D8DB]"
        ></i>
        <input
          type="search"
          id="search"
          class="border-2 rounded-[8px] outline-none w-full px-[2.5rem] py-[1rem]"
          placeholder="Что вы ищите?"
          autocomplete="off"
          ref="searchModel"
        />
        <button
          class="py-[10px] px-[22px] rounded-[5px] top-[12%] absolute right-[.5rem] bg-[#16191D] text-white z-[2] hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-all duration-300"
        >
          Поиск
        </button>
      </div>
      <div class="text-center category__title">
        <h1 class="text-[2rem] font-[700] mb-[.5rem]">
          {{ $t("categories.title") }}
        </h1>
        <p class="text-[#8E9297]">
          Вы можете найти все категории, которые вам нужны от покупателя
        </p>
      </div>
      <div
        class="grid pb-10 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5"
      >
        <CategoriesItem v-for="item in categories" :item="item" />
      </div>
    </div>
  </section>
</template>
