<script setup lang="ts">
import { ref } from 'vue';
import AuthService from '@/services/AuthServices';
import { useRouter } from 'vue-router';

const correoUsuario = ref('');
const password = ref('');
const errorMessage = ref('');

const authService = new AuthService();
const router = useRouter();

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  try {
    const success = await authService.login(correoUsuario.value, password.value);
    if (success) {
      router.push('/home/reserva');
    } else {
      errorMessage.value = 'Error al iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.';
    }

  } catch (error : any) {
    // Manejo de errores
    if (error.response && error.response.status) {
      // Si la respuesta contiene un código de estado HTTP
      switch (error.response.status) {
        case 401:
          errorMessage.value = 'Error de autenticación. Por favor inicia sesión correctamente.';
          break;
        case 409:
          errorMessage.value = 'Conflicto en la solicitud. El recurso ya existe.';
          break;
        // Otros casos de errores específicos aquí
        default:
          errorMessage.value = 'Error desconocido. Por favor, intenta nuevamente más tarde.';
          break;
      }
    } else {
      // En caso de error no relacionado con HTTP
      errorMessage.value = 'Error de red. Por favor, revisa e intenta nuevamente.';
    }
  }
};
</script>

<template>
  <div class="flex justify-center items-center h-screen w-screen">
    <div class="rounded-lg shadow-lg bg-gray-800 border-gray-700 p-4">
      <form class="p-4" @submit="handleSubmit">
        <h5 class="text-lg p-4 mb-2 mt-2 font-medium text-white">Sign in to our platform</h5>
        <div>
          <label for="correoUsuario" class="block  mt-2 mb-2 text-lg font-medium text-white">Your email</label>
          <input 
            v-model="correoUsuario"
            type="email" 
            name="correoUsuario" 
            id="correoUsuario" 
            class="text-lg p-4 mb-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-600 border-gray-500 placeholder-gray-400" 
            placeholder="name@company.com" 
            required 
          />
        </div>
        <div>
          <label for="password" class="block mt-2 mb-2 text-xl font-medium text-white">Your password</label>
          <input 
            v-model="password"
            type="password" 
            name="password" 
            id="password" 
            placeholder="••••••••" 
            class="text-lg p-4 mb-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-600 border-gray-500 placeholder-gray-400" 
            required 
          />
        </div>
        <button type="submit" class="text-white p-2 mb-2 mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg">Login to your account</button>
        <p class="text-red-500 mt-2">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>
