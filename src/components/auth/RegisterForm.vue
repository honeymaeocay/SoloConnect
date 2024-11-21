<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field label="Firstname" variant="outlined"></v-text-field>

    <v-text-field label="Lastname" variant="outlined"></v-text-field>

    <v-text-field label="Address" variant="outlined"></v-text-field>

    <v-text-field label="Email Address" variant="outlined"></v-text-field>

    <v-text-field label="Password" variant="outlined" type="password"></v-text-field>

    <v-text-field label="Password Confirmation" variant="outlined" type="password"></v-text-field>

    <v-btn class="mt-2" type="submit" block color="warning" prepend-icon="mdi-account-plus"
      >Register</v-btn
    >
  </v-form>
</template>
