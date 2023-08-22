<script setup>
  import { useTheme } from 'vuetify';
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const theme = useTheme();

  function toggleTheme() {
    theme.global.name.value = theme.global.name.value == 'light' ? 'dark' : 'light';
  }
</script>

<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <img style="width: 15rem" src="./delivered_logo.png" alt="The Delivered-Logo" />
      Digital Courier Journal
    </v-app-bar-title>
    <v-spacer></v-spacer>
      <v-icon v-if="route.name != 'Home'" icon="mdi-home-circle" style="margin-right: 1rem" @click="router.push({ name: 'Home' })"></v-icon>
    <v-icon
      :icon="theme.global.name.value == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      @click="toggleTheme"
      style="margin-right: 1rem;"
    ></v-icon>
  </v-app-bar>
</template>
