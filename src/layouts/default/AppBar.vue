<script setup>
  import { useTheme } from 'vuetify';
  import { useRoute, useRouter } from 'vue-router';

  import DotMenu from '@/components/appBar/dotMenu.vue';
  import InfoBox from '@/components/appBar/infoBox.vue';

  const router = useRouter();
  const route = useRoute();

  const theme = useTheme();

  function toggleTheme() {
    theme.global.name.value = theme.global.name.value == 'light' ? 'dark' : 'light';
  }
</script>

<template>
  <v-app-bar flat>
      <img style="width: 20vw; max-height: 100%; align-self: center; max-width: 214px" src="@/assets/delivered_logo.png" alt="The Delivered-Logo" />
      <b style="align-self: center">Digital Courier Journal</b>
    <v-spacer></v-spacer>

    <v-icon
      :icon="theme.global.name.value == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      @click="toggleTheme"
      style="margin-right: 1rem;"
    ></v-icon>
    <template v-if="route.name == 'courier'">
      <v-icon icon="mdi-home-circle" style="margin-right: 1rem" @click="router.push({ name: 'Home' })"></v-icon>
      <InfoBox></InfoBox>
      <DotMenu ></DotMenu>
    </template>

  </v-app-bar>
</template>
