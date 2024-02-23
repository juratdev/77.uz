<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { defineProps } from "vue";
import { storeInstance } from "@/instances";
import { formatDate } from "@/scripts/format-date";

const props = defineProps({
  item: {
    id: Number,
    name: String,
    phone: Number,
    price: Number,
    photo: String,
    seller: {
      phone_number: Number,
    },
    published_at: String,
    is_liked: Boolean,
    slug: String,
    address: {
      district: { region: { name: String } },
    },
  },
});

function formatMoneyDecimal(number, fix = 0) {
  const option2 = {
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
    decimal: ".",
  };
  return number
    ? new Intl.NumberFormat("ru-RU", option2).format(number)
    : "0.00";
}

const like = ref(false);
const device_id = ref();
async function addToSaved(id) {
  try {
    if (!like.value) {
      like.value = true;
      const response = await storeInstance.post(
        `/favourite-product-create-by-id/`,
        {
          product: id,
          device_id: device_id.value,
        }
      );

      if (!response) {
        throw new Error("Internet bilan aloqa yo'q");
      }

      if (response.status !== 201) {
        throw new Error(response.statusText);
      }

      like.value = true;
      return;
    } else {
      const response = await storeInstance.delete(
        `/favourite-product-by-id/${id}/delete/`,
        {
          headers: {
            "Device-id": device_id.value,
          },
        }
      );

      if (!response) {
        throw new Error("Internet bilan aloqa yo'q");
      }

      like.value = false;
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  like.value = props.item.is_liked;
  device_id.value = localStorage.getItem("deviceId");
});

// onMounted(async () => {
//   await convertTime(props.item.published_at);
// });
</script>

<template>
  <div class="relative">
    <button
      @click="addToSaved(props.item.id)"
      class="absolute z-10 top-3 left-3"
    >
      <i
        class="text-2xl text-white"
        :class="like ? 'icon-liked' : 'icon-like'"
      ></i>
    </button>
    <router-link
      :to="'/products/' + props.item.slug"
      class="flex flex-col w-full h-full overflow-hidden bg-white border-2 border-white cursor-pointer product-card rounded-xl transition-300 group"
    >
      <div
        class="flex-shrink-0 w-full h-64 max-sm:h-44 max-xs:h-30 rounded-t-xl"
      >
        <img
          :src="props.item.photo"
          class="object-cover w-full h-full rounded-t-lg"
          :alt="props.item.name"
        />
      </div>
      <div class="flex flex-col items-start h-full p-2 md:p-5">
        <div class="flex flex-col gap-1 my-2 md:my-4 md:gap-2">
          <span
            v-if="props.item.address.district.region.name"
            class="rounded-md text-[#63676C] max-w-max whitespace-nowrap px-2 py-1 bg-[#EAEDF0]"
            >{{ props.item.address.district.region.name }}</span
          >
          <h1
            class="mt-5 mb-2 font-semibold text-black duration-300 md:text-lg leading-130 line-clamp-2 group-hover:text-blue transition-300 text-sm leading-130 group-hover/card:text-blue transition-300 h-[36px] md:h-[56px]"
          >
            {{ props.item.name }}
          </h1>
          <p class="text-xs font-semibold md:text-sm leading-130 text-gray-1">
            {{ formatDate(new Date(props.item.published_at)) }}
          </p>
          <p class="text-[#8E9297] text-base font-semibold mt-2 mb-4">
            {{ props.item.seller.phone_number }}
          </p>
        </div>
        <div class="flex items-end gap-2 mt-auto">
          <h4 class="text-base font-bold text-black md:text-2xl leading-130">
            {{ formatMoneyDecimal(props.item.price) }}
          </h4>
          <span
            class="text-xs font-medium leading-5 uppercase text-blue md:leading-6 md:text-base"
            >sum</span
          >
        </div>
      </div>
    </router-link>
  </div>
</template>
