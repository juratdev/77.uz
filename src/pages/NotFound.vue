<script setup></script>

<template>
  <div class="containerMain">
    <div
      class="bg-[url('/public/images/circle.svg')] bg-no-repeat bg-center bg-gray-2 px-4"
    >
      <div class="flex justify-center">
        <img
          class="h-auto max-w-full"
          src="../../public/images/notFound.svg"
          alt="404 illustration"
        />
      </div>
      <div class="flex flex-col items-center justify-center">
        <h1
          class="mt-8 mb-3 text-xl font-bold text-center md:text-2xl leading-130 text-dark md:mt-16"
        >
          Страница, которую вы ищете, не найдена
        </h1>
        <p
          class="max-w-md text-sm font-normal text-center text-dark md:text-base leading-132"
        >
          Нам жаль, но, похоже, мы потеряли эту страницу, но мы не хотим терять
          вас.
        </p>
        <router-link to="/">
          <button
            class="bg-blue text-white hover:bg-blue-1 px-6 md:px-7 py-2.5 md:py-3 text-sm md:text-base font-semibold leading-130 rounded-lg relative transition-300 active:scale-95 disabled:bg-gray-bg disabled:text-gray-2 mt-5 md:mt-10"
            type="button"
          >
            <span
              class="gap-2 text-center opacity-100 flex-center transition-300 whitespace-nowrap"
              ><span class="">Вернуться на главную</span></span
            >
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
