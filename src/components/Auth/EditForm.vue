<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

interface Cliente {
  id: number;
  nameCliente: string;
  apellidoCliente: string;
  correoCliente: string;
  telefono: string;
  fechaLlegada: string;
  horaLlegada: string;
  personas: string;
}

interface Cenote {
  id: number;
  nameCenote: string;
  createdAt: string; // Cambia este tipo si es diferente en tu API
  descripcion?: string;
  precio?: number;
  significado?: string;
  url?: string;
}

const cliente = ref<Cliente>({
  id: 0,
  nameCliente: '',
  apellidoCliente: '',
  correoCliente: '',
  telefono: '',
  fechaLlegada: '',
  horaLlegada: '',
  personas: ''
});
const cenote = ref<Cenote>({
  id: 0,
  nameCenote: '',
  createdAt: ''
});

const route = useRoute();

onMounted(async () => {
  const token = route.query.token as string;
  try {
    const response = await axios.get(`http://localhost:4000/reserva/${token}`);
    const reserva = response.data;
    cliente.value = reserva.cliente;
    cenote.value = reserva.cenote;
  } catch (error) {
    console.error('Error al obtener los datos de reserva:', error);
  }
});
</script>

<template>
    <form class="max-w-sm mx-auto">
      <input v-model="cliente.nameCliente" type="text" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <input v-model="cliente.correoCliente" type="email" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <input v-model="cliente.telefono" type="tel" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <input v-model="cliente.fechaLlegada" type="date" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <input v-model="cliente.horaLlegada" type="time" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <input v-model="cliente.personas" type="number" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <input v-model="cenote.nameCenote" type="text" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
  
      <!-- Botón de guardar -->
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Guardar
      </button>
    </form>
</template>

<style scoped>
/* Estilos de margen y relleno para el formulario */
form {
  margin: auto;
  margin-top: 20vh; /* Centra verticalmente */
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
