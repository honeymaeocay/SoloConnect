<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import { useDisplay } from 'vuetify'
import { createClient } from '@supabase/supabase-js'

const { mobile } = useDisplay()

const supabaseUrl = 'https://nlonihutiayrrvrzhovn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sb25paHV0aWF5cnJ2cnpob3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0ODE4ODcsImV4cCI6MjA0NzA1Nzg4N30.1nBbAvPIim88YnquklD5PxhXn_87MoPcTWOIX5SYFFg'
const supabase = createClient(supabaseUrl, supabaseKey)

const isDrawerVisible = ref(mobile.value ? false : true)
const memberTypes = ref([
  'Death of spouse',
  'Birth from rape',
  'Detained or imprisoned spouse',
  'Spousal incapacity',
  'Legal separation',
  'Annulment or divorce',
])
const selectedMemberType = ref('')
const showForm = ref(false)
const doc_name = ref('')
const file = ref(null)
const doc_file = ref('')
const submitted = ref(false)
const history = ref([])

const openForm = (type) => {
  selectedMemberType.value = type
  showForm.value = true
}

const handleFileUpload = (event) => {
  if (event.target.files && event.target.files.length > 0) {
    file.value = event.target.files[0]
    doc_file.value = file.value.name
    console.log('File Object:', file.value)
    console.log('File Name:', doc_file.value)
  } else {
    console.log('No file selected')
    file.value = null
    doc_file.value = ''
  }
}

const submitForm = async () => {
  console.log('Document Name:', doc_name.value)
  console.log('File Name:', doc_file.value)
  if (doc_name.value && file.value) {
    const { data, error } = await supabase.storage
      .from('documents') // Ensure this is the correct bucket name
      .upload(`documents/${file.value.name}`, file.value)

    if (error) {
      console.error('Error uploading file:', error.message)
      alert(`Error uploading file: ${error.message}`)
      return
    }

    console.log('File uploaded:', data)
    history.value.push({
      memberType: selectedMemberType.value,
      docName: doc_name.value,
      fileName: doc_file.value,
      timestamp: new Date().toLocaleString()
    })
    submitted.value = true
    showForm.value = false
  } else {
    alert('Please fill out all fields.')
  }
}

const closeForm = () => {
  showForm.value = false
  doc_name.value = ''
  file.value = null
  doc_file.value = ''
}
</script>
<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <!-- Side Navigation -->
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <!-- Content -->
    <template #content>
      <v-container>
        <!-- Header Section -->
        <v-row>
          <v-col cols="12">
            <h2 class="text-center my-5 font-weight-bold" style="color: #333652;">
              🌟 Solo Parent Requirements 🌟
            </h2>
          </v-col>
        </v-row>

        <!-- Member Type Cards -->
        <v-row>
          <v-col
            v-for="type in memberTypes"
            :key="type"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="d-flex justify-center mb-4"
          >
            <v-card
              class="pa-4 text-center"
              elevation="10"
              style="background: linear-gradient(145deg, #f3f4f6, #ffffff); border-radius: 16px; box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);"
            >
              <v-card-title class="headline font-weight-bold" style="color: #3F51B5;">
                {{ type }}
              </v-card-title>
              <v-card-text>
                <span style="color: #607D8B;">
                  Upload the necessary documents for {{ type }}.
                </span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="openForm(type)"
                  color="orange"
                  class="mx-auto"
                  block
                  style="border-radius: 24px; font-weight: bold; text-transform: capitalize;"
                >
                  Upload Requirements
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Upload Dialog -->
        <v-dialog v-model="showForm" max-width="500px">
          <v-card
            style="background: linear-gradient(to right, #e3f2fd, #f9fbe7); border-radius: 16px;"
          >
            <v-card-title class="headline font-weight-bold">
              Upload Requirement for: {{ selectedMemberType }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form ref="refVForm" @submit.prevent="submitForm">
                <v-text-field
                  v-model="doc_name"
                  label="Document Name"
                  outlined
                  color="primary"
                  required
                ></v-text-field>
                <v-file-input
                  @change="handleFileUpload"
                  label="Document File"
                  accept="image/*, .pdf"
                  outlined
                  color="primary"
                  required
                ></v-file-input>
                <v-card-actions class="d-flex justify-end">
                  <v-btn color="green darken-1" text @click="submitForm" style="font-weight: bold;">
                    Submit
                  </v-btn>
                  <v-btn color="red darken-1" text @click="closeForm" style="font-weight: bold;">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- Success Message -->
        <v-row v-if="submitted" class="mt-5">
          <v-col cols="12">
            <v-alert
              type="success"
              border="left"
              elevation="2"
              dismissible
              style="background: #e8f5e9; border-left: 5px solid #4CAF50;"
            >
              <h3 style="color: #388E3C;">Document Uploaded Successfully</h3>
              <p><strong>Member Type:</strong> {{ selectedMemberType }}</p>
              <p><strong>Document Name:</strong> {{ doc_name || 'No name provided' }}</p>
              <p><strong>File:</strong> {{ doc_file || 'No file uploaded' }}</p>
            </v-alert>
          </v-col>
        </v-row>

        <!-- Upload History -->
        <v-row class="mt-5">
          <v-col cols="12">
            <h3 class="text-center font-weight-bold" style="color: #3F51B5;">
              📂 Upload History 📂
            </h3>
            <v-divider class="my-4"></v-divider>
            <v-list two-line dense>
              <v-list-item
                v-for="(item, index) in history"
                :key="index"
                class="mt-3"
                style="background: #f3f4f6; border-radius: 8px; margin-bottom: 10px;"
              >
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium" style="color: #3F51B5;">
                    <strong>Member Type:</strong> {{ item.memberType }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <strong>Document Name:</strong> {{ item.docName }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <strong>File Name:</strong> {{ item.fileName }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <strong>Uploaded At:</strong> {{ item.timestamp }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>


<style scoped>
.text-center {
  text-align: center;
}
.my-5 {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
</style>
