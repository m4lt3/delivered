import Dexie from 'dexie';

export const db = new Dexie('DeliveredCouriers');
db.version(1).stores({
  couriers: '++id', 
});
