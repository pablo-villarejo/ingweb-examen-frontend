<script setup>
import { ref } from 'vue';
import ImageInput from './ImageInput.vue';
// Reactive reference for the image URL
const moviePosterUrl = ref('');
// Function to handle the updated image URL from the child component
function handleUpdateImageUrl(url) {
  moviePosterUrl.value = url;
  console.log('Movie poster URL updated:', url);
}
// Function to handle the form submission
function saveMovie() {
  console.log('Saving movie... TODO implement this function');
  console.log('Movie poster URL submitted:', moviePosterUrl.value);
  console.log('Movie saved successfully!');
}
</script>
<template>
  <form @submit.prevent="saveMovie" class="space-y-6 p-6 border rounded-lg shadow-lg">
    <ImageInput @updateImageUrl="handleUpdateImageUrl" />
    <button 
      type="submit" 
      class="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition">
      Save
    </button>
  </form>
</template>