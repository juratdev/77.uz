<script setup>
import { ref } from "vue";
import { authInstance } from "@/instances";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

const emit = defineEmits(["close:modal"]);
const typeModal = ref("signup");
const map = ref();
const marker = ref();

const switchTypeModal = (type) => {
  typeModal.value = type;
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

    const response = await authInstance.post("/login", {
      ...userDetailsLogin.value,
    });

    if (!response) {
      throw new Error("Internet bilan aloqa mavjud emas");
    }

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    /**
     * token bo'sa shu joyda tokenni olib localStorage da saqlash
     */
    // localStorage.setItem("token", response.data.token)
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

    setTimeout(() => {
      map.value = leaflet.map("map", {
        center: [41.32503151466505, 69.24269508726519],
        zoom: 15,
      });

      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png")
        .addTo(map.value);

      const customMarker = leaflet
        .marker([41.32503151466505, 69.24269508726519], { draggable: true })
        .addTo(map.value);

      marker.value = customMarker;
    }, 1000);
  } catch (error) {
    alert(error);
  }
}

async function signUp() {
  try {
    const response = await authInstance.post("/login", {
      ...userDetailsLogin.value,
    });

    if (!response) {
      throw new Error("Internet bilan aloqa mavjud emas");
    }

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    /**
     * token bo'sa shu joyda tokenni olib localStorage da saqlash
     */
    // localStorage.setItem("token", response.data.token)
    alert("Akkauntga kirildi!");
  } catch (error) {
    alert(error.message);
  }
}
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
      <div class="flex titles">
        <div class="left">
          <h1 class="text-2xl font-bold title">Добро пожаловать!</h1>
          <p class="desc">Войти в систему чтобы торговать в системе</p>
        </div>
        <button
          @click="emit('close:modal')"
          class="absolute font-bold right tet-7xl top-4 right-4"
        >
          &times;
        </button>
      </div>
      <form @submit.prevent="login" class="form">
        <div class="form-box">
          <label for="login">Логин</label>
          <input
            v-model="userDetailsLogin.phone_number"
            type="text"
            name="login"
            id="login"
          />
        </div>
        <div class="form-box">
          <label for="password">Пароль</label>
          <input
            v-model="userDetailsLogin.password"
            type="password"
            name="password"
            id="password"
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
      class="h-auto p-4 bg-white rounded-lg modal-box-seller"
    >
      <div class="flex titles">
        <div class="left">
          <h1 class="text-2xl font-bold title">Подать заявку</h1>
          <p class="desc">Войти в систему чтобы торговать в системе</p>
        </div>
        <button
          @click="emit('close:modal')"
          class="absolute font-bold right tet-7xl top-4 right-4"
        >
          &times;
        </button>
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
              class="w-full px-4 py-2 border rounded outline-none"
              :value="1"
            >
              Женская одежда
            </option>
            <option
              class="w-full px-4 py-2 border rounded outline-none"
              :value="2"
            >
              Женская одежда
            </option>
            <option
              class="w-full px-4 py-2 border rounded outline-none"
              :value="3"
            >
              Женская одежда
            </option>
            <option
              class="w-full px-4 py-2 border rounded outline-none"
              :value="4"
            >
              Женская одежда
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
    <div
      v-show="typeModal === 'map'"
      class="bg-white rounded-lg p-4 h-[600px] w-[400px]"
    >
      <h1>Lokatsiya</h1>
      <div ref="map" class="map w-full h-[90%]" id="map"></div>
      <button @click="signUp" class="sign-up-action">Action</button>
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
