<script setup>
import { storeInstance } from "@/instances";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const products = ref();
const loading = ref(false);

async function loadProduct() {
  try {
    loading.value = true;
    const response = await storeInstance.get(`/ads/${route.params.id}/`);

    if (!response) {
      throw new Error("Internet bilan aloqa yo'q");
    }

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    products.value = response.data;

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
  await loadProduct();
});
</script>

<template>
  <div v-if="products">
    <div class="containerMain">
      <div class="py-3 overflow-x-hidden max-md:hidden">
        <div class="container flex items-center gap-1.5 md:overflow-hidden">
          <a
            href="/"
            class="gap-1 text-sm font-medium flex-y-center text-dark leading-130 transition-300 hover:text-blue group"
            >Главная</a
          >
          <div class="flex items-center gap-1.5 overflow-hidden group shrink-0">
            <i class="w-1 h-1 rounded-full bg-gray-3 shrink-0"></i
            ><a
              href="/product/?category_ids=120"
              class="transition-300 max-w-full flex-y-center cursor-pointer min-w-max group-last:min-w-[100px] sm:group-last:min-w-[200px] breadcrumb-menu line-clamp-1 whitespace-nowrap text-dark leading-130 text-sm font-medium transition-300 hover:text-blue"
              >Мужская одежда</a
            >
          </div>
          <div class="flex items-center gap-1.5 overflow-hidden group shrink-0">
            <i class="w-1 h-1 rounded-full bg-gray-3 shrink-0"></i
            ><a
              href="/product/?category_ids=137"
              class="transition-300 max-w-full flex-y-center cursor-pointer min-w-max group-last:min-w-[100px] sm:group-last:min-w-[200px] breadcrumb-menu line-clamp-1 whitespace-nowrap text-dark leading-130 text-sm font-medium transition-300 hover:text-blue"
              >Верхняя одежда</a
            >
          </div>
          <div class="flex items-center gap-1.5 overflow-hidden group shrink-0">
            <i class="w-1 h-1 rounded-full bg-gray-3 shrink-0"></i
            ><a
              aria-current="page"
              href="/product/vetrovka-dlia-muzhchin-dozhdevik-kurtka"
              class="router-link-active router-link-exact-active pointer-events-none !text-gray-2 transition-300 max-w-full flex-y-center cursor-pointer min-w-max group-last:min-w-[100px] sm:group-last:min-w-[200px] breadcrumb-menu line-clamp-1 whitespace-nowrap text-dark leading-130 text-sm font-medium transition-300 hover:text-blue"
              >Ветровка для мужчин, дождевик,...</a
            >
          </div>
        </div>
      </div>

      <div>
        <h1 class="text-xl font-bold">{{ products.name }}</h1>
      </div>
    </div>
  </div>
</template>
