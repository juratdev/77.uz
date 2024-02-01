<script setup>
const props = defineProps({ productId: String, producTitle: String });

const addToSaved = (id) => {
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
  <div class="product-card w-[500px]">
    <h1 class="title">{{ props.producTitle }}</h1>
    <button
      @click="addToSaved(`${props.productId}`)"
      class="bg-black px-2 py-4 text-white"
    >
      Qo'shish
    </button>
  </div>
</template>
