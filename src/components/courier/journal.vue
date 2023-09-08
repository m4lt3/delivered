<script setup>
import { ref } from 'vue';

import { useCourierStore } from '@/store/courier';

const courierStore = useCourierStore();

const newEntry = ref("");

function addJournalEntry() {
  courierStore.courier.journal.push(newEntry.value.toString());
  courierStore.save();
  newEntry.value = "";
}
</script>
<template>
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
