<script setup>
import CustomHeader from "./components/Base/CustomHeader.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="bg-[#F0F3F7]">
    <CustomHeader />
    <RouterView></RouterView>
    <!-- FOOTER -->
  </div>
</template>
