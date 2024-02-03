<script setup>
import { storeInstance } from "@/instances";
import { onMounted } from "vue";
import { ref } from "vue";

const loading = ref(false);
const products = ref([]);
const count = ref(0);
const page = ref(0);

async function pushProducts(product) {
  products.value.push(product);
}

async function loadProductsList() {
  try {
    const response = await storeInstance.get(`/list/ads/`);

    if (!response) {
      throw new Error("Internet bilan aloqa yo'q");
    }

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    if (page.value < 0 || page.value > 3) {
      return;
    }

    page.value++;

    response.data.results.forEach(async (p) => {
      await pushProducts(p);
    });

    count.value + response.data.count;

    console.log(products.value);

    return;
  } catch (error) {
    alert(error);
  }
}

onMounted(async () => {
  await loadProductsList();
});
</script>

<template>
  <div class="container px-2 py-6 mx-auto product-list-page sm:px-4">
    <div class="breadcrumb">
      <p>Home page</p>
    </div>
    <div class="flex my-4 content">
      <aside class="p-4 bg-white rounded-lg filter-side">
        <h1 class="text-xl font-bold title">Filter goes here</h1>
      </aside>
      <main class="ml-4 products-list-side">
        <h1 class="text-3xl font-bold title">Продукты</h1>
        <div class="search-bar">
          <input
            type="text"
            class="px-4 py-2 bg-white border rounded outline-none"
          />
        </div>
        <div class="text-gray-300 count">{{ count }} объявлений</div>
        <div
          class="grid grid-cols-2 gap-6 py-8 my-6 sm:grid-cols-3 lg:grid-cols-4 md:my-10 products"
        >
          <div
            v-for="(product, key) in products"
            :key="key"
            class="p-4 bg-white product rounded-xl"
          >
            <h1 class="text-2xl font-semibold product-title">
              {{ product.name }}
            </h1>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
