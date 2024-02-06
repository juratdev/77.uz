<script setup>
import { onMounted } from "vue";
import { computed } from "vue";
import { ref } from "vue";
import { defineProps } from "vue";
defineProps({
  item: {
    id: String,
    name: String,
    price: String,
    photo: String,
    published_at: String,
    address: {
      district: { region: { name: String } },
    },
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

  if (savedProducts.includes(item.id)) {
    like.value = true;
    return;
  }
  return false;
});
</script>

<template>
  <div
    class="relative flex flex-col w-full overflow-hidden bg-white border-2 border-white cursor-pointer product-card rounded-xl transition-300 group"
  >
    <div class="w-full h-64 max-sm:h-44 max-xs:h-30 rounded-t-xl">
      <img
        :src="item.photo"
        class="object-cover w-full h-full rounded-t-lg"
        :alt="item.name"
      />
    </div>
    <div>
      <button @click="addToSaved(item.id)" class="absolute top-3 left-3">
        <i
          class="text-2xl text-white"
          :class="like ? 'icon-liked' : 'icon-like'"
        ></i>
      </button>

      <div class="p-5">
        <span class="rounded-md text-[#63676C] px-2 py-1 bg-[#EAEDF0]">{{
          item.address.district.region.name
        }}</span>
        <h1
          class="mt-5 mb-2 text-lg font-semibold text-black duration-300 md:text-lg leading-130 line-clamp-2 group-hover:text-blue transition-300"
        >
          {{ item.name }}
        </h1>
        <p
          class="font-normal text-xs text-[#8E9297] md:text-sm text-gray-1 leading-130"
        >
          Вчера, 19:20
        </p>
        <p class="text-[#8E9297] text-base font-semibold mt-2 mb-4">
          +998 71 200 70 07
        </p>
        <div class="flex items-center gap-2">
          <h4 class="text-base font-bold text-black md:text-2xl leading-130">
            {{ item.price }}
          </h4>
          <span
            class="text-xs font-medium leading-5 uppercase text-blue md:leading-6 md:text-base"
            >sum</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
