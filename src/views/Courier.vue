<script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';

  import { db } from '@/utils/db.js';

  import Heading from '@/components/heading.vue';

  const route = useRoute();

  const courier = ref(undefined);

  onMounted(() => {
    loadCourier();
  });

  async function loadCourier() {
    courier.value = await db.couriers.get(Number(route.params.id));
  }

  async function saveChanges() {
    await db.couriers.put(JSON.parse(JSON.stringify(courier.value)), Number(route.params.id));
    loadCourier();
  }
</script>

<template>
  <v-container>
    <Heading h="1">Courier Journal</Heading>
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
    </template>

  </v-container>

</template>
