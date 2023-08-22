<script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted, computed, watch } from 'vue';

  import { useCourierStore } from '@/store/courier';

  import Heading from '@/components/heading.vue';
  import Info from '@/components/courier/info.vue';
  import Parcels from '@/components/courier/parcels.vue';
  import Journal from '@/components/courier/journal.vue';

  const route = useRoute();

  const courierStore = useCourierStore();

  const loading = ref(true);

  onMounted(() => {
    loadCourier();
  });

  watch(()  => route.params.id, (newVal, oldVal) => {
    loadCourier();
  });

  async function loadCourier() {
    if (!route.params.id || isNaN(route.params.id)) {
      return;
    }
    loading.value = true;
    courierStore.load(Number(route.params.id));
    loading.value = false;
  }
</script>

<template>
  <v-container>
    <Heading h="1">Courier Journal</Heading>
    <template v-if="loading">
      <div class="d-flex align-center justify-center">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
    </template>
    <template v-else>
      <template v-if="courierStore.courier == undefined">
        <Heading h="2" class="my-5">404 - Courier lost in Space</Heading>
      </template>
      <template v-else>
        <Info></Info>
        <Parcels></Parcels>
        <Journal></Journal>
      </template>
    </template>
  </v-container>
</template>
