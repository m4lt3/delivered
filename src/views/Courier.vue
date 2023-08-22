<script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted, computed, watch } from 'vue';

  import { useCourierStore } from '@/store/courier';

  import { db } from '@/utils/db.js';

  import Heading from '@/components/heading.vue';
  import AddParcelModal from '@/components/courier/addParcelModal.vue';

  const route = useRoute();

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

  const loading = ref(true);

  const newEntry = ref("");

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

  function addJournalEntry() {
    courierStore.courier.journal.push(newEntry.value.toString());
    courierStore.save();
    newEntry.value = "";
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
        <v-card
          class="my-5"
          title="Courier Info"
          prepend-icon="mdi-account-circle"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Name" variant="underlined" v-model="courierStore.courier.courier.info.name" @change="courierStore.save"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Pronouns" variant="underlined" v-model="courierStore.courier.courier.info.pronouns" @change="courierStore.save"></v-text-field>
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
                  v-model="courierStore.courier.courier.stats.tier"
                  @change="courierStore.save"
                ></v-text-field>
              </v-col>
              <v-col cols="10" class="d-flex align-center">
                <v-slider
                  v-model="courierStore.courier.courier.stats.xp"
                  label="XP"
                  :min="0"
                  :max="5"
                  :step="1"
                  thumb-label
                  thumb-color="warning"
                  track-fill-color="warning"
                  @update:modelValue="courierStore.save"
                ></v-slider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  variant="solo-filled"
                  v-model="courierStore.courier.courier.stats.body"
                  label="Body"
                  type="number"
                  min="1"
                  @change="courierStore.save"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  variant="solo-filled"
                  v-model="courierStore.courier.courier.stats.wit"
                  label="Wit"
                  type="number"
                  min="1"
                  @change="courierStore.save"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  variant="solo-filled"
                  v-model="courierStore.courier.courier.stats.social"
                  label="Social"
                  type="number"
                  min="1"
                  @change="courierStore.save"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-expansion-panels class="mt-2">
              <v-expansion-panel title="How long have you been a courier?">
                <v-expansion-panel-text>
                  <v-textarea v-model="courierStore.courier.courier.flavour.experience" variant="outlined" @change="courierStore.save">
                  </v-textarea>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel title="Who is your employer or what kind of parcels do you deliver?">
                <v-expansion-panel-text>
                  <v-textarea v-model="courierStore.courier.courier.flavour.employer" variant="outlined" @change="courierStore.save">
                  </v-textarea>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel title="What does your vessel look like?">
                <v-expansion-panel-text>
                  <v-textarea v-model="courierStore.courier.courier.flavour.vessel" variant="outlined" @change="courierStore.save">
                  </v-textarea>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel title="How prepared do you feel to take this voyage?">
                <v-expansion-panel-text>
                  <v-textarea v-model="courierStore.courier.courier.flavour.prepared" variant="outlined" @change="courierStore.save">
                  </v-textarea>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel title="What are you running toward or away from?">
                <v-expansion-panel-text>
                  <v-textarea v-model="courierStore.courier.courier.flavour.running" variant="outlined" @change="courierStore.save">
                  </v-textarea>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
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
              <v-card v-for="parcel in filteredParcels" :key="'p-' + parcel.id">
                <v-card-item>
                  <v-card-title>{{ parcel.name }}</v-card-title>
                  <v-card-subtitle>#{{parcel.id}}</v-card-subtitle>
                  <template #append>
                    <v-text-field
                      prepend-icon="mdi-clock-outline"
                      variant="solo"
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
                  <v-textarea v-model="parcel.description" @change="courierStore.save()"></v-textarea>
                </v-card-text>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
        <v-card
          prepend-icon="mdi-notebook"
          title="Journal"
          class="my-5"
        >
        <v-card-text>
          <v-textarea v-model="newEntry" label="New Journal Entry" variant="outlined"></v-textarea>
          <v-btn color="success" @click="addJournalEntry" block><v-icon icon="mdi-plus"></v-icon></v-btn>
          <v-divider class="my-5"></v-divider>
          <v-textarea
            v-for="day in courierStore.courier.journal.length"
            :key="'j-' + day"
            v-model="courierStore.courier.journal[courierStore.courier.journal.length - day]"
            variant="outlined"
            :label="'Day ' + (courierStore.courier.journal.length - day + 1)"
            @change="courierStore.save()"
          ></v-textarea>
        </v-card-text>
        </v-card>
      </template>
    </template>
  </v-container>
</template>
