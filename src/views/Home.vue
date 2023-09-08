<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import { db } from '@/utils/db.js';

  import Heading from '@/components/heading.vue';
  import DeleteModal from '@/components/deleteModal.vue';

  const defaultCourier = {
    courier: {
      info: {},
      stats: {
        tier: 0,
        xp: 0,
        body: 1,
        wit: 1,
        social: 1
      },
      flavour: {}
    },
    parcels: [],
    journal: []
  };

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
    let id = await db.couriers.add(defaultCourier);
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
      <v-card v-for="courier in couriers"  @click="router.push('/courier/'+courier.id)" :key="courier.id">
        <template #title>{{ courier.courier.info.name }}</template>
        <template #subtitle>Tier {{ courier.courier.stats.tier }}</template>
        <template #append>
          <DeleteModal
            @delete="deleteCourier(courier.id)"
            variant="plain"
            @click.stop
          ></DeleteModal>
        </template>
        <template #loader>
          <v-progress-linear :model-value="courier.courier.stats.xp * 20" color="warning"></v-progress-linear>
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
