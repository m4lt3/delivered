import { defineStore } from 'pinia';
import { ref } from 'vue';

import { db } from '@/utils/db.js';

export const useCourierStore = defineStore('courier', () => {

  const courier = ref(undefined);

  async function load(id) {
    courier.value = await db.couriers.get(id);
  }

  async function save() {
    for (let prop of ["wit", "body", "social", "tier", "xp"]) {
      courier.value.courier.stats[prop] = Number(courier.value.courier.stats[prop]);
    }

    for (let i = 0; i < courier.value.parcels.length; i++) {
      courier.value.parcels[i].daysLeft = Number(courier.value.parcels[i].daysLeft);
    }

    await db.couriers.put(JSON.parse(JSON.stringify(courier.value)));
  }

  async function remove() {
    if (courier.value) {
        await db.couriers.delete(courier.value.id);
        courier.value = undefined;
    }
  }

  return { courier, load, save, remove };
});
