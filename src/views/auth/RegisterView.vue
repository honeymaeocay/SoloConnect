<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6" class="mx-auto">
            <v-card class="mx-auto" elevation="24">
              <v-card-title class="text-center">
                <v-img
                  class="mx-auto"
                  src="/images/lb-icon.jpg"
                  :width="mobile ? '75%' : '25%'"
                ></v-img>
                <h3 class="font-weight-black">SoloConnect</h3>
                <p>Registration Form</p>
              </v-card-title>

              <v-card-text class="bg-surface-light pt-4">
                <v-divider class="my-5"></v-divider>

                <RegisterForm></RegisterForm>

                <v-divider class="my-5"></v-divider>

                <h5 class="text-center">
                  Already Have account?
                  <RouterLink class="text-amber-lighten-1" to="/">Click here to Login</RouterLink>
                </h5>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
