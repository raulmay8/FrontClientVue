<template>
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative p-4 w-full max-w-md">
      <div class="relative bg-white rounded-lg shadow">
        <div class="p-4 md:p-5 text-center">
          <h3 class="mb-5 text-lg font-normal text-gray-500">{{ message }}</h3>
          <button @click="onConfirm" class="text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" :class="confirmButtonColor">
            Confirmar
          </button>
          <button @click="onClose" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  showModal: Boolean,
  message: String,
  confirmButtonColor: String,
});

const emit = defineEmits(['close', 'confirm']);

const onClose = () => {
  
  emit('close');
};

const onConfirm = () => {
  
  emit('confirm');
};
</script>
