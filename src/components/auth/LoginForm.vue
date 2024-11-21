<template>
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

    <v-btn class="mt-2" type="submit" block color="warning" prepend-icon="mdi-login">Login</v-btn>
  </v-form>
</template>
