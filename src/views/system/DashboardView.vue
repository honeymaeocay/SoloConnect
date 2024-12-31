<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import WelcomeWidget from '@/components/system/dashboard/WelcomeWidget.vue'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

const isDrawerVisible = ref(mobile.value ? false : true)
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>
    <template #content>
      <v-container fluid>
        <v-col cols="12" :md="isSuperAdmin ? 7 : false">
          <WelcomeWidget :theme="theme"></WelcomeWidget>
        </v-col>
      </v-container>
    </template>
  </AppLayout>
</template>
