<script setup>
import { ref, defineEmits } from 'vue';
import { uploadFileToCloudinary } from '../services/uploadService';
// Define emitted events
const emit = defineEmits(['updateImageUrl']);
// Reactive references for image URL and file input
const imageUrl = ref('');
const fileInput = ref(null);
// Function to trigger file input dialog
function triggerFileInput() {
  fileInput.value?.click();
}
// Custom image upload handler
async function handleFileUpload(event) {
  const file = event.target.files[0]; // Get the selected file
  if (!file) {
    alert('Please select a file to upload.');
    return;
  }
  try {
    const url = await uploadFileToCloudinary(file);
    imageUrl.value = url; // Set the returned image URL
    emit('updateImageUrl', url); // Notify parent component of the updated URL
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Failed to upload image. Please try again.');
  }
}
</script>
<template>
  <div>
    <label for="src" class="block text-sm font-semibold text-gray-700">Image URL</label>
    <div class="flex items-center">
      <!-- Editable input field for pasting or displaying the image URL -->
      <input 
        id="src" 
        v-model="imageUrl" 
        type="text" 
        placeholder="Paste an image URL or upload" 
        class="w-full border-2 border-gray-300 rounded-lg p-3 text-sm" 
        @input="emit('updateImageUrl', imageUrl)"
      />
      <!-- Upload button to trigger file input -->
      <button 
        type="button" 
        @click="triggerFileInput" 
        class="ml-4 px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition">
        Upload
      </button>
    </div>
    <!-- Hidden file input -->
    <input 
      id="fileInput" 
      type="file" 
      class="hidden" 
      accept="image/*" 
      ref="fileInput" 
      @change="handleFileUpload" 
    />
  </div>
</template>