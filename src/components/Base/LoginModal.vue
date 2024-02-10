<script setup>
import { ref } from "vue";
import { authInstance, storeInstance } from "@/instances";
import { defineAsyncComponent } from "vue";
import { onMounted } from "vue";

const MapModal = defineAsyncComponent(() => import("./MapModal.vue"));
const emit = defineEmits(["close:modal"]);
const typeModal = ref("login");
const toggleLoginModal = ref(false);

const switchTypeModal = (type) => {
  typeModal.value = type;
};
const closeLoginModal = () => {
  toggleLoginModal.value = false;
};

const userDetailsSignUp = ref({
  full_name: "",
  project_name: "",
  category: 0,
  phone_number: "",
  address: {
    name: "",
    lat: 0,
    long: 0,
  },
});

const userDetailsLogin = ref({ phone_number: "", password: "" });

const categories = ref([]);

async function fetchCategories() {
  try {
    const response = await storeInstance.get("/category/");
    if (!response) throw new Error("Internet bilan aloqa mavjud emas");
    if (response.status !== 200) throw new Error(response.statusText);

    categories.value = response.data;
  } catch (error) {
    console.log(error);
  }
}

async function login() {
  try {
    if (
      !userDetailsLogin.value.phone_number ||
      userDetailsLogin.value.phone_number.length <= 3
    ) {
      alert("Login kamida 3 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (
      !userDetailsLogin.value.password ||
      userDetailsLogin.value.password.length < 8
    ) {
      alert("Parol kamida 8 ta belgidan iborat bo'lishi kerak");
      return;
    }

    const response = await authInstance.post("/login/", {
      ...userDetailsLogin.value,
    });

    if (!response) {
      throw new Error("Internet bilan aloqa mavjud emas");
    }

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    console.log(response);
    alert("Akkauntga kirildi!");
  } catch (error) {
    alert(error.message);
  }
}

async function openMap() {
  try {
    if (
      !userDetailsSignUp.value.phone_number ||
      userDetailsSignUp.value.phone_number.length <= 3
    ) {
      alert("Telefon raqam kamida 3 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (
      !userDetailsSignUp.value.full_name ||
      userDetailsSignUp.value.full_name.length < 4
    ) {
      alert("Ism familiya kamida 4 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (
      !userDetailsSignUp.value.project_name ||
      userDetailsSignUp.value.project_name.length < 4
    ) {
      alert("Tovar nomi kamida 4 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (
      !userDetailsSignUp.value.category ||
      userDetailsSignUp.value.category <= 0
    ) {
      alert("Kamida bitta kategoriya tanlash lozim");
      return;
    }

    typeModal.value = "map";
  } catch (error) {
    alert(error);
  }
}

onMounted(async () => {
  await fetchCategories();
});
</script>

<template>
  <div
    @click.self="emit('close:modal')"
    class="fixed inset-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 login-modal-component"
  >
    <div
      v-if="typeModal === 'login'"
      class="relative h-auto p-4 bg-white rounded-lg modal-box-user"
    >
      <div class="flex items-center titles">
        <div class="left">
          <h1 class="text-2xl font-bold title">Добро пожаловать!</h1>
          <p class="desc">Войти в систему чтобы торговать в системе</p>
        </div>
        <button
          @click="emit('close:modal')"
          class="absolute text-2xl font-bold icon-cancle right top-4 right-4"
        ></button>
      </div>
      <form @submit.prevent="login" class="form">
        <div class="flex flex-col items-start form-box">
          <label for="login">Логин</label>
          <input
            v-model="userDetailsLogin.phone_number"
            type="text"
            name="login"
            id="login"
            class="w-full px-4 py-2 border rounded outline-none"
          />
        </div>
        <div class="flex flex-col items-start form-box">
          <label for="password">Пароль</label>
          <input
            v-model="userDetailsLogin.password"
            type="password"
            name="password"
            id="password"
            class="w-full px-4 py-2 border rounded outline-none"
          />
        </div>
        <div class="buttons">
          <button class="submit" type="submit">Войти</button>
          <p>Хотите стать продавцом?</p>
          <button
            @click="switchTypeModal('signup')"
            class="switcher"
            type="button"
          >
            Подать заявку
          </button>
        </div>
      </form>
    </div>
    <div
      v-if="typeModal === 'signup'"
      class="relative h-auto p-4 bg-white rounded-lg modal-box-seller"
    >
      <div class="flex titles">
        <div class="left">
          <h1 class="text-2xl font-bold title">Подать заявку</h1>
          <p class="desc">Войти в систему чтобы торговать в системе</p>
        </div>
        <button
          @click="emit('close:modal')"
          class="absolute text-2xl font-bold icon-cancle right top-4 right-4"
        ></button>
      </div>
      <form class="space-y-4 form">
        <div class="flex flex-col items-start form-box">
          <label for="fio">Ф.И.О.</label>
          <input
            v-model.trim="userDetailsSignUp.full_name"
            class="w-full px-4 py-2 border rounded outline-none"
            type="text"
            name="fio"
            id="fio"
          />
        </div>
        <div class="form-box">
          <label for="product-name">Название продукта</label>
          <input
            v-model.trim="userDetailsSignUp.project_name"
            type="text"
            class="w-full px-4 py-2 border rounded outline-none"
            name="product-name"
            id="product-name"
          />
        </div>
        <div class="form-box">
          <label for="product-category">Категория</label>
          <select
            v-model.trim="userDetailsSignUp.category"
            class="w-full px-4 py-2 border rounded outline-none"
            name="product-category"
            id="product-category"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              class="w-full px-4 py-2 border rounded outline-none"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-box">
          <label for="phone">Телефон номер</label>
          <input
            v-model="userDetailsSignUp.phone_number"
            class="w-full px-4 py-2 border rounded outline-none"
            type="text"
            name="phone"
            id="phone"
          />
        </div>
        <div class="buttons">
          <button type="button" @click="openMap">Prodoljit</button>
          <p>Если вы продавец, войдите на платформу</p>
          <button
            @click="switchTypeModal('login')"
            class="switcher"
            type="button"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
    <MapModal
      @update:go-back="switchTypeModal('signup')"
      @success:sign-up-done="switchTypeModal('success')"
      @close:modal="closeLoginModal"
      :user-details-sign-up="userDetailsSignUp"
      v-if="typeModal === 'map'"
    />
    <div
      v-if="typeModal === 'success'"
      class="p-4 text-center bg-white rounded success"
    >
      <h1 class="text-xl font-bold title">Sizning so'rovingiz jo'natildi</h1>
      <button
        class="px-4 py-2 mt-4 font-bold text-white rounded button bg-blue"
        @click="emit('close:modal')"
      >
        OK!
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-custom-enter-active,
.fade-custom-leave-active {
  transition: opacity 0.5s ease;
}
.fade-custom-enter-from,
.fade-custom-leave-to {
  opacity: 0;
}
</style>
