<script setup>
import { storeInstance } from "@/instances";
import { onMounted } from "vue";
import { ref } from "vue";
import { defineAsyncComponent } from "vue";
import SkeletonLoading from "../ui/SkeletonLoading.vue";

const ProductCard = defineAsyncComponent(() => import("./ProductCard.vue"));

const product = ref([]);
const loading = ref(false);

let deviceId = localStorage.getItem("deviceId");

async function loadProducts() {
  if (!deviceId) {
    deviceId = Math.floor(Math.random() * 10000000000 + 1) + "";
    localStorage.setItem("deviceId", deviceId);
  }
  try {
    loading.value = true;
    const response = await storeInstance.get(`/list/ads/`, {
      headers: {
        "Device-id": localStorage.getItem("deviceId"),
      },
    });

    response.data.results.forEach((item) => {
      product.value.push(item);
    });

    return;
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
}

onMounted(async () => {
  await loadProducts();
});
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
    <div v-if="!loading">
      <div
        class="grid w-full grid-cols-2 gap-6 my-6 sm:grid-cols-3 lg:grid-cols-4 md:my-10"
      >
        <ProductCard
          v-for="(item, key) in product"
          :key="key"
          :item="item"
          :slug="item.slug"
        />
      </div>
    </div>
    <div class="w-full" v-if="loading">
      <div
        class="grid w-full grid-cols-2 gap-6 my-6 sm:grid-cols-3 lg:grid-cols-4 md:my-10"
      >
        <SkeletonLoading v-for="i in 6" :key="i" type="product" />
      </div>
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
