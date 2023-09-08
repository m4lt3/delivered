<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { watch, ref, onMounted } from 'vue';

  import { useCourierStore } from '@/store/courier';

  import DeleteModal from '@/components/deleteModal.vue';
  import ImportDialog from '@/components/appBar/importDialog.vue';

  const route = useRoute();
  const router = useRouter();

  const courierStore = useCourierStore();

  async function deleteCourier() {
    await courierStore.remove();
    router.push({ name: 'Home' });
  }

  async function exportCourier() {
    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(courierStore.courier)));
    a.setAttribute('download', `${route.params.id}_${courierStore.courier.courier.info.name.replaceAll(' ', '-')}.json`);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
</script>
<template>
  <v-menu v-if="courierStore.courier">
    <template #activator="{ props }">
      <v-icon icon="mdi-dots-vertical" style="margin-right: 1rem" v-bind="props"></v-icon>
    </template>
    <v-list>
      <v-list-item>
        <DeleteModal @delete="deleteCourier" variant="plain"><v-icon icon="mdi-delete-outline"></v-icon>Delete Courier</DeleteModal>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-application-export"
        title="Export Courier"
        @click="exportCourier"
      ></v-list-item>
      <ImportDialog></ImportDialog>

    </v-list>
  </v-menu>
</template>
