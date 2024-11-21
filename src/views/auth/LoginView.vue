<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto pt-16">
          <v-card class="mx-auto" elevation="24">
            <v-card-title class="text-center">
              <v-img
                class="mx-auto"
                src="/images/lb-icon.jpg"
                :width="mobile ? '75%' : '25%'"
              ></v-img>
              <h3 class="font-weight-black">SoloConnect</h3>
              <p>Login Form</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider class="my-5"></v-divider>
              <v-form fast-fail @submit.prevent>
                <v-text-field
                  label="Email"
                  variant="outlined"
                  prepend-inner-icon="mdi-email-outline"
                ></v-text-field>

                <v-text-field
                  label="Password"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                ></v-text-field>

                <v-btn class="mt-2" type="submit" block color="warning" prepend-icon="mdi-login"
                  >Login</v-btn
                >
              </v-form>

              <v-divider class="my-5"></v-divider>

              <h5 class="text-center">
                Don't Have account?
                <RouterLink class="text-primary" to="/register">Click here to Register</RouterLink>
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template></AppLayout
  >
</template>
