<script setup>
import { storeInstance } from "@/instances";
import { onMounted } from "vue";
import { ref } from "vue";
import { defineAsyncComponent } from "vue";
import SkeletonLoading from "../../components/ui/SkeletonLoading.vue";

const ProductCard = defineAsyncComponent(() =>
  import("../../components/Products/ProductCard.vue")
);

// const like = ref(false);
const loading = ref(false);
// const products = ref([]);
const count = ref(0);
const product = ref([]);
const page = ref(0);

// async function pushProducts(product) {
//   products.value.push(product);
// }

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

    // response.data.results.forEach((item) => {
    //   product.value.push(item);
    // });

    page.value++;

    response.data.results.forEach(async (p) => {
      product.value.push(p);
    });

    count.value + response.data.count;

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
  <div class="containerMain product-list-page">
    <div class="breadcrumb">
      <p>Home page</p>
    </div>
    <div class="grid items-start grid-cols-12 gap-6 pt-5 pb-7 content">
      <aside
        class="col-span-4 p-4 bg-white md:rounded-xl max-md:hidden lg:col-span-3 filter-side"
      >
        <h2 class="mb-4 text-xl font-semibold leading-130 text-primary title">
          Фильтр
        </h2>
        <form class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label for="" class="text-sm font-medium leading-5 text-gray"
              >Регион</label
            >
            <div class="relative">
              <div
                class="bg-gray-200 rounded-lg pl-3 p-2.5 cursor-pointer flex justify-between border border-transparent"
              >
                <div class="text-sm leading-5 truncate text-dark">
                  Выберите регион
                </div>
                <span
                  class="inline-block text-[9px] leading-6 -rotate-90 icon-down transition-300 text-gray"
                ></span>
              </div>
              <!-- <div
                class="absolute top-full w-full bg-white rounded-lg z-10 translate-y-3 overflow-x-hidden max-h-[318px] scroll-style options"
              >
                <div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Андижанская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Бухарская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Джизакская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Кашкадарьинская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Навоийская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Наманганская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Самаркандская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Сурхандарьинская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Сырдарьинская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Город Ташкент
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Ташкентская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Ферганская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Хорезмская область
                    </p>
                  </div>
                  <div
                    class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
                  >
                    <p class="text-base font-medium text-dark leading-130">
                      Республика Каракалпакстан
                    </p>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </form>
      </aside>
      <main class="col-span-12 md:col-span-8 lg:col-span-9 products-list-side">
        <div>
          <div class="flex items-center justify-between gap-4">
            <div class="w-full">
              <h1
                class="mb-3 text-2xl md:text-3.5xl leading-130 font-bold text-primary gap-2 title"
              >
                Продукты
              </h1>
              <div class="flex items-center w-full gap-4 mt-14">
                <div class="w-full top-[-2rem] relative max-sm:w-full">
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
                </div>
                <div class="flex items-center gap-3 -mt-14">
                  <!-- <button
                    class="w-8 h-8 text-2xl leading-6 bg-white rounded-lg flex-center icon-filter md:hidden"
                  ></button> -->
                  <button
                    class="text-3xl leading-7 hover:text-blue/90 t icon-list transition-300"
                  ></button
                  ><button
                    class="!text-blue icon-grid text-3xl leading-7 transition-300"
                  ></button>
                </div>
              </div>
              <p
                class="-mt-5 text-lg font-medium text-gray-300 leading-130 count"
              >
                {{ count }} объявлений
              </p>
            </div>
          </div>

          <div v-if="!loading">
            <div
              class="grid grid-cols-2 gap-6 pt-6 pb-8 mt-2 mb-6 sm:grid-cols-2 lg:grid-cols-3 md:mb-5 md:mt-0 products"
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
              class="grid grid-cols-2 gap-6 py-8 my-6 sm:grid-cols-2 lg:grid-cols-3 md:my-10 products"
            >
              <SkeletonLoading v-for="i in 6" :key="i" type="product" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
