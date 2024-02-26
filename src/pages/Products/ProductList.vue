<script setup>
import { storeInstance } from "@/instances";
import { onMounted } from "vue";
import { ref } from "vue";
import { defineAsyncComponent } from "vue";
import SkeletonLoading from "../../components/ui/SkeletonLoading.vue";
import Dropdown from "../../components/Products/Dropdown.vue";

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

const dataOptions1 = [
  "Андижанская область",
  "Бухарская область",
  "Джизакская область",
  "Кашкадарьинская область",
  "Навоийская область",
  "Наманганская область",
  "Самаркандская область",
  "Город Ташкент",
];
const dataOptions2 = [
  "Андижанская область",
  "Бухарская область",
  "Джизакская область",
  "Кашкадарьинская область",
  "Навоийская область",
  "Наманганская область",
  "Самаркандская область",
  "Город Ташкент",
];
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
            <Dropdown title="Выберите регион" :options="dataOptions1" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="" class="text-sm font-medium leading-5 text-gray"
              >Район/город</label
            >
            <Dropdown title="Выберите район/город" :options="dataOptions2" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="" class="text-sm font-medium leading-5 text-gray"
              >Сортировать</label
            >
            <div class="flex flex-col">
              <label
                class="transition group inline-flex items-center relative select-none min-h-[20px] cursor-pointer"
                style="min-height: 20px"
                ><input
                  type="radio"
                  class="absolute invisible w-0 h-0 opacity-0 peer"
                  name="k-radio-591"
                  value="price"
                /><span
                  class="before:w-2 before:h-2 shrink-0 duration-200 ease-in-out bg-white peer-checked:before:opacity-100 mr-2 before:opacity-0 relative border rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 border-gray-3 peer-disabled:before:bg-gray-100 before:bg-blue group-hover:border-blue peer-checked:border-white/20 peer-checked:bg-blue peer-checked:before:!bg-white"
                  style="width: 20px; height: 20px"
                ></span
                ><span
                  class="w-full py-3 text-sm font-medium border-b leading-130 md:group-hover:text-blue transition-300 border-gray-4 group-last:border-b-0 text-dark"
                  >Дешёвые сперва</span
                ></label
              ><label
                class="transition group inline-flex items-center relative select-none min-h-[20px] cursor-pointer"
                style="min-height: 20px"
                ><input
                  type="radio"
                  class="absolute invisible w-0 h-0 opacity-0 peer"
                  name="k-radio-591"
                  value="-price"
                /><span
                  class="before:w-2 before:h-2 shrink-0 duration-200 ease-in-out bg-white peer-checked:before:opacity-100 mr-2 before:opacity-0 relative border rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 border-gray-3 peer-disabled:before:bg-gray-100 before:bg-blue group-hover:border-blue peer-checked:border-white/20 peer-checked:bg-blue peer-checked:before:!bg-white"
                  style="width: 20px; height: 20px"
                ></span
                ><span
                  class="w-full py-3 text-sm font-medium border-b leading-130 md:group-hover:text-blue transition-300 border-gray-4 group-last:border-b-0 text-dark"
                  >Дорогие сперва</span
                ></label
              ><label
                class="transition group inline-flex items-center relative select-none min-h-[20px] cursor-pointer"
                style="min-height: 20px"
                ><input
                  type="radio"
                  class="absolute invisible w-0 h-0 opacity-0 peer"
                  name="k-radio-591"
                  value="published_at"
                /><span
                  class="before:w-2 before:h-2 shrink-0 duration-200 ease-in-out bg-white peer-checked:before:opacity-100 mr-2 before:opacity-0 relative border rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 border-gray-3 peer-disabled:before:bg-gray-100 before:bg-blue group-hover:border-blue peer-checked:border-white/20 peer-checked:bg-blue peer-checked:before:!bg-white"
                  style="width: 20px; height: 20px"
                ></span
                ><span
                  class="w-full py-3 text-sm font-medium border-b leading-130 md:group-hover:text-blue transition-300 border-gray-4 group-last:border-b-0 text-dark"
                  >Новые сперва</span
                ></label
              >
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="" class="text-sm font-medium leading-5 text-gray"
              >Подкатегории</label
            >
            <div>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col items-center justify-between">
                  <div
                    class="group w-full flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b border-gray-4 py-2.5"
                  >
                    <span
                      class="duration-300 ease-in-out relative shrink-0 inline-block h-5 w-5 rounded-md border border-gray-3 group-hover:border-blue !border-white/20 !bg-blue"
                    >
                      <span
                        class="icon-tick text-[9px] top-1/2 left-1/2 leading-5 text-white transform -translate-x-1/2 -translate-y-1/2 transition-200 absolute z-[1]"
                      ></span>
                    </span>
                    <div>
                      <span
                        class="text-sm font-medium leading-130 text-dark transition-300 group-hover:text-blue"
                        >Все разделы</span
                      >
                    </div>
                  </div>
                  <div class="w-full">
                    <div class="w-full border-b border-gray-4">
                      <div class="flex items-center w-full gap-2 group">
                        <div
                          class="group flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b-0 py-2.5"
                        >
                          <span
                            class="duration-300 ease-in-out relative shrink-0 inline-block h-5 w-5 rounded-md border border-gray-3 group-hover:border-blue !border-white/20 !bg-blue"
                            ><span
                              class="icon-tick text-[9px] top-1/2 left-1/2 leading-5 text-white transform -translate-x-1/2 -translate-y-1/2 transition-200 absolute z-[1]"
                            ></span
                          ></span>
                        </div>
                        <div
                          class="flex items-center justify-between flex-grow cursor-pointer"
                        >
                          <p
                            class="text-sm font-medium leading-130 text-dark transition-300 group-hover:text-blue"
                          >
                            Мужская одежда
                          </p>
                          <div
                            class="text-[9px] font-bold leading-5 -rotate-90 icon-down transition-300 text-gray-1"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <button
                    class="bg-blue w-full text-white hover:bg-blue-1 px-6 py-2.5 text-sm font-semibold leading-5 rounded-lg relative transition-300 active:scale-95 disabled:bg-gray-bg disabled:text-gray-2"
                    type="submit"
                  >
                    <span
                      class="flex items-center justify-center gap-2 opacity-100 transition-300 whitespace-nowrap"
                      ><span class="">Применить фильтр</span></span
                    >
                  </button> -->
                </div>
              </div>
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
