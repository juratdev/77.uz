<template>
  <div class="saved_body mb-14">
    <div class="block my-5 text-3xl font-semibold saved__title text-dark">
      {{ $t("navbar.star") }}
    </div>
    <div class="flex flex-col items-center justify-center saved__about">
      <img src="/public/images/noData.svg" alt="" class="block" />
      <div class="block mt-6 mb-3 text-2xl font-bold leading-6 text-dark">
        {{ $t("noData.noAddsTitle") }}
      </div>
      <div class="text-base font-normal leading-6 text-dark">
        {{ $t("noData.noAddsTitleAbout") }}
      </div>
    </div>
  </div>
</template>
