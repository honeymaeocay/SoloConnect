<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

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

const submitForm = () => {
  console.log('Document Name:', doc_name.value)
  console.log('File Name:', doc_file.value)
  if (doc_name.value && file.value) {
    submitted.value = true
    closeForm()
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
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <template #content>
      <div>
        <h2 class="text-center">Solo Parent Requirements</h2>
        <div class="d-flex flex-wrap ga-5 mt-5">
          <div
            v-for="type in memberTypes"
            :key="type"
            class="pa-4 border-sm rounded bg-yellow text-center elevation-10"
          >
            <h3 class="mb-10">{{ type }}</h3>
            <button @click="openForm(type)" class="py-3 px-4 bg-blue rounded cursor-pointer">
              Click to Upload Requirements
            </button>
          </div>
        </div>

        <div v-if="showForm" class="modal">
          <div class="modal-content">
            <h3>Upload Requirement for: {{ selectedMemberType }}</h3>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="docName">Document Name</label>
                <input
                  type="text"
                  id="docName"
                  v-model="doc_name"
                  placeholder="Enter document name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="docFile">Document File</label>
                <input type="file" id="docFile" @change="handleFileUpload" required />
              </div>
              <div class="form-buttons">
                <button type="submit" class="btn-submit">Submit</button>
                <button type="button" class="btn-close" @click="closeForm">Close</button>
              </div>
            </form>
          </div>
        </div>

        <div v-if="submitted" class="uploaded-doc">
          <h3>Uploaded Document</h3>
          <p><strong>Member Type:</strong> {{ selectedMemberType }}</p>
          <p><strong>Name:</strong> {{ doc_name || 'No name provided' }}</p>
          <p><strong>File:</strong> {{ doc_file || 'No file uploaded' }}</p>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.form-buttons button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit {
  background-color: #4caf50;
  color: white;
}

.btn-close {
  background-color: #f44336;
  color: white;
}

.uploaded-doc {
  margin-top: 20px;
}

.uploaded-doc p {
  margin: 5px 0;
}
</style>
