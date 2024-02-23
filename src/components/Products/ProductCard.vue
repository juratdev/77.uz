<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { defineProps } from "vue";
import { storeInstance } from "@/instances";

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

const formattedDate = ref("");

const formatDate = (published_at) => {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  formattedDate.value = new Intl.DateTimeFormat("uz-UZ", options).format(
    new Date(published_at)
  );
};

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
  formatDate(props.item.published_at);
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
      <div class="w-full h-64 max-sm:h-44 max-xs:h-30 rounded-t-xl">
        <img
          :src="props.item.photo"
          class="object-cover w-full h-full rounded-t-lg"
          :alt="props.item.name"
        />
      </div>
      <div class="flex flex-col justify-between p-5">
        <div>
          <span
            v-if="props.item.address.district.region.name"
            class="rounded-md text-[#63676C] px-2 py-1 bg-[#EAEDF0]"
            >{{ props.item.address.district.region.name }}</span
          >
          <h1
            class="mt-5 mb-2 text-lg font-semibold text-black duration-300 md:text-lg leading-130 line-clamp-2 group-hover:text-blue transition-300"
          >
            {{ props.item.name }}
          </h1>
          <p class="text-xs font-normal md:text-sm text-gray-1 leading-130">
            {{ formatDate(props.item.published_at) }}
          </p>
          <p class="text-[#8E9297] text-base font-semibold mt-2 mb-4">
            {{ props.item.seller.phone_number }}
          </p>
        </div>
        <div class="flex items-center gap-2">
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
