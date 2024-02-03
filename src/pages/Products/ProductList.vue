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
    const response = await storeInstance.get(`/list/ads`);

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
  <div class="product-list-page container mx-auto sm:px-4 px-2 py-6">
    <div class="breadcrumb">
      <p>Home page</p>
    </div>
    <div class="content flex my-4">
      <aside class="filter-side bg-white rounded-lg p-4">
        <h1 class="title text-xl font-bold">Filter goes here</h1>
      </aside>
      <main class="products-list-side ml-4">
        <h1 class="title text-3xl font-bold">Продукты</h1>
        <div class="search-bar">
          <input
            type="text"
            class="outline-none border rounded px-4 py-2 bg-white"
          />
        </div>
        <div class="count text-gray-300">{{ count }} объявлений</div>
        <div class="products space-y-4">
          <div class="product bg-white p-4 rounded-xl">
            <h1 class="product-title font-semibold text-2xl">
              Ветровка для мужчин, дождевик, куртка
            </h1>
          </div>
          <div class="product bg-white p-4 rounded-xl">
            <h1 class="product-title font-semibold text-2xl">
              Ветровка для мужчин, дождевик, куртка
            </h1>
          </div>
          <div class="product bg-white p-4 rounded-xl">
            <h1 class="product-title font-semibold text-2xl">
              Ветровка для мужчин, дождевик, куртка
            </h1>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
