<script setup>
const props = defineProps(['formAction.formSucessMessage', 'formAction.formErrorMessage'])
</script>

<template>
  <v-alert
    v-if="props.formSucessMessage"
    :text="props.formSucessMessage"
    title="Success!"
    type="success"
    variant="tonal"
    density="compact"
    border="start"
    closable
  ></v-alert>
  <v-alert
    v-if="props.formErrorMessage"
    :text="props.formErrorMessage"
    title="Ooops!"
    type="error"
    variant="tonal"
    density="compact"
    border="start"
    closable
  ></v-alert>
</template>
