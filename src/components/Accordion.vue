<template>
  <div class="select-none">
    <div class="flex items-center w-full gap-2 group">
      <div
        class="group flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b-0 py-2.5"
      >
        <span @click="checkToggle">
          {{
            checked === "all-checked"
              ? "1"
              : checked === "some-checked"
              ? "-"
              : "0"
          }}
        </span>
        <!-- <span
          class="duration-300 ease-in-out relative shrink-0 inline-block h-5 w-5 rounded-md border border-gray-3 group-hover:border-blue !border-white/20 !bg-blue"
          ><span
            class="icon-tick text-[9px] top-1/2 left-1/2 leading-5 text-white transform -translate-x-1/2 -translate-y-1/2 transition-200 absolute z-[1]"
          ></span
        ></span> -->
      </div>
      <div
        @click="toggleAccordion"
        class="flex items-center justify-between flex-grow cursor-pointer"
      >
        <p
          class="text-sm font-medium leading-130 text-dark transition-300 group-hover:text-blue"
        >
          {{ props.title }}
        </p>
        <div
          v-if="accordionOptions.length > 0"
          :class="open ? 'rotate-90' : 'rotate-0'"
          class="text-[9px] font-bold leading-5 transition-transform -rotate-90 icon-down transition-300 text-gray-1"
        ></div>
      </div>
    </div>
    <div class="pl-4">
      <div
        :key="key"
        v-for="(option, key) in accordionOptions"
        @click="toggleCheckOption(option)"
        :class="open ? 'block' : 'hidden'"
        class="group w-full flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b border-gray-4 last:!border-b-0 last:!mb-0 py-2.5 last:pb-0"
      >
        <span
          :class="option.checked ? '' : ''"
          class="relative inline-block w-5 h-5 duration-300 ease-in-out border rounded-md shrink-0 border-gray-3 group-hover:border-blue"
        >
          {{ option.checked ? "1" : "0" }}
          <!-- <span
            class="rounded-3xl w-2.5 h-0.5 bg-white transition-300 absolute-center z-[1] opacity-0"
          ></span> -->
        </span>
        <span class=""
          ><span
            class="text-sm font-medium leading-130 text-dark transition-300 group-hover:text-blue"
            >{{ option.name }}</span
          ></span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { watch } from "vue";
import { ref } from "vue";

const props = defineProps({
  title: String,
  options: Array,
});

const open = ref(false);
const checked = ref("none");
const accordionOptions = ref([]);

const toggleAccordion = () => {
  open.value = !open.value;
};

const checkToggle = () => {
  accordionOptions.value = accordionOptions.value.map((item) => ({
    ...item,
    checked: checked.value === "all-checked" ? false : true,
  }));
};

const toggleCheckOption = (option) => {
  option.checked = !option.checked;
};

onMounted(() => {
  accordionOptions.value = props.options;
});

watch(
  accordionOptions,
  () => {
    const checkCheckedOptions = accordionOptions.value.filter(
      (option) => option.checked
    );

    checked.value =
      checkCheckedOptions.length === props.options.length
        ? "all-checked"
        : checkCheckedOptions.length > 0
        ? "some-checked"
        : "none";
  },
  { deep: true }
);
</script>
