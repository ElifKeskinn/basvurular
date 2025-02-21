<template>
    <div class="container">
      <h1> Üye Adayları</h1>

      <div v-if="loading" class="loading">⏳ Veriler Yükleniyor...</div>
      <div v-else-if="error" class="error">❌ Hata: {{ error }}</div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>İsim</th>
              <th>LinkedIn</th>
              <th>Yaş</th>
              <th>Üniversite</th>
              <th>Bölüm</th>
              <th>Sınıf</th>
              <th>Başvuru Tarihi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <a :href="item.linkedin" target="_blank">Profil</a>
              </td>
              <td>{{ item.age }}</td>
              <td>{{ item.university }}</td>
              <td>{{ item.department }}</td>
              <td>{{ item.grade }}</td>
              <td>{{ formatDate(item.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { $supabase } = useNuxtApp();

const data = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    const { data: memberData, error: fetchError } = await $supabase
      .from('memberCandidates')
      .select('id, name, linkedin, age, university, department, grade, created_at');

    if (fetchError) throw fetchError;
    data.value = memberData;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const formatDate = (timestamp) => {
  return new Date(timestamp).toISOString().split('T')[0];
};

onMounted(fetchData);
</script>
