<script setup>
  import { db } from '@/utils/db.js';
  import { useRoute, useRouter } from 'vue-router';
  import { watch, ref, onMounted } from 'vue';

  import DeleteModal from '@/components/deleteModal.vue';

  const route = useRoute();
  const router = useRouter();

  const courier = ref(undefined);

  watch(() => { return route.params.id }, (newVal, oldVal) => {
    loadCourier();
    console.log('watcher called');
  });

  onMounted(() => {
    loadCourier();
  });

  async function loadCourier() {
    courier.value = await db.couriers.get(Number(route.params.id));
  }

  async function deleteCourier() {
    await db.couriers.delete(Number(route.params.id));
    router.push({ name: 'Home' });
  }

  async function exportCourier() {
    await loadCourier();
    
    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(courier.value)));
    a.setAttribute('download', `${route.params.id}_${courier.value.courier.info.name.replaceAll(' ', '-')}.json`);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
</script>
<template>
  <v-menu v-if="courier">
    <template #activator="{ props }">
      <v-icon icon="mdi-dots-vertical" style="margin-right: 1rem" v-bind="props"></v-icon>
    </template>
    <v-list>
      <v-list-item>
        <DeleteModal @delete="deleteCourier" variant="playin"><v-icon icon="mdi-delete-outline"></v-icon>Delete Courier</DeleteModal>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-application-export"
        title="Export Courier"
        @click="exportCourier"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-application-import"
        title="Import Courier"
      ></v-list-item>
    </v-list>
  </v-menu>
</template>
