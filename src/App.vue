<script setup>
import Defoult from "./layouts/defoult.vue";
import empty from "./layouts/empty.vue";
import { useRoute } from "vue-router";

const layouts = {
  empty: empty,
  default: Defoult,
};
const route = useRoute();
</script>

<template>
  <div class="flex flex-col min-h-screen bg-primaryBg">
    <component :is="layouts[route.meta.layout]">
      <router-view></router-view>
    </component>
  </div>
</template>

<style></style>
