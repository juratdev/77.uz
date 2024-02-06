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
          class="grid grid-cols-2 gap-6 py-8 my-6 sm:grid-cols-2 lg:grid-cols-3 md:my-10 products"
        >
          <div
            v-for="(product, key) in products"
            :key="key"
            class="p-4 bg-white product rounded-xl"
          >
            <div
              class="relative flex flex-col w-full overflow-hidden bg-white border-2 border-white cursor-pointer product-card rounded-xl transition-300 group"
            >
              <div class="w-full h-64 max-sm:h-44 max-xs:h-30 rounded-t-xl">
                <img
                  :src="product.photo"
                  class="object-cover w-full h-full rounded-t-lg"
                  :alt="product.name"
                />
              </div>
              <div>
                <button
                  @click="addToSaved(product.id)"
                  class="absolute top-3 left-3"
                >
                  <i
                    class="text-2xl text-white"
                    :class="like ? 'icon-liked' : 'icon-like'"
                  ></i>
                </button>

                <div class="p-5">
                  <span
                    class="rounded-md text-[#63676C] px-2 py-1 bg-[#EAEDF0]"
                    >{{ product.address.district.region.name }}</span
                  >
                  <h1
                    class="mt-5 mb-2 text-lg font-semibold text-black duration-300 md:text-lg leading-130 line-clamp-2 group-hover:text-blue transition-300"
                  >
                    {{ product.name }}
                  </h1>
                  <p
                    class="font-normal text-xs text-[#8E9297] md:text-sm text-gray-1 leading-130"
                  >
                    Вчера, 19:20
                  </p>
                  <p class="text-[#8E9297] text-base font-semibold mt-2 mb-4">
                    +998 71 200 70 07
                  </p>
                  <div class="flex gap-2 products-center">
                    <h4
                      class="text-base font-bold text-black md:text-2xl leading-130"
                    >
                      {{ product.price }}
                    </h4>
                    <span
                      class="text-xs font-medium leading-5 uppercase text-blue md:leading-6 md:text-base"
                      >sum</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
