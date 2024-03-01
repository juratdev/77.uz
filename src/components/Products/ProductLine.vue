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
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="w-full rounded-xl border-[2px] border-white overflow-hidden product-card-grid group/card transition-300 flex cursor-pointer"
    >
      <div
        class="aspect-square w-full relative bg-cover bg-no-repeat max-w-[120px] md:max-w-[150px] bg-center"
        style="
          background-image: url('https://admin.77.uz/media/cache/eb/ff/ebff57cbba92abecd7807cc3da4e5922.jpg');
        "
      >
        <span
          class="absolute top-0 left-0 w-full pointer-events-none h-2/3 md:h-1/3 gradient"
        ></span
        ><button class="absolute left-3 top-3 like">
          <svg
            class="md:w-10 md:h-10"
            width="24"
            height="24"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="transition-300 fill-transparent"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M32.5 22.62L20 35L7.5 22.62M7.5 22.62C5.25216 20.4326 4.42288 17.1684 5.35413 14.1734C6.28538 11.1784 8.81942 8.95991 11.9113 8.43283C15.0031 7.90576 18.129 9.15935 20 11.6767C21.8788 9.17798 24.998 7.94102 28.0787 8.47303C31.1593 9.00503 33.683 11.2165 34.615 14.2006C35.5469 17.1847 34.7303 20.4393 32.5 22.63"
            ></path>
            <path
              class="transition-300 md:stroke-2 stroke-white"
              d="M32.5 22.62L20 35L7.5 22.62C5.25216 20.4326 4.42288 17.1684 5.35413 14.1734C6.28538 11.1784 8.81942 8.95991 11.9113 8.43283C15.0031 7.90576 18.129 9.15935 20 11.6767C21.8788 9.17798 24.998 7.94102 28.0787 8.47303C31.1593 9.00503 33.683 11.2165 34.615 14.2006C35.5469 17.1847 34.7303 20.4393 32.5 22.63"
              stroke-width="3px"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="flex flex-col justify-between w-full gap-2 p-2 pl-5 bg-white md:p-3"
      >
        <div
          class="flex items-start justify-between gap-3 max-md:flex-col-reverse"
        >
          <p
            class="text-sm md:text-lg font-semibold text-dark leading-130 line-clamp-2 group-hover/card:text-blue transition-300 !flex-shrink"
          >
            Vetrovka, kurtka, kuz - bahor kurtkasi
          </p>
        </div>
        <div class="flex items-end justify-between">
          <div class="flex flex-col-reverse gap-1 md:flex-col md:gap-2">
            <div
              class="flex items-center gap-2 text-base font-bold md:items-end md:text-2xl text-dark leading-130"
            >
              220 000
              <span
                class="text-xs font-medium text-blue leading-130 md:text-base"
                >UZS</span
              >
            </div>
            <p
              class="text-xs font-semibold md:text-base leading-130 text-gray-1 md:hidden"
            ></p>
            <time
              class="font-normal text-xss md:text-sm text-gray-1 leading-130"
              >16 Yanvar, 20:40</time
            >
          </div>
          <p
            class="text-xs font-semibold md:text-base leading-130 text-gray-1 max-md:hidden"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>
