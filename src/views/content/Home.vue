<template>
  <div class="flex flex-col">
    <div class="flex flex-1">
      <div class="shadow-2xl m-1">
        <Sidebar />
      </div>
      <div class="flex-1">
        <main class="m-2 mx-auto max-w-6xl p-10 bg-gray-900 shadow-2xl">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '../../components/Sidebar.vue';

export default defineComponent({
  name: 'Layout',
  components: {
    Sidebar,
  },
});
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

.content {
  flex-grow: 1; /* Ocupa todo el espacio disponible */
  margin-right: 20px; /* Espacio entre el contenido y el sidebar */
}

.sidebar {
  width: 250px; /* Ancho del sidebar */
}

button {
  margin-bottom: 10px;
}
</style>
