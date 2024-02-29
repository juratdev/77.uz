<script setup>
import { storeInstance } from "@/instances";
import { onMounted } from "vue";
import { ref } from "vue";
import { defineAsyncComponent } from "vue";
import SkeletonLoading from "../../components/ui/SkeletonLoading.vue";
import Nodata from "../../components/noData.vue";
const ProductCard = defineAsyncComponent(() =>
  import("../../components/Products/ProductCard.vue")
);

const products = ref([]);
const loading = ref(true);
const deviceID = JSON.parse(localStorage.getItem("deviceId"));

async function loadProducts(id) {
  try {
    loading.value = true;
    const response = await storeInstance.get(`/my-favourite-product-by-id/`, {
      headers: {
        "Device-Id": id,
      },
    });

    products.value = response.data.results;
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
}

onMounted(() => {
  if (deviceID) {
    loadProducts(deviceID);
  } else {
    console.error("Device ID topilmadi");
  }
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center pt-10 pb-10 products containerMain"
  >
    <div v-if="!loading && products.length">
      <div
        class="grid w-full grid-cols-2 gap-6 my-6 sm:grid-cols-3 lg:grid-cols-4 md:my-10"
      >
        <ProductCard
          v-for="(item, key) in products"
          :key="key"
          :item="item"
          :slug="item.slug"
        />
      </div>
    </div>
    <Nodata v-if="!loading && !products.length" />
    <div class="w-full" v-if="loading">
      <div
        class="grid w-full grid-cols-2 gap-6 my-6 sm:grid-cols-3 lg:grid-cols-4 md:my-10"
      >
        <SkeletonLoading v-for="i in 4" :key="i" type="product" />
      </div>
    </div>
  </div>
</template>
