<script setup>
import { storeInstance, usingInstance } from "@/instances";
import { onMounted } from "vue";
import { ref } from "vue";
import { defineAsyncComponent } from "vue";
import SkeletonLoading from "../../components/ui/SkeletonLoading.vue";
import Dropdown from "../../components/Products/Dropdown.vue";
import Accordion from "../../components/Accordion.vue";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
const { t, locale } = useI18n();

const ProductCard = defineAsyncComponent(() =>
  import("../../components/Products/ProductCard.vue")
);
const ProductLine = defineAsyncComponent(() =>
  import("../../components/Products/ProductLine.vue")
);
const loading = ref(false);
const count = ref(0);
const product = ref([]);
const page = ref(0);
const categories = ref([]);

const data = ref([]);
const regions = ref([]);
const districts = ref([]);

const regionValue = ref(null);
const districtValue = ref(null);
const sortValue = ref(null);
const subCategoryValue = ref(null);

const allAccordionCheck = ref(false);

let grid = ref(true);
let block = ref(false);

let deviceId = localStorage.getItem("deviceId");

function doGrid() {
  grid.value = true;
  block.value = false;
}
function doBlock() {
  grid.value = false;
  block.value = true;
}

function sortData(item) {
  sorted.value = item;
}

const sorts = [
  { name: "sitebarMoreProduct.cheap", price: "-price" },
  { name: "sitebarMoreProduct.friends", price: "price" },
  { name: "sitebarMoreProduct.news", price: "published_at" },
];

async function getCategoryWithChildren() {
  try {
    const response = await storeInstance.get(`/categories-with-childs/`, {
      headers: {
        "Accept-Language": locale.value,
      },
    });
    categories.value = response.data.map((el) => {
      el.checked = false;
      let children = el.childs.map((item) => {
        return {
          name: item.name,
          id: item.id,
          checked: false,
        };
      });
      return {
        name: el.name,
        id: el.id,
        children,
        checked: false,
      };
    });
  } catch (error) {
    console.error(error);
  }
}
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

function allCheck() {
  allAccordionCheck.value = !allAccordionCheck.value;
  categories.value.map((el) => {
    el.checked = !el.checked;
    if (el.children.length) {
      el.children.map((item) => {
        item.checked = !item.checked;
      });
    }
  });
}

const updateRegionValue = (value) => {
  for (let i = 0; i < data.value.length; i++) {
    if (data.value[i].name == value) {
      districts.value = data.value[i].districts.map((item) => item.name);
      break;
    }
  }
  regionValue.value = data;
};
const updateDistrictValue = (value) => {
  districtValue.value = value;
};

async function getData() {
  try {
    const response = await usingInstance.get(`/regions-with-districts/`, {
      headers: {
        "Accept-Language": locale.value,
      },
    });

    data.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
watch(data, () => {
  if (data && Array.isArray(data.value)) {
    regions.value = data.value.map((item) => item.name);
  }
});

onMounted(async () => {
  await loadProducts();
  await getData();
  await getCategoryWithChildren();
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
            <Dropdown
              @value="updateRegionValue"
              title="Выберите регион"
              :options="regions"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="" class="text-sm font-medium leading-5 text-gray"
              >Район/город</label
            >
            <Dropdown
              @value="updateDistrictValue"
              :disabled="!regionValue"
              title="Выберите район/город"
              :options="districts"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="" class="text-sm font-medium leading-5 text-gray"
              >Сортировать</label
            >
            <div
              v-for="(item, index) in sorts"
              :key="index"
              class="flex flex-col"
            >
              <label
                class="transition group inline-flex items-center relative select-none min-h-[20px] cursor-pointer"
                style="min-height: 20px"
                ><input
                  @click="sortData(item.price)"
                  type="radio"
                  class="absolute invisible w-0 h-0 opacity-0 peer"
                  name="k-radio-591"
                  value="price"
                /><span
                  class="before:w-2 before:h-2 shrink-0 duration-200 ease-in-out bg-white peer-checked:before:opacity-100 mr-2 before:opacity-0 relative border rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 border-gray-400 peer-disabled:before:bg-gray-100 before:bg-blue-300 group-hover:border-blue-200 peer-checked:border-white/20 peer-checked:bg-blue peer-checked:before:!bg-white"
                  style="width: 20px; height: 20px"
                ></span
                ><span
                  class="w-full py-3 text-sm font-medium text-black border-b border-gray-400 leading-130 md:group-hover:text-blue-400 transition-300 group-last:border-b-0"
                  >{{ $t(item.name) }}</span
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
                    @click="allCheck"
                    class="group w-full flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b border-gray-4 py-2.5"
                  >
                    <span
                      :class="
                        allAccordionCheck
                          ? '!bg-blue border-blue'
                          : '!border-gray-400'
                      "
                      class="relative inline-block w-5 h-5 duration-300 ease-in-out border border-gray-300 rounded-md shrink-0 group-hover:border-blue"
                    >
                      <span
                        :class="allAccordionCheck ? 'icon-tick' : ''"
                        class="text-[9px] top-1/2 left-1/2 leading-5 text-white transform -translate-x-1/2 -translate-y-1/2 transition-200 absolute z-[1]"
                      ></span>
                    </span>
                    <div class="">
                      <span
                        class="text-sm font-medium leading-130 text-dark transition-300 group-hover:text-blue"
                        >Все разделы</span
                      >
                    </div>
                  </div>
                  <div class="w-full">
                    <Accordion
                      v-for="(category, key) in categories"
                      :key="key"
                      :title="category.name"
                      :options="category.children"
                      :element="category"
                      :allChecked="allAccordionCheck"
                      class="border-b border-gray-5 last:!border-b-0"
                    />
                  </div>
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
                  <button
                    class="text-2xl leading-6 bg-white rounded-lg flex-center icon-filter md:hidden"
                  ></button>
                  <button
                    @click="doBlock"
                    :class="block ? 'text-blue' : 'text-gray-400'"
                    class="text-3xl leading-7 hover:text-blue/90 icon-list transition-300"
                  ></button
                  ><button
                    @click="doGrid"
                    :class="grid ? 'text-blue' : 'text-gray-400'"
                    class="text-3xl leading-7 icon-grid transition-300"
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

          <div v-if="grid">
            <div
              v-show="!loading"
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

          <div
            v-if="block"
            class="block pt-6 pb-8 mt-2 mb-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 md:mb-5 md:mt-0 products"
          >
            <div
              v-show="!loading"
              v-for="(item, index) in product"
              :key="index"
              class="cursor-pointer transition-300"
            >
              <ProductLine
                v-for="(item, key) in product"
                :key="key"
                :item="item"
                :slug="item.slug"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
