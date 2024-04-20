<template>
    <div v-if="reserva" class="flex justify-center items-center h-screen w-screen">
        <div class="rounded-lg shadow-lg bg-gray-800 border-gray-700 p-4">
            <form class="p-4">
                <p class="text-xl text-white m-2 p-2"><strong>Nombre:</strong> {{ reserva.cliente ? reserva.cliente.nameCliente : 'Cliente no disponible' }}</p>
                <p class="text-xl text-white m-2 p-2"><strong>Apellido:</strong> {{ reserva.cliente ? reserva.cliente.apellidoCliente : 'Cliente no disponible' }}</p>
                <p class="text-xl text-white m-2 p-2"><strong>Cenote:</strong> {{ reserva.cenote ? reserva.cenote.nameCenote : 'Cliente no disponible' }}</p>
                <p class="text-xl text-white m-2 p-2"><strong>Correo:</strong> {{ reserva.cliente ? reserva.cliente.correoCliente : 'Cliente no disponible' }}</p>
                <p class="text-xl text-white m-2 p-2"><strong>Fecha Llegada:</strong> {{ reserva.cliente ? reserva.cliente.fechaLlegada : 'Cliente no disponible' }}</p>
                <p class="text-xl text-white m-2 p-2"><strong>Hora llegada:</strong> {{ reserva.cliente ? reserva.cliente.horaLlegada : 'Cliente no disponible' }}</p>
                <p class="text-xl text-white m-2 p-2"><strong>Comentarios:</strong> {{ reserva.cliente ? reserva.cliente.notas : 'Cliente no disponible' }}</p>
                <p class="text-xl text-white m-2 p-2"><strong>Personas:</strong> {{ reserva.cliente ? reserva.cliente.personas : 'Cliente no disponible' }}</p>
                <p class="text-xl text-white m-2 p-2"><strong>Teléfono:</strong> {{ reserva.cliente ? reserva.cliente.telefono : 'Cliente no disponible' }}</p>
            </form>
        </div>
    </div>
    <div v-else>
    <p class="text-white">No se encontraron detalles de la reserva.</p>
  </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import AuthService from '@/services/AuthServices';
  
  const authService = new AuthService();
  const route = useRoute();
  const token = route.params.token as string;
  const reserva = ref<any>(null);
  
  console.log(reserva)
  onMounted(async () => {
    reserva.value = await authService.getReservaDetails(token);
  });
  </script>
  