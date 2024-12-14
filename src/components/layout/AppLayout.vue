<script setup>
import BottomNavigation from './navigation/BottomNavigation.vue';
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'
import ProfileHeader from '@/components/layout/ProfileHeader.vue'
import { useAuthUserStore } from '@/stores/authUser';

const props = defineProps(['isWithAppBarNavIcon'])
const emit = defineEmits(['isDrawerVisible', 'theme'])

// Utilize pre-defined vue functions
const { xs, sm, mobile } = useDisplay()

// Use Pinia Store
const authStore = useAuthUserStore()

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
  isLoggedIn.value = await authStore.isAuthenticated()

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
      <v-app-bar
        class="px-3"
        :color="theme === 'light' ? 'amber-lighten-1' : 'yellow-darken-3'"
        border
      >
        <v-app-bar-nav-icon
          v-if="props.isWithAppBarNavIcon"
          icon="mdi-menu"
          :theme="theme"
          @click="emit('isDrawerVisible')"
        >
        </v-app-bar-nav-icon>

        <v-app-bar-title>
          <v-img src="/images/lb-icon.jpg" :width="xs ? '100%' : sm ? '40%' : '14%'"></v-img>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn
          class="me-2"
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          slim
          @click="onToggleTheme"
        ></v-btn>

        <ProfileHeader v-if="isLoggedIn"></ProfileHeader>
      </v-app-bar>

      <slot name="navigation"></slot>

      <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-main>
          <slot name="content"></slot>
        </v-main>

        <v-footer
          v-if="!isMobileLogged || isDesktop"
          class="font-weight-bold"
          :class="mobile ? 'text-caption' : ''"
          :color="theme === 'light' ? 'amber-lighten-1' : 'yellow-darken-3'"
          border
          app
        >
          <div :class="mobile ? 'w-100 text-center' : ''">
            Copyright @ 2024 - SoloConnect | All Rights Reserved
          </div>
        </v-footer>
        <BottomNavigation v-else-if="isMobileLogged" :theme="theme"></BottomNavigation>
      </v-parallax>

    </v-app>
  </v-responsive>
</template>

<!-- <v-responsive>
    <v-app :theme="theme">
      <v-app-bar class="px-3" :color="theme === 'light' ? 'amber-lighten-1' : 'yellow-darken-3'">
        <v-spacer></v-spacer>

        <v-app-bar-nav-icon
          v-if="props.isWithAppBarNavIcon"
          icon="mdi-menu"
          :theme="theme"
          @click="emit('isDrawerVisible')"
        >
        </v-app-bar-nav-icon>

        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          slim
          @click="onToggleTheme"
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
  </v-responsive> -->
