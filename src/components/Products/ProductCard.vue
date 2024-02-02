<script setup>
import { ref } from "vue";
defineProps({
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

  const productsArray = JSON.parse(savedProducts);

  productsArray.push(id);

  localStorage.setItem("savedProducts", JSON.stringify(productsArray));
  return;
};
</script>

<template>
  <div class="relative cursor-pointer product-card">
    <div>
      <img
        :src="product.image"
        class="w-full rounded-t-lg"
        :alt="product.title"
      />
    </div>
    <div>
      <button @click="addToSaved(product.id)" class="absolute top-3 left-3">
        <i
          class="text-2xl text-white"
          :class="like ? 'icon-liked' : 'icon-like'"
        ></i>
      </button>

      <span>Tashkent</span>
      <h1 class="title">{{ product.title }}</h1>
    </div>
  </div>
</template>
