<!-- src/components/SignatureForm.vue -->
<template>
  <div>
    <h2>Create Your Signature</h2>
    <form @submit.prevent="submitSignature">
      <div>
        <label>Full Name:</label>
        <input v-model="userData.fullName" required />
      </div>
      <div>
        <label>Email:</label>
        <input v-model="userData.email" type="email" required />
      </div>
      <div>
        <label>Phone:</label>
        <input v-model="userData.phone" type="tel" />
      </div>
      <div>
        <label>Logo URL:</label>
        <input v-model="userData.logo" type="url" />
      </div>
      <div>
        <label>Select Template:</label>
        <select v-model="selectedTemplateId" required>
          <option v-for="template in templates" :key="template.id" :value="template.id">
            {{ template.name }}
          </option>
        </select>
      </div>
      <button type="submit">Generate Signature</button>
    </form>
    <div v-if="signature.html">
      <h3>HTML Signature Preview</h3>
      <div v-html="signature.html"></div>
      <h3>Plain Text Version</h3>
      <pre>{{ signature.plainText }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'SignatureForm',
  setup() {
    const userData = ref({ fullName: '', email: '', phone: '', logo: '' });
    const selectedTemplateId = ref('template1');
    const templates = ref<{ id: string; name: string }[]>([]);
    const signature = ref({ html: '', plainText: '' });

    onMounted(async () => {
      const res = await axios.get('/api/templates');
      templates.value = res.data;
    });

    const submitSignature = async () => {
      try {
        const res = await axios.post('/api/generate-signature', {
          templateId: selectedTemplateId.value,
          userData: userData.value,
        });

        signature.value.html = res.data.htmlSignature;
        signature.value.plainText = res.data.plainTextSignature;
      } catch (error) {
        console.error('Error generating signature:', error);
      }
    };

    return { userData, selectedTemplateId, templates, signature, submitSignature };
  },
});
</script>
