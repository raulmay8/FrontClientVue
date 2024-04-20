<template>
    <div v-if="showSuccessToast" class="fixed top-0 right-0 p-4 mt-4 mr-4 bg-green-500 text-white rounded">
        Cuenta confirmada exitosamente
    </div>

    <div class="flex justify-center items-center h-screen w-screen">
        <div class="rounded-lg shadow-lg bg-gray-800 border-gray-700 p-4">
      <form class="p-4"  @submit.prevent="confirmAccount">
        <h5 class="text-lg p-4 mb-2 mt-2 font-medium text-white">Token</h5>
        <div>
            <input type="text" id="token" v-model="token" required>
        </div>
        <button type="submit" class="text-white p-2 mb-2 mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg"
        >Confirmar Cuenta</button>
      </form>
      <p class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import AuthService from '@/services/AuthServices';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const authService = new AuthService();
  const token = ref('');
  const errorMessage = ref('');
  const router = useRouter();
  const showSuccessToast = ref(false);


  const confirmAccount = async () => {
    try {
      const isSuccess = await authService.confirmAccount(token.value);
      if (isSuccess) {
        console.log('Cuenta confirmada exitosamente.');
        showSuccessToast.value = true;
        setTimeout(() => {
        router.push({ name: 'login' }); 
      }, 3000);
      } else {
        console.error('Error al confirmar la cuenta.');
      }
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
      const err = error as Error;
      switch (err.message) {
        case 'UserNotFound':
          errorMessage.value = 'Usuario no encontrado.';
          break;
        default:
          errorMessage.value = 'Error registrar usuario. Por favor, intenta nuevamente más tarde.';
          break;
      }
    } else {
      // Si no es un error de tipo Error, manejarlo como un error genérico
      errorMessage.value = 'Error al registrar usuario. Por favor, intenta nuevamente más tarde.';
    }
    }
  };
  </script>
  