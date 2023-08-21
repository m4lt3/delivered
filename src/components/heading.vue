<script setup>
  import { useTheme } from 'vuetify';

  const props = defineProps(['h']);
  const theme = useTheme();

</script>
<template>
  <h1 v-if="props.h == 1" :class="{ dark: theme.global.name.value == 'dark' }">
    <div><slot></slot></div>
  </h1>
  <h2 v-else :class="{ dark: theme.global.name.value == 'dark' }">
    <div><slot></slot></div>
  </h2>
</template>
