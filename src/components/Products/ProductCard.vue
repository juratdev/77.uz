<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { defineProps } from "vue";
import { useTime } from "@/composables/useTime";
import { storeInstance } from "@/instances";
const props = defineProps({
  item: {
    id: Number,
    name: String,
    price: String,
    photo: String,
    published_at: String,
    is_liked: Boolean,
    address: {
      district: { region: { name: String } },
    },
  },
});

const { formattedDate, convertTime } = useTime();

const like = ref(false);

async function addToSaved(id) {
  try {
    if (!like.value) {
      like.value = true;
      const response = await storeInstance.post(
        `/favourite-product-create-by-id/`,
        { product: id, device_id: "d5cec0cd-566c-47d9-9021-4a5f7f69a842" }
      );

      if (!response) {
        throw new Error("Internet bilan aloqa yo'q");
      }

      if (response.status !== 201) {
        throw new Error(response.statusText);
      }

      console.log(response.data);
      return;
    }

    if (like.value) {
      like.value = false;
      const response = await storeInstance.delete(
        `/favourite-product-create-by-id/${id}/delete`
      );

      if (!response) {
        throw new Error("Internet bilan aloqa yo'q");
      }

      if (response.status !== 201) {
        throw new Error(response.statusText);
      }

      console.log(response.data);
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  like.value = props.item.is_liked
  console.log(props.item.is_liked);
});

onMounted(async () => {
  await convertTime(props.item.published_at);
});
</script>

<template>
  <div
    class="relative flex flex-col w-full overflow-hidden bg-white border-2 border-white cursor-pointer product-card rounded-xl transition-300 group"
  >
    <div class="w-full h-64 max-sm:h-44 max-xs:h-30 rounded-t-xl">
      <img
        :src="props.item.photo"
        class="object-cover w-full h-full rounded-t-lg"
        :alt="props.item.name"
      />
    </div>
    <div>
      <button @click="addToSaved(props.item.id)" class="absolute top-3 left-3">
        <i
          class="text-2xl text-white"
          :class="like ? 'icon-liked' : 'icon-like'"
        ></i>
      </button>

      <div class="p-5">
        <span class="rounded-md text-[#63676C] px-2 py-1 bg-[#EAEDF0]">{{
          props.item.address.district.region.name
        }}</span>
        <h1
          class="mt-5 mb-2 text-lg font-semibold text-black duration-300 md:text-lg leading-130 line-clamp-2 group-hover:text-blue transition-300"
        >
          {{ props.item.name }}
        </h1>
        <p
          class="font-normal text-xs text-[#8E9297] md:text-sm text-gray-1 leading-130"
        >
          {{ formattedDate }}
        </p>
        <p class="text-[#8E9297] text-base font-semibold mt-2 mb-4">
          +998 71 200 70 07
        </p>
        <div class="flex items-center gap-2">
          <h4 class="text-base font-bold text-black md:text-2xl leading-130">
            {{ props.item.price }}
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
