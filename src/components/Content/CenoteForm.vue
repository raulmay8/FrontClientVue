<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Modal from '../Auth/Modal.vue';
import { useRouter } from 'vue-router';
import { getAllCenotes, getCenoteById, deleteCenoteService} from '../../services/CenoteServices'

const cenotes = ref([]);
const showModal = ref(false);
const deleteMessage = ref('');
const idToDelete = ref('');
const showSuccessToast = ref(false);
const router = useRouter();

onMounted(async () => {
  try {
    cenotes.value = await getAllCenotes(); 
  } catch (error) {
    console.error('Error al obtener los cenotes:', error);
  }
});
const deleteCenote = async (cenoteId: number) => {
  try {
    await deleteCenoteService(cenoteId); // Llama a la función de eliminación del servicio
    cenotes.value = cenotes.value.filter(cenote => cenote.id !== cenoteId);
    showSuccessToast.value = true;
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 3000);
    console.log('Cenote eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el cenote:', error);
  }
};
const prepareDelete = (id: number) => {
  idToDelete.value = id;
  
  // Verificar si el cenote existe en la lista
  const cenote = cenotes.value.find(cenote => cenote.id === id);
  if (cenote) {
    // Preparar el mensaje de eliminación con el nombre del cenote
    deleteMessage.value = `¿Estás seguro de que deseas eliminar el cenote "${cenote.nameCenote}"?`;
  } else {
    deleteMessage.value = "No se puede encontrar el cenote.";
  }
  
  showModal.value = true;
};
const handleModalClose = () => {
  showModal.value = false;
};

const handleModalConfirm = () => {
  deleteCenote(idToDelete.value);
  showModal.value = false;
};

const viewCenote = (cenoteId: number) => {
  // Utiliza el router para navegar a la vista del cenote con el ID seleccionado
  router.push({ name: 'cenotev', params: { id: cenoteId } });
};
</script>

<template>
  <Modal :showModal="showModal" :message="deleteMessage" :confirmButtonColor="'bg-red-500'"
           @close="handleModalClose" @confirm="handleModalConfirm">
      <template #header>
        Confirmar eliminación
      </template>
      <template #body>
        {{ deleteMessage }}
      </template>
    </Modal>
    <div v-if="showSuccessToast" id="toast-success" class="fixed top-0 right-0 p-4 mt-4 mr-4 bg-red-500 text-white rounded">
        Cenote eliminado exitosamente
    </div>
    <div class="flex flex-col items-center justify-center h-screen">
        <router-link to="cenote/crear" class="block text-center mb-4">
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Crear Nuevo Cenote</button>
    </router-link>
        <div class="rounded-lg shadow-lg bg-gray-800 border-gray-700 p-4">
            <table class=" text-lg text-white bg-gray-800 rounded-lg m-2">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Significado</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody class="">
                <tr v-for="cenote in cenotes" :key="cenote.id">
                    <td>{{ cenote.nameCenote }}</td>
                    <td>{{ cenote.significado }}</td>
                    <td>{{ cenote.precio }}</td>
                    <td>
                    <button @click="viewCenote(cenote.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver</button>
                    <button @click="prepareDelete(cenote.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
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