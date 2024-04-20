<script setup lang="ts">
import { ref } from 'vue';
import { createCenote } from '@/services/CenoteServices';
import { useRouter } from 'vue-router';

const showToast = ref(false);
const router = useRouter();

const formData = ref({
    nameCenote: '',
    significado: '',
    descripcion: '',
    precio: 0,
    url: ''
});

const crearCenote = async () => {
    try {
        await createCenote(formData.value);
        formData.value = {
        nameCenote: '',
        significado: '',
        descripcion: '',
        precio: 0,
        url: ''
        };
        showToast.value = true;
    setTimeout(() => {
        showToast.value = false;
        router.push({ name: 'cenote' });
    }, 3000);
        // Redirigir al usuario a la página de cenote
        console.log('Cenote creado correctamente');
    } catch (error) {
        console.error('Error al crear el cenote:', error);
    }
};


</script>
<template>
    <div v-if="showToast" id="toast-success" class="fixed top-0 right-0 p-4 mt-4 mr-4 bg-green-500 text-white rounded">
        Cenote creado exitosamente
    </div>
    <div class="flex justify-center items-center h-screen w-screen">
        <div class="rounded-lg shadow-lg bg-gray-800 border-gray-700 p-4">
            <form class="p-4" @submit.prevent="crearCenote">
                <h5 class="text-lg p-4 mb-2 mt-2 font-medium text-white">Registrar cenote</h5>
                <div>
                    <label for="nameCenote" class="block mt-2 mb-2 text-lg font-medium text-white">Nombre</label>
                    <input 
                        v-model="formData.nameCenote"
                        type="text"
                        name="nameCenote"
                        id="nameCenote"
                        class="text-lg p-4 mb-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-600 border-gray-500 placeholder-gray-40" 
                        placeholder="Nombre del cenote" 
                        required 
                    >
                    <label for="significado" class="block mt-2 mb-2 text-lg font-medium text-white">Significado</label>
                    <input 
                        v-model="formData.significado"
                        type="text"
                        name="significado"
                        id="significado"
                        class="text-lg p-4 mb-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-600 border-gray-500 placeholder-gray-40" 
                        placeholder="Significado del cenote" 
                        required 
                    >
                    <label for="descripcion" class="block mt-2 mb-2 text-lg font-medium text-white">Descripción</label>
                    <textarea 
                        v-model="formData.descripcion"
                        name="descripcion" 
                        id="descripcion" 
                        cols="30" 
                        class="text-lg p-4 mb-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full placeholder-gray-40" 
                        placeholder="Descripción del cenote"
                    ></textarea>
                    <label for="precio" class="block mt-2 mb-2 text-lg font-medium text-white">Precio</label>
                    <input 
                        v-model="formData.precio"
                        type="number"
                        name="precio"
                        id="precio"
                        class="text-lg p-4 mb-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-600 border-gray-500 placeholder-gray-40" 
                        placeholder="Precio del cenote" 
                        required 
                    >
                    <label for="url" class="block mt-2 mb-2 text-lg font-medium text-white">Imagen</label>
                    <input 
                        v-model="formData.url"
                        type="text"
                        name="url"
                        id="url"
                        class="text-lg p-4 mb-2 mt-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-500 border-gray-500 placeholder-gray-40" 
                        placeholder="Url del cenote" 
                        required 
                    >
                </div>
                <div class="flex justify-end">
                <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Crear</button>
                </div>
            </form>
        </div>
    </div>
</template>