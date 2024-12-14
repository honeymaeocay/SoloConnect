<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import { ref } from 'vue'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import { useRouter } from 'vue-router'

// Load pre-defined vue functions
const router = useRouter()

//Load VARIABLES
const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
}
const formData = ref({
  ...formDataDefault,
})
const formAction = ref({
  ...formActionDefault,
})

const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)
const refVForm = ref()

//Register Functionality
const onSubmit = async () => {
  // Reset Form Action utils
  formAction.value = { ...formActionDefault }
  //Turn on processing
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lasname: formData.value.lastname,
        email: formData.value.email
        // is_admin: true, //Just turn to true if admin account
        //role: 'Admin' // if role based
      },
    },
  })

  if (error) {
    // console.log(error)

    // Add error message and status code
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    // console.log(data)

    // Add success message
    formAction.value.formSuccessMessage = 'Successfully Registered Account'
    // Add here more actions
    router.replace('/login')
  }

  // Reset form
  refVForm.value?.reset()
  // formData.value = { ...formDataDefault }

  // Turn off processing
  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>

  <v-form class="mt-5" ref="refVForm" fast-fail @submit.prevent="onFormSubmit">
    <v-text-field
      v-model="formData.firstname"
      label="Firstname"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.lastname"
      label="Lastname"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.email"
      label="Email"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.password"
      prepend-inner-icon="mdi-lock"
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      :rules="[requiredValidator, passwordValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.password_confirmation"
      prepend-inner-icon="mdi-lock"
      label="Password Confirmation"
      :type="isPasswordConfirmVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
      :rules="[
        requiredValidator,
        confirmedValidator(formData.password_confirmation, formData.password),
      ]"
    ></v-text-field>

    <v-btn
      class="mt-2"
      type="submit"
      block
      color="warning"
      prepend-icon="mdi-account-plus"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
      >Register</v-btn
    >
  </v-form>
</template>
