<script setup>
  import { db } from '@/utils/db.js';
  import { useRoute, useRouter } from 'vue-router';
  import { watch, ref, onMounted } from 'vue';

  import Ajv from 'ajv';

  import DeleteModal from '@/components/deleteModal.vue';

  const schema = {
    type: "object",
    properties: {
      courier: {
        type: "object",
        properties: {
          info: {
            type: "object",
            properties: {
              name: { type: "string" },
              pronouns: { type: "string" }
            },
            required: [ "name" ],
            additionalProperties: false
          },
          stats: {
            type: "object",
            properties: {
              tier: { type: "integer", minimum: 0 },
              xp: { type: "integer", minimum: 0, maximum: 5 },
              body: { type: "integer", minimum: 1 },
              wit: { type: "integer", minimum: 1 },
              social: { type: "integer", minimum: 1 }
            },
            required: [ "tier", "xp", "body", "wit", "social" ],
            additionalProperties: false
          },
          flavour: {
            type: "object",
            properties: {
              experience: { type: "string" },
              employer: { type: "string" },
              vessel: { type: "string" },
              prepared: { type: "string" },
              running: { type: "string" },
            },
            additionalProperties: false
          }
        },
        required: ["info", "stats", "flavour"],
        additionalProperties: false
      },
      parcels: {
        type: "array",
        uniqueItems: true,
        items: {
          type: "object",
          properties: {
            id: { type: "integer" },
            daysLeft: { type: "integer", minimum: 0 },
            successes: { type: "array", items: { type: "boolean" } },
            name: { type: "string" },
            description: { type: "string" }
          },
          required: [ "id", "daysLeft", "successes", "name" ],
          additionalProperties: false
        }
      },
      journal: {
        type: "array",
        items: { type: "string" }
      },
      id: { type: "integer" }
    },
    required: ["courier", "parcels", "journal"],
    additionalProperties: false
  };

  const route = useRoute();
  const router = useRouter();

  const courier = ref(undefined);
  const showImport = ref(false);
  const uploadFile = ref([]);
  const allowImport = ref(false);
  const importError = ref(false);

  watch(() => { return route.params.id }, (newVal, oldVal) => {
    loadCourier();
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

  async function importCourier() {
    let toImport = JSON.parse(await uploadFile.value[0].text());
    toImport.id = Number(route.params.id);
    await db.couriers.put(toImport, Number(route.params.id));
    uploadFile.value = [];
    allowImport.value = false;
    importError.value = false;
    showImport.value = false;
    router.push({ name: 'Home' });
  }

  async function checkImportFile() {
    if (!uploadFile.value[0]) {
      importError.value = false;
      allowImport.value = false;
      return;
    }

    let contents;
    try {
      contents = JSON.parse(await uploadFile.value[0].text());

      let ajv = new Ajv();
      let validate = ajv.compile(schema)

      let valid = validate(contents);

      if (!valid) {
        throw validate.errors;
      }

      importError.value = false;
      allowImport.value = true;
    } catch (e) {
      importError.value = true;
      allowImport.value = false;
      console.error(e);
    }
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
      <v-dialog
        width="auto"
        v-model="showImport"
      >
        <template #activator="{ props }">
          <v-list-item
            prepend-icon="mdi-application-import"
            title="Import Courier"
            v-bind="props"
          ></v-list-item>
        </template>
        <v-card width="auto" title="Import Courier from file">
          <v-card-text>
            <v-alert type="warning" variant="tonal" title="Current data will be lost">When importing a Courier, all data of you currently opened Courier will be overwritten</v-alert>
            <v-file-input v-model="uploadFile" class="my-2" label="Courier-file" accept=".json" @change="checkImportFile"></v-file-input>
            <v-alert v-if="importError" type="error" class="mb-2" title="Invalid file">The provided File contains invalid data</v-alert>
            <v-btn :disabled="!allowImport" @click="importCourier" block>Import</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>

    </v-list>
  </v-menu>
</template>
