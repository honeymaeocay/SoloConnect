<script setup>
// import { useAuthUserStore } from '@/stores/authUser'
import { useDisplay } from 'vuetify'

// const props = defineProps(['theme'])

// Utilize pre-defined vue functions
const { mdAndDown } = useDisplay()

// // Use Pinia Store
// const authStore = useAuthUserStore()
</script>

<template>
  <v-card :min-height="mdAndDown ? undefined : '370px'">
    <template #title>
      <span class="text-h6 font-weight-bold">
        <v-breadcrumbs :items="['System', 'Dashboard']">
          <template #prepend>
            <v-icon icon="mdi-view-dashboard" size="small" class="me-1"></v-icon>
          </template>
        </v-breadcrumbs>
      </span>
    </template>

    <!-- <template #subtitle>
      <p class="ms-4 text-wrap">View product inventory level and other administrative widgets.</p>
    </template> -->

    <v-divider class="my-3" thickness="2"></v-divider>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4" class="d-flex align-center">
          <v-img src="/images/lb-icon.jpg" :width="mdAndDown ? '80%' : '100%'"></v-img>
        </v-col>

        <v-col cols="12" sm="8">
          <h2 class="mb-5">
            Welcome Aboard !!
            <!-- <span class="font-weight-black">
              {{ authStore.userData.firstname + ' ' + authStore.userData.lastname }}!
            </span> -->
          </h2>

          <p class="text-justify">
            Welcome to SoloConnect! Your trusted companion for navigating life as a solo parent.
            SoloConnect is a mobile app designed to make accessing essential services and aid
            programs simple and stress-free. With its user-friendly design, SoloConnect empowers you
            to quickly and efficiently find the support you need—anytime, anywhere. Thank you for
            letting us be part of your journey. Together, we’re building a stronger, more connected
            community for solo parents.
          </p>
        </v-col>

      </v-row>
    </v-card-text>
  </v-card>
</template>
