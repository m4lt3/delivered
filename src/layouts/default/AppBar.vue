<script setup>
  import { useTheme } from 'vuetify';

  const theme = useTheme();

  function toggleTheme() {
    theme.global.name.value = theme.global.name.value == 'light' ? 'dark' : 'light';
  }
</script>

<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <img style="width: 15rem" src="./delivered_logo.png" alt="The Delivered-Logo" />
      Digital Character Sheets
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-icon
      :icon="theme.global.name.value == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      @click="toggleTheme"
      style="margin-right: 1rem;"
    ></v-icon>
  </v-app-bar>
</template>
