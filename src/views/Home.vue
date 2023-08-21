<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import { db } from '@/utils/db.js';

  import Heading from '@/components/heading.vue';
  import DeleteModal from '@/components/deleteModal.vue';

  const router = useRouter();

  const couriers = ref([]);

  async function loadCouriers() {
    couriers.value = await db.couriers.toArray();
  }

  async function deleteCourier(id) {
    await db.couriers.delete(id);
    loadCouriers();
  }

  async function addCourier() {
    let id = await db.couriers.add({ courier: { info: {}, stats: {} }, parcels: [], journal: [] });
    router.push('/courier/' + id);
  }

  onMounted(() => {
    loadCouriers();
  });

</script>
<template>
  <v-container>
    <Heading h="1">Select your Courier</Heading>
    <div id="CourierGrid">
      <v-card v-for="courier in couriers"  @click.self="router.push('/courier/'+courier.id)" :key="courier.id">
        <template #title>{{ courier.name }}</template>
        <template #append>
          <DeleteModal
            @delete="deleteCourier(courier.id)"
            variant="plain"
          ></DeleteModal>
        </template>
      </v-card>
      <v-card
        color="success"
        @click="addCourier"
        >
        <v-card-text class="h-100">
          <div class="d-flex align-center justify-center h-100">
            <v-icon icon="mdi-plus" size="large"></v-icon>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<style scoped>
 #CourierGrid {
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
 }
  #CourierGrid > * {
    margin: 1rem;
    min-width: 100px;
    min-height: 100px;
  }
</style>
