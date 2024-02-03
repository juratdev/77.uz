<script setup>
import { onMounted } from "vue";
import { computed } from "vue";
import { ref } from "vue";
const props = defineProps({
  product: {
    id: String,
    title: String,
    image: String,
  },
});

const like = ref(false);

const addToSaved = (id) => {
  like.value = !like.value;

  const savedProducts = localStorage.getItem("savedProducts");

  if (!savedProducts) {
    let products = [];

    products.push(id);

    localStorage.setItem("savedProducts", JSON.stringify(products));

    return;
  }

  if (savedProducts) {
    const productArrays = JSON.parse(savedProducts);

    productArrays.push(id);

    localStorage.setItem("savedProducts", JSON.stringify(productArrays));
  }

  const productArrays = JSON.parse(savedProducts);

  const existId = productArrays.find((item) => item === id);

  if (existId) {
    const indexOfId = productArrays.indexOf(id);

    productArrays.splice(indexOfId, 1);

    console.log(productArrays);

    localStorage.setItem("savedProducts", JSON.stringify(productArrays));
    return;
  }
};

onMounted(() => {
  if (!localStorage.getItem("savedProducts")) return false;
  const savedProducts = JSON.parse(localStorage.getItem("savedProducts"));

  if (savedProducts.includes(props.product.id)) {
    like.value = true;
    return;
  }
  return false;
});
</script>

<template>
  <div class="relative cursor-pointer product-card">
    <div>
      <img
        :src="props.product.image"
        class="w-full rounded-t-lg"
        :alt="props.product.title"
      />
    </div>
    <div>
      <button
        @click="addToSaved(props.product.id)"
        class="absolute top-3 left-3"
      >
        <i
          class="text-2xl text-white"
          :class="like ? 'icon-liked' : 'icon-like'"
        ></i>
      </button>

      <span>Tashkent</span>
      <h1 class="title">{{ props.product.title }}</h1>
    </div>
  </div>
</template>
