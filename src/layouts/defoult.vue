<template>
  <div>
    <CustomHeader />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import CustomHeader from "../components/Base/CustomHeader.vue";
import Footer from "../components/Footer/Footer.vue";
</script>

<style></style>
