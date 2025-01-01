<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

// Utilize pre-defined Vue functions
const { mobile } = useDisplay()

// Load Variables
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
      <div class="about-container mx-16">
        <header class="text-center py-5 bg-primary text-white rounded border-md shadow-lg">
          <h1>SoloConnect</h1>
        </header>
        <div class="content mt-5">
          <div class="d-flex justify-center mb-4 bg-surface-variant rounded-t-lg shadow-lg">
            <img src="/src/assets/Cityhall.jpg" alt="Building" class="w-75 rounded-lg shadow-lg" />
          </div>
          <h2 class="text-center mt-4 text-white bg-orange-darken-2 py-3 rounded-lg shadow-md">
            Welcome To the SoloConnect's Portal !!!
          </h2>

          <div class="mission-vision mx-5 my-5">
            <v-container>
              <v-row>
                <!-- Mission Card -->
                <v-col cols="12" md="6">
                  <v-hover>
                    <template #default="{ isHovering, props }">
                      <v-card
                        class="mx-auto my-3 hover-card"
                        max-width="1000"
                        v-bind="props"
                        :color="isHovering ? 'orange lighten-2' : 'white'"
                        elevation="5"
                      >
                        <v-card-text class="text-center text-h6">
                          <h3 class="text-grey-darken-3">Mission</h3>
                          <p class="text-grey-darken-2">
                            To lead in the formation, implementation, and coordination of social
                            welfare and development policies and programs for and with the poor,
                            vulnerable and disadvantaged.
                          </p>
                        </v-card-text>
                      </v-card>
                    </template>
                  </v-hover>
                </v-col>

                <!-- Vision Card -->
                <v-col cols="12" md="6">
                  <v-hover>
                    <template #default="{ isHovering, props }">
                      <v-card
                        class="mx-auto my-3 hover-card"
                        max-width="1000"
                        v-bind="props"
                        :color="isHovering ? 'orange lighten-2' : 'white'"
                        elevation="5"
                      >
                        <v-card-text class="text-center text-h6">
                          <h3 class="text-grey-darken-3">Vision</h3>
                          <p class="text-grey-darken-2">
                            The Department of Social Welfare and Development envisions all Filipinos
                            free from hunger and poverty, have equal access to opportunities,
                            enabled by a fair, just and peaceful society.
                          </p>
                        </v-card-text>
                      </v-card>
                    </template>
                  </v-hover>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

v<style scoped>
.about-container {
  font-family: 'Roboto', sans-serif;
}

header {
  background-color: #1976d2;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  background-color: #ff9800;
  color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mission-vision {
  margin-top: 2rem;
}

.v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.hover-card {
  border-radius: 8px;
}

img {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
