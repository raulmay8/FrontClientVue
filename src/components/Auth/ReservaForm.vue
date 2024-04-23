<script setup lang="ts">

import axios from 'axios';
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import Modal from './Modal.vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/AuthServices';

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
  createdAt: string; 
}

interface Reserva {
  cliente: Cliente;
  cenote: Cenote;
  token: string;
  precioTotal: number;
  createdAt: string;
  updatedAt: string;
}


const reservas: Ref<Reserva[]> = ref([]);

const showModal = ref(false);
const deleteMessage = ref('');
const tokenToDelete = ref('');
const showSuccessToast = ref(false);

const authService = new AuthService();
const router = useRouter();

const fetchReservas = async () => {
  try {
    const response = await axios.get('http://localhost:4000/reserva/reserva');
    reservas.value = response.data.data;
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
  }
};

onMounted(() => {
  fetchReservas();
});

const verDetalles = (token : string) => {
  router.push({ name: 'detalle', params: { token } });
};

const deleteReserva = async (token: string) => {
  try {
    await axios.delete(`http://localhost:4000/reserva/${token}`);
    
    await fetchReservas();
    showSuccessToast.value = true;
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 3000);
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
  }
};
const prepareDelete = (token: string) => {
  tokenToDelete.value = token;
  const reserva = reservas.value.find(r => r.token === token);
  
  if (reserva && reserva.cliente) {
    const nombreCliente = reserva.cliente.nameCliente;
    if (nombreCliente) {
      deleteMessage.value = `¿Estás seguro de que deseas eliminar la reserva de ${nombreCliente}?`;
    } else {
      deleteMessage.value = "No se puede encontrar el nombre del cliente.";
    }
  } else {
    deleteMessage.value = "No se puede encontrar la reserva o el cliente asociado.";
  }
  
  showModal.value = true;
};

const handleModalClose = () => {
  showModal.value = false;
};

const handleModalConfirm = () => {
  deleteReserva(tokenToDelete.value);
  showModal.value = false;
};


</script>

<template>
  <div class="">

    <Modal :showModal="showModal" :message="deleteMessage" :confirmButtonColor="'bg-red-500'"
           @close="handleModalClose" @confirm="handleModalConfirm">
      <template #header>
        Confirmar eliminación
      </template>
      <template #body>
        {{ deleteMessage }}
      </template>
    </Modal>

    <div v-if="showSuccessToast" class="fixed top-0 right-0 p-4 mt-4 ml-8 bg-green-500 text-white rounded">
      ¡Reserva eliminada con éxito!
    </div>
    
    <table class=" text-lg text-white bg-gray-800 rounded-lg">
      <thead class="">
        <tr>
          <th scope="col" class="px-4 py-2 ">
            Correo Cliente
          </th>
          <th scope="col" class="px-4 py-2">
            Hora Llegada
          </th>
          <th scope="col" class=" px-4 py-2">
            Personas
          </th>
          <th scope="col" class="px-4 py-2 ">
            Nombre del cenote
          </th>
          <th scope="col" class="px-4 py-2 ">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reserva in reservas" :key="reserva.token">
          <td class="px-4 py-2">{{ reserva.cliente.correoCliente }}</td>
          <td class="px-4 py-2">{{ reserva.cliente.horaLlegada }}</td>
          <td class="px-4 py-2">{{ reserva.cliente.personas }}</td>
          <td class="px-4 py-2">{{ reserva.cenote.nameCenote }}</td>
          <td class="px-4 py-2">
            <button @click="verDetalles(reserva.token)" class="text-blue-500 hover:text-blue-700">
              Ver
            </button>

            <button @click="prepareDelete(reserva.token)" class="text-red-500 hover:text-red-700 ml-2">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  table {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20rem;
    margin-bottom: auto;
  }
  td {
    margin-left: 2rem;
    margin-right: 2rem;
  }
</style>
