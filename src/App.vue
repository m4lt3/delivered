<script setup>
  import { onMounted } from 'vue';
  import { useTheme } from 'vuetify';

  const theme = useTheme();
  onMounted(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.global.name.value = 'dark';
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (event.matches) {
        theme.global.name.value = 'dark';
      } else {
        theme.global.name.value = 'light';
      }

    });
  });
</script>
<template>
  <router-view />
</template>
