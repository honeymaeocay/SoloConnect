<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="yellow-darken-2">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-main>
          <v-container>
            <v-row>
              <v-col cols="12" md="6" class="mx-auto">
                <v-card
                  class="mx-auto"
                  prepend-icon="mdi-account-plus"
                  subtitle="Register"
                  elevation="24"
                >
                  <template v-slot:title>
                    <span class="font-weight-black">SoloConnect</span>
                  </template>

                  <v-card-text class="bg-surface-light pt-4">
                    <v-form fast-fail @submit.prevent>
                      <v-text-field label="Firstname" variant="outlined"></v-text-field>

                      <v-text-field label="Lastname" variant="outlined"></v-text-field>

                      <v-text-field label="Address" variant="outlined"></v-text-field>

                      <v-text-field label="Email" variant="outlined"></v-text-field>

                      <v-text-field
                        label="Password"
                        variant="outlined"
                        type="password"
                      ></v-text-field>

                      <v-text-field
                        label="Password Confirmation"
                        variant="outlined"
                        type="password"
                      ></v-text-field>

                      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
                    </v-form>

                    <v-divider class="my-5"></v-divider>

                    <h5 class="text-center">
                      Already Have account?
                      <RouterLink class="text-primary" to="/">Click here to Login</RouterLink>
                    </h5>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
        <v-footer color="yellow-darken-2" border app>2024 - SoloConnect</v-footer>
      </v-parallax>
    </v-app>
  </v-responsive>
</template>
