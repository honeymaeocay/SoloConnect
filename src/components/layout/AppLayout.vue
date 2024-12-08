<script setup>
import { isAuthenticated } from '@/utils/supabase'
import ProfileHeader from './ProfileHeader.vue'
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps(['isWithAppBarNavIcon'])

const emit = defineEmits(['isDrawerVisible', 'theme'])

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

// Load Variables
const isLoggedIn = ref(false)
const isMobileLogged = ref(false)
const isDesktop = ref(false)
const theme = ref(localStorage.getItem('theme') ?? 'light')

//  Toggle Theme
function onToggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  emit('theme', theme.value)
}

// Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()

  isMobileLogged.value = mobile.value && isLoggedIn.value
  isDesktop.value = !mobile.value && (isLoggedIn.value || !isLoggedIn.value)
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
})
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

        <ProfileHeader v-if="isLoggedIn"></ProfileHeader>
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
