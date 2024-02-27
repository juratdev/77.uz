<script setup>
import { storeInstance } from "@/instances";
import { ref, watch, onMounted } from "vue";
import CategoriesItem from "./CategoriesItem.vue";
import SkeletonLoading from "@/components/ui/SkeletonLoading.vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const categories = ref([]);
// Sayt ochilganda localdan data keladi va filterCateguryga tenglashtirib qo'yiladi
const filterCategory = ref([]);
const searchInputVal = ref("");
const loading = ref(false);

const openSearchModal = ref(false);

async function loadCategory() {
  try {
    loading.value = true;
    const response = await storeInstance.get(`/category/`, {
      headers: {
        "Accept-Language": locale.value,
      },
    });

    if (!response) {
      throw new Error("Internet bilan aloqa yo'q");
    }

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    categories.value = response.data;

    return;
  } catch (error) {
    alert(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
}

const openSearchInputModel = () => {
  openSearchModal.value = true;
};
const closeSearchInputModel = () => {
  openSearchModal.value = false;
};

onMounted(async () => {
  await loadCategory();
});

watch(
  locale,
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      await loadCategory();
    }
  },
  { deep: true }
);
watch(openSearchModal, () => {
  document.body.classList.toggle("overflow-hidden", openSearchModal.value);
});
watch(searchInputVal, () => {
  filterCategory.value = categories.value.filter((category) =>
    category.name.toLowerCase().includes(searchInputVal.value.toLowerCase())
  );
});
</script>

<template>
  <div
    @click="closeSearchInputModel"
    class="top-0 left-0 w-full fixed h-full bg-black/40 z-50"
    :class="openSearchModal ? 'block' : 'hidden'"
  />
  <section class="bg-white">
    <div class="text-center containerMain">
      <div class="-top-[2rem] mt-24 mx-auto w-[50%] relative">
        <div
          :class="openSearchModal ? 'z-[60]' : ''"
          class="relative mb-2 max-sm:w-full"
        >
          <i
            class="icon-search absolute left-3 top-5 text-[1.2rem] text-[#D5D8DB]"
          ></i>
          <input
            v-model="searchInputVal"
            @click="openSearchInputModel"
            type="search"
            id="search"
            class="border-2 focus-within:border-blue transition duration-300 rounded-[8px] outline-none w-full px-[2.5rem] py-[1rem]"
            :placeholder="t('search.placeholder')"
            autocomplete="off"
            ref="searchModel"
          />
          <button
            class="py-[10px] px-[22px] rounded-[5px] top-[12%] absolute right-[.5rem] bg-[#16191D] text-white z-[2] hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition duration-300"
          >
            {{ t("search.text") }}
          </button>
        </div>
        <!-- Localdan data keganida search modal ochilganida shu filter div ochiladi searchInputVal yoki filterCategory tekshiriladi -->
        <div
          class="bg-white p-5 absolute mt-2 top-full w-full z-[60]"
          :class="searchInputVal === '' ? 'hidden' : 'block'"
        >
          <!-- Localeda ushlab turish uchun quyidagi divga click beriladi va filterCategory localda saqlanadi  -->
          <div
            :key="key"
            v-for="(filteredCategory, key) in filterCategory"
            @click=""
          >
            {{ filteredCategory.name }}
          </div>
        </div>
      </div>
      <div class="text-center category__title">
        <h1 class="text-[2rem] font-[700] mb-[.5rem]">
          {{ t("categories.title") }}
        </h1>
        <p class="text-[#8E9297]">
          {{ t("categories.minTitle") }}
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
          <SkeletonLoading
            type="category"
            v-for="i in 9"
            :key="i"
            v-show="loading"
          />
        </div>
      </div>
    </div>
  </section>
</template>
