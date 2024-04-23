<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCenoteById } from '../../services/CenoteServices';
import { useRoute } from 'vue-router';

const route = useRoute();
    const idP = Number(route.params.id);
    const cenote = ref<any>(null);
    
onMounted(async () => {
  try {
    cenote.value = await getCenoteById(idP); 
  } catch (error) {
    console.error('Error al obtener el cenote:', error);
  }
});


</script>
<template>
    <div class="flex flex-col items-center justify-center h-screen">
    <div class="rounded-lg shadow-lg bg-gray-800 border-gray-700 p-4">
      <table class="text-lg text-white bg-gray-800 rounded-lg m-2">
        <tbody>
          <tr v-if="cenote">
            <td>Nombre:</td>
            <td>{{ cenote.data.nameCenote }}</td>
          </tr>
          <tr v-if="cenote">
            <td>Significado:</td>
            <td>{{ cenote.data.significado }}</td>
          </tr>
          <tr v-if="cenote">
            <td>Precio:</td>
            <td>{{ cenote.data.precio }}</td>
          </tr>
          <tr v-else>
            <td colspan="2">Cargando...</td> 
          </tr>
          <tr v-if="cenote">
            <td colspan="2">
              <img :src="cenote.data.url" alt="Imagen del cenote" class="w-96 h-auto mb-4">
            </td>
          </tr>
        </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
table {
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
  }
  td {
    padding: 1rem;
}

</style>