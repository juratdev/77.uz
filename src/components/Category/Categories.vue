<script setup>
import { storeInstance } from "@/instances";
import { onMounted } from "vue";
import { ref } from "vue";
import CategoriesItem from "./CategoriesItem.vue";
import SkeletonLoading from "@/components/ui/SkeletonLoading.vue";

const categories = ref([]);
const loading = ref(false);

async function loadCategory() {
  try {
    loading.value = true;
    const response = await storeInstance.get(`/category/`);

    if (!response) {
      throw new Error("Internet bilan aloqa yo'q");
    }

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    response.data.forEach(async (p) => {
      categories.value.push(p);
    });

    return;
  } catch (error) {
    alert(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
}

onMounted(async () => {
  await loadCategory();
});
</script>

<template>
  <section class="bg-white">
    <div class="text-center containerMain">
      <div class="w-[50%] mt-24 mx-auto top-[-2rem] relative max-sm:w-full">
        <i
          class="icon-search absolute left-3 top-5 text-[1.2rem] text-[#D5D8DB]"
        ></i>
        <input
          type="search"
          id="search"
          class="border-2 rounded-[8px] outline-none w-full px-[2.5rem] py-[1rem]"
          :placeholder="$t('search.placeholder')"
          autocomplete="off"
          ref="searchModel"
        />
        <button
          class="py-[10px] px-[22px] rounded-[5px] top-[12%] absolute right-[.5rem] bg-[#16191D] text-white z-[2] hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-all duration-300"
        >
          {{ $t("search.text") }}
        </button>
      </div>
      <div class="text-center category__title">
        <h1 class="text-[2rem] font-[700] mb-[.5rem]">
          {{ $t("categories.title") }}
        </h1>
        <p class="text-[#8E9297]">
          {{ $t("categories.minTitle") }}
        </p>
      </div>

      <div>
        <div
          class="grid pb-10 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5"
          v-show="!loading"
        >
          <CategoriesItem v-for="item in categories" :item="item" />
        </div>
        <div
          class="grid pb-10 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5"
          v-show="loading"
        >
          <SkeletonLoading type="category" v-for="i in 3" :key="i" v-show="loading" />
        </div>
      </div>
    </div>
  </section>
</template>
