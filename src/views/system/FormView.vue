<script setup>
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'

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
  if (!doc_name.value || !file.value) {
    alert('Please fill out all fields.')
    return
  }

  // Upload the file to Supabase storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('documents') // Ensure this is the correct bucket name
    .upload(`${file.value.name}`, file.value)

  if (uploadError) {
    console.error('Error uploading file:', uploadError.message)
    alert(`Error uploading file: ${uploadError.message}`)
    return
  }

  console.log('File uploaded:', uploadData)

  // Insert data into the forms table
  const { data: data1, error: error1 } = await supabase
    .from('forms')
    .insert([
      { doc_name: doc_name.value, doc_file: uploadData.path, member_type: selectedMemberType.value }
    ])
    .select()

  if (error1) {
    console.error('Error inserting data into forms table:', error1.message)
    alert(`Error inserting data into forms table: ${error1.message}`)
    return
  }

  console.log('Data inserted successfully into forms table:', data1)

  // Retrieve the authenticated user's ID
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.error('Error getting user:', userError.message)
    alert(`Error getting user: ${userError.message}`)
    return
  }
  const userId = userData.user.id

  // Insert data into the documents table with user_id
  const { data: data2, error: error2 } = await supabase
    .from('documents') // Replace with your actual second table name
    .insert([
      { doc_name: doc_name.value, doc_file: uploadData.path, member_type: selectedMemberType.value, user_id: userId }
    ])
    .select()

  if (error2) {
    console.error('Error inserting data into documents table:', error2.message)
    alert(`Error inserting data into documents table: ${error2.message}`)
    return
  }

  console.log('Data inserted successfully into documents table:', data2)

  // Add to history
  history.value.push({
    memberType: selectedMemberType.value,
    docName: doc_name.value,
    fileName: file.value.name,
    timestamp: new Date().toLocaleString()
  })

  // Reset form fields
  doc_name.value = ''
  file.value = null
  doc_file.value = ''
  submitted.value = true
  showForm.value = false
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
              <!-- <p><strong>Member Type:</strong> {{ selectedMemberType }}</p>
              <p><strong>Document Name:</strong> {{ doc_name || 'No name provided' }}</p>
              <p><strong>File:</strong> {{ doc_file || 'No file uploaded' }}</p> -->
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
