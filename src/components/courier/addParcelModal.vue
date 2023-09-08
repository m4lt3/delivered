<script setup>
  import { ref } from 'vue';

  const emit = defineEmits(['input']);

  const parcel = ref({});
  const show = ref(false);

  const form = ref(null);
  const valid = ref(null);

  const rules = {
    required: (value) => {
      if (value) {
        return true;
      }
      return "Required";
    }
  };

  async function addParcel() {
    await form.value.validate();
    if (!valid.value) {
      return;
    }

    parcel.value.daysLeft = Number(parcel.value.daysLeft);
    parcel.value.successes = Number(parcel.value.successes);

    emit('input', JSON.parse(JSON.stringify(parcel.value)));
    show.value = false;

    form.value.reset();
  }

</script>
<template>
  <v-dialog
    width="auto"
    v-model="show"
  >
    <template #activator="{ props }">
      <v-btn color="success" size="large" block v-bind="props"><v-icon icon="mdi-plus"></v-icon></v-btn>
    </template>
    <v-card
     style="min-width: 200px; width: 50vw; max-width: 100vw"
    >
      <template #title>
        Add new Parcel
      </template>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Days"
                type="number"
                min="1"
                v-model="parcel.daysLeft"
                :rules="[rules.required]"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Successes"
                type="number"
                min="1"
                v-model="parcel.successes"
                :rules="[rules.required]"
                variant="underlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="parcel.name"
                label="Name"
                :rules="[rules.required]"
                variant="underlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Description"
                v-model="parcel.description"
                variant="outlined"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-btn block class="mb-2" color="success" @click="addParcel"><v-icon icon="mdi-plus"></v-icon></v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
