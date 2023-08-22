<script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted, computed } from 'vue';

  import { db } from '@/utils/db.js';

  import Heading from '@/components/heading.vue';
  import AddParcelModal from '@/components/addParcelModal.vue';

  const route = useRoute();

  const courier = ref(undefined);
  const parcelFilter = ref('open');
  const filteredParcels = computed(() => {
    if (!courier.value.parcels) {
      return [];
    }

    return courier.value.parcels.filter((elem) => {
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

  onMounted(() => {
    loadCourier();
  });

  async function loadCourier() {
    courier.value = await db.couriers.get(Number(route.params.id));
  }

  async function saveChanges() {
    await db.couriers.put(JSON.parse(JSON.stringify(courier.value)), Number(route.params.id));
    loadCourier();
    console.log("Changes saved");
  }

  function addParcel(parcel) {
    let successes =  [];
    for (let i = 0; i < parcel.successes; i++) {
      successes.push(0);
    }
    parcel.successes = successes;
    courier.value.parcels.push(parcel);
    saveChanges()
  }
</script>

<template>
  <v-container>
    <Heading h="1">Courier Journal</Heading>
    {{ courier }}
    <template v-if="courier == undefined">
      <Heading h="2" class="my-5">404 - Courier lost in Space</Heading>
    </template>
    <template v-else>
      <v-card
        class="my-5"
        title="Courier Info"
        prepend-icon="mdi-account-circle"
      >
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field label="Name" variant="underlined" v-model="courier.courier.info.name" @change="saveChanges"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Pronouns" variant="underlined" v-model="courier.courier.info.pronouns" @change="saveChanges"></v-text-field>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="mt-2">
          <v-col cols="2">
            <v-text-field
              type="number"
              min="0"
              label="Tier"
              variant="underlined"
              v-model="courier.courier.stats.tier"
              @change="saveChanges"
            ></v-text-field>
          </v-col>
          <v-col cols="10" class="d-flex align-center">
            <v-slider
              v-model="courier.courier.stats.xp"
              label="XP"
              :min="0"
              :max="5"
              :step="1"
              thumb-label
              thumb-color="warning"
              track-fill-color="warning"
              @update:modelValue="saveChanges"
            ></v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              variant="solo-filled"
              v-model="courier.courier.stats.body"
              label="Body"
              type="number"
              min="1"
              @change="saveChanges"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="solo-filled"
              v-model="courier.courier.stats.wit"
              label="Wit"
              type="number"
              min="1"
              @change="saveChanges"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="solo-filled"
              v-model="courier.courier.stats.social"
              label="Social"
              type="number"
              min="1"
              @change="saveChanges"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-expansion-panels class="mt-2">
          <v-expansion-panel title="How long have you been a courier?">
            <v-expansion-panel-text>
              <v-textarea v-model="courier.courier.flavour.experience" variant="outlined" @change="saveChanges">
              </v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="Who is your employer or what kind of parcels do you deliver?">
            <v-expansion-panel-text>
              <v-textarea v-model="courier.courier.flavour.employer" variant="outlined" @change="saveChanges">
              </v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="What does your vessel look like?">
            <v-expansion-panel-text>
              <v-textarea v-model="courier.courier.flavour.vessel" variant="outlined" @change="saveChanges">
              </v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="How prepared do you feel to take this voyage?">
            <v-expansion-panel-text>
              <v-textarea v-model="courier.courier.flavour.prepared" variant="outlined" @change="saveChanges">
              </v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel title="What are you running toward or away from?">
            <v-expansion-panel-text>
              <v-textarea v-model="courier.courier.flavour.running" variant="outlined" @change="saveChanges">
              </v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      </v-card>
      <v-card
        prepend-icon="mdi-package"
        title="Parcels"
      >
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              label="Filter Parcels"
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
          <v-card v-for="(parcel, index) in filteredParcels" :key="'p-' + index">
            <v-card-item>
              <v-card-title>{{ parcel.name }}</v-card-title>
              <v-card-subtitle>#{{index}}</v-card-subtitle>
              <template #append>
                <v-text-field
                  prepend-icon="mdi-clock-outline"
                  variant="solo"
                  type="number"
                  min="0"
                  v-model="parcel.daysLeft"
                  @change="saveChanges()"
                ></v-text-field>
              </template>
            </v-card-item>
            <v-card-text>
              <div class="d-flex flex-wrap">
                <v-checkbox
                  v-for="(success, sIndex) in parcel.successes"
                  :key="'p-' + index + '-s-' + sIndex"
                  v-model="parcel.successes[sIndex]"
                  @change="saveChanges()"
                ></v-checkbox>
              </div>
              <v-textarea v-model="parcel.description" @change="saveChanges()"></v-textarea>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>
      </v-card>
    </template>

  </v-container>

</template>
