<script setup>
import { ref,computed } from 'vue';

import AddParcelModal from '@/components/courier/addParcelModal.vue';
import { useCourierStore } from '@/store/courier';

const courierStore = useCourierStore();

const parcelFilter = ref('open');
const filteredParcels = computed(() => {
  if (!courierStore.courier.parcels) {
    return [];
  }

  return courierStore.courier.parcels.filter((elem) => {
    switch (parcelFilter.value) {
      case 'all':
        return true;
        break;
      case 'open':
        if (elem.daysLeft > 0 && elem.successes.some(sElem => sElem == 0)) {
          return true;
        }
        return false;
        break;
      case 'delivered':
        if (!elem.successes.some(sElem => sElem == 0)) {
          return true;
        }
        return false;
        break;
      case 'failed':
        if (elem.daysLeft <= 0 && elem.successes.some(sElem => sElem == 0)) {
          return true;
        }
        return false;
        break;
    }
  });
});

function addParcel(parcel) {
  let successes =  [];
  for (let i = 0; i < parcel.successes; i++) {
    successes.push(false);
  }
  parcel.successes = successes;
  parcel.id = courierStore.courier.parcels.length + 1;
  courierStore.courier.parcels.push(parcel);
  courierStore.save()
}

</script>
<template>
  <v-card
    prepend-icon="mdi-package"
    title="Parcels"
    class="my-5"
  >
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            label="Filter Parcels"
            variant="underlined"
            v-model="parcelFilter"
            :items="[ { title: 'Open', value: 'open' }, { title: 'Delivered!', value: 'delivered' }, { title: 'Failed', value: 'failed' }, { title: 'All', value: 'all' } ]"
            density="compact"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <AddParcelModal @input="addParcel"></AddParcelModal>
        </v-col>
      </v-row>
      <div class="d-flex flex-column mt-3">
        <v-card variant="tonal" class="my-2" v-for="parcel in filteredParcels" :key="'p-' + parcel.id">
          <v-card-item>
            <v-card-title>{{ parcel.name }}</v-card-title>
            <v-card-subtitle>#{{parcel.id}}</v-card-subtitle>
            <template #append>
              <v-text-field
                prepend-icon="mdi-clock-outline"
                variant="solo-filled"
                type="number"
                min="0"
                v-model="parcel.daysLeft"
                @change="courierStore.save()"
              ></v-text-field>
            </template>
          </v-card-item>
          <v-card-text>
            <div class="d-flex flex-wrap">
              <v-checkbox
                v-for="(success, sIndex) in parcel.successes"
                :key="'p-' + parcel.id + '-s-' + sIndex"
                v-model="parcel.successes[sIndex]"
                @change="courierStore.save()"
              ></v-checkbox>
            </div>
            <v-textarea variant="outlined" v-model="parcel.description" @change="courierStore.save()"></v-textarea>
          </v-card-text>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>
