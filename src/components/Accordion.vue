<template>
  <div class="select-none">
    <div @click="checkToggle" class="flex items-center w-full gap-2 group">
      <div
        class="group flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b-0 py-2.5"
      >
        <span
          :class="
            checked === 'all-checked' || element.checked
              ? '!bg-blue !border-blue'
              : checked === 'some-checked'
              ? '!bg-blue !border-blue'
              : ''
          "
          class="duration-300 ease-in-out relative shrink-0 inline-block h-5 w-5 rounded-md border !border-gray-300 group-hover:border-blue"
          ><span
            :class="
              checked === 'all-checked' || element.checked
                ? 'icon-tick'
                : checked === 'some-checked'
                ? 'icon-minus'
                : ''
            "
            class="text-[9px] top-1/2 left-1/2 leading-5 text-white transform -translate-x-1/2 -translate-y-1/2 transition-200 absolute z-[1]"
          ></span
        ></span>
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
        class="group w-full flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b border-gray-4 last:!border-b-0 last:!mb-0 py-2.5"
      >
        <span
          :class="option.checked ? '!bg-blue !border-blue' : ''"
          class="duration-300 ease-in-out relative shrink-0 inline-block h-5 w-5 rounded-md border !border-gray-400 group-hover:border-blue"
        >
          <span
            :class="option.checked ? 'icon-tick' : ''"
            class="text-[9px] top-1/2 left-1/2 leading-5 text-white transform -translate-x-1/2 -translate-y-1/2 transition-200 absolute z-[1]"
          ></span>
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
  element: Array,
  allChecked: Boolean,
});

const open = ref(false);
const checked = ref("none");
const element = ref([]);
const accordionOptions = ref([]);

const toggleAccordion = () => {
  open.value = !open.value;
};

const checkToggle = () => {
  element.value.checked = !element.value.checked;
  accordionOptions.value = accordionOptions.value.map((item) => ({
    ...item,
    checked: checked.value === "all-checked" ? false : true,
  }));
};

const toggleCheckOption = (option) => {
  let filterChecks = [];
  option.checked = !option.checked;
  filterChecks.value = accordionOptions.value.filter((el) => el.checked);
  if (filterChecks.value.length == accordionOptions.value.length) {
    element.value.checked = true;
  } else {
    element.value.checked = false;
  }
};

onMounted(() => {
  accordionOptions.value = props.options;
  element.value = props.element;
});

watch(
  accordionOptions,
  () => {
    let checkCheckedOptions = accordionOptions.value.filter(
      (option) => option.checked
    );

    checked.value =
      checkCheckedOptions.length === props.options.length &&
      checkCheckedOptions.length !== 0
        ? "all-checked"
        : checkCheckedOptions.length > 0
        ? "some-checked"
        : "none";
  },
  { deep: true }
);
</script>
