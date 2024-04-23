<template>
    <div class="flex flex-col h-screen">
      <div class="flex flex-1">
        <div class="shadow-2xl m-4">
          <Sidebar />
        </div>
        <div class="flex-1">
          <main class=" mx-auto max-w-6xl p-10 bg-gray-900 shadow-2xl">
            <router-view />
          </main>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Sidebar from '@/components/Sidebar.vue';
  
  export default defineComponent({
    name: 'Layout',
    components: {
      Sidebar,
    },
  });
  </script>
  