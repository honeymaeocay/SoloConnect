<script setup>
import { ref } from 'vue'

const theme = ref(localStorage.getItem('theme') ?? 'light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar class="px-3" :color="theme === 'light' ? 'amber-lighten-1' : 'yellow-darken-3'">
        <v-spacer></v-spacer>

        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-main>
          <v-container>
            <slot name="content"></slot>
          </v-container>
        </v-main>

        <v-footer
          class="font-weight-bold"
          :color="theme === 'light' ? 'amber-lighten-1' : 'yellow-darken-3'"
          elevation="24"
          border
          app
          >Copyright @ 2024 - SoloConnect | All Rights Reserved</v-footer
        >
      </v-parallax>
    </v-app>
  </v-responsive>
</template>
