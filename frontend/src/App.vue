<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>Email Signature Generator</h1>
    <SignatureForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignatureForm from './components/SignatureForm.vue';

export default defineComponent({
  name: 'App',
  components: {
    SignatureForm,
  },
});
</script>
