<template>
  <div class="container">
    <div v-if="product" class="max-w-3xl pt-5 pb-4 md:px-2">
      <h1
        class="text-2xl md:text-3.5xl font-bold leading-130 text-dark max-md:px-4"
      >
        {{ product.title }}
      </h1>
    </div>
    <div v-if="product" class="p-4 bg-white mt-2.5 static-text mb-20">
      <div class="aboutUs" v-html="product.content" ref="text"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { usingInstance } from "../instances/index";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let routes;
const product = ref(null);

async function dataFetch() {
  try {
    const response = await usingInstance.get(`/pages/${route.params.slug}/`);
    product.value = response.data;
    routes = computed(() => [
      {
        label: product.value.title,
        link: "/about",
      },
    ]);
  } catch (error) {
    console.error("Error fetching product:", error);
    router.push({ name: "NotFoundComponent" });
  }
}
onMounted(() => {
  dataFetch();
});
</script>
