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
        <header class="text-center py-3 bg-primary text-black rounded border-md">
          <h1>SoloConnect</h1>
        </header>
        <div class="content mt-3">
          <div class="d-flex justify-center mb-0 bg-surface-variant rounded-t-lg">
            <img src="/src/assets/Cityhall.jpg" alt="Building" class="w-50" />
          </div>
          <h2 class="text-center mt-0 text-black bg-orange border-lg rounded-b-lg">
            Welcome To the SoloConnect's Portal !!!
          </h2>

          <div class="mission-vision mx-5 my-auto">
            <v-container>
              <!-- Mission Card -->
              <div class="col-md-6">
                <v-hover>
                  <template #default="{ isHovering, props }">
                    <v-card
                      class="mx-auto my-3"
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
              </div>
            </v-container>

            <!-- Vision Card -->
            <div class="col-md-6">
              <v-hover>
                <template #default="{ isHovering, props }">
                  <v-card
                    class="mx-auto my-3"
                    max-width="1000"
                    v-bind="props"
                    :color="isHovering ? 'orange lighten-2' : 'white'"
                    elevation="5"
                  >
                    <v-card-text class="text-center text-h6">
                      <h3 class="text-grey-darken-3">Vision</h3>
                      <p class="text-grey-darken-2">
                        The Department of Social Welfare and Development envisions all Filipinos
                        free from hunger and poverty, have equal access to opportunities, enabled by
                        a fair, just and peaceful society.
                      </p>
                    </v-card-text>
                  </v-card>
                </template>
              </v-hover>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<style scoped>
.about-container {
  font-family: Arial, sans-serif;
}
</style>
