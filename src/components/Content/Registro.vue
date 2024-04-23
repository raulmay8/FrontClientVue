<template>
  <div v-if="showSuccessToast" class="fixed top-0 right-0 p-4 mt-4 mr-4 bg-green-500 text-white rounded">
        Cuenta creada exitosamente
    </div>
  <div class="flex justify-center items-center mt-10 w-screen">
    <div class="rounded-lg shadow-lg bg-gray-800 border-gray-700 p-4">
      <form class="p-4" @submit.prevent="handleRegister">
        <h5 class="text-lg font-medium text-white">Registrar usuario</h5>
        <div>
          <label for="correoUsuario" class="block mt-2 mb-2 text-lg font-medium text-white">Correo electrónico</label>
          <input 
            v-model="registro.correoUsuario"
            type="email" 
            name="correoUsuario" 
            id="correoUsuario" 
            class="text-lg p-4 mb-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-600 border-gray-500 placeholder-gray-40" 
            placeholder="name@company.com" 
            required 
          />
        </div>
        <div>
          <label for="nameUsuario" class="block mt-2 mb-2 text-lg font-medium text-white">Nombre de usuario</label>
          <input 
            v-model="registro.nameUsuario"
            type="text" 
            name="nameUsuario" 
            id="nameUsuario" 
            class="text-lg p-4 mb-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-600 border-gray-500 placeholder-gray-40" 
            placeholder="Nombre de usuario" 
            required 
          />
        </div>
        <div>
          <label for="password" class="block mt-2 mb-2 text-lg font-medium text-white">Contraseña</label>
          <input  
            v-model="registro.password"
            type="password" 
            name="password" 
            id="password" 
            placeholder="••••••••" 
            class="text-lg p-4 mb-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-600 border-gray-500 placeholder-gray-40" 
            required 
            minlength="6"
          />
        </div>
        <div>
          <label for="password_confirmation" class="block mt-2 mb-2 text-lg font-medium text-white">Confirmar Contraseña</label>
          <input  
            v-model="registro.password_confirmation"
            type="password" 
            name="password_confirmation" 
            id="password_confirmation" 
            placeholder="••••••••" 
            class="text-lg p-4 mb-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-600 border-gray-500 placeholder-gray-40" 
            required 
            minlength="6"
          />
          <p v-if="registro.password !== registro.password_confirmation" class="text-red-500 mt-2">Las contraseñas no coinciden.</p>
        </div>
        <button 
          type="submit" 
          class="text-white p-2 mb-2 mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg"
        >Registrar</button>
        <p v-if="!isEmailValid(registro.correoUsuario)" class="text-red-500 mt-2">El correo electrónico no es válido.</p>
        <div v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthService from '@/services/AuthServices';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
  const showSuccessToast = ref(false);
const authService = new AuthService();
const registro = ref({
  correoUsuario: '',
  nameUsuario: '',
  password: '',
  password_confirmation: ''
});
const errorMessage = ref('');

// Función para validar el formato del correo electrónico
const isEmailValid = (email: string): boolean => {
  // Expresión regular para validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


const handleRegister = async () => {
  if (registro.value.password !== registro.value.password_confirmation) {
    errorMessage.value = 'Las contraseñas no coinciden.';
    return;
  }
  try {
    const isSuccess = await authService.register(
      registro.value.correoUsuario,
      registro.value.nameUsuario,
      registro.value.password,
      registro.value.password_confirmation
    );

    // Comprueba si la operación fue exitosa o no
    if (isSuccess) {
      showSuccessToast.value = true; // Muestra el toast de éxito
    } else {
      // En caso de fallo, muestra un mensaje de error genérico
      errorMessage.value = 'Error al registrar usuario. Por favor, intenta nuevamente más tarde.';
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