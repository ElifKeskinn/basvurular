<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-blue-600 mb-6 text-center">Üye Adayları</h1>
  
      <div v-if="loading" class="text-gray-500 text-center">⏳ Yükleniyor...</div>
      <div v-else-if="error" class="text-red-500 text-center">❌ Hata: {{ error }}</div>
  
      <div class="overflow-x-auto shadow-lg rounded-lg">
        <table class="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead class="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th class="border border-gray-300 px-6 py-3 text-left">ID</th>
              <th class="border border-gray-300 px-6 py-3 text-left">İsim</th>
              <th class="border border-gray-300 px-6 py-3 text-left">LinkedIn</th>
              <th class="border border-gray-300 px-6 py-3 text-left">Yaş</th>
              <th class="border border-gray-300 px-6 py-3 text-left">Üniversite</th>
              <th class="border border-gray-300 px-6 py-3 text-left">Bölüm</th>
              <th class="border border-gray-300 px-6 py-3 text-left">Sınıf</th>
              <th class="border border-gray-300 px-6 py-3 text-left">Başvuru Tarihi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id" class="bg-white even:bg-gray-100 hover:bg-blue-100 transition">
              <td class="border border-gray-300 px-6 py-4 font-medium text-gray-700">{{ item.id }}</td>
              <td class="border border-gray-300 px-6 py-4">{{ item.name }}</td>
              <td class="border border-gray-300 px-6 py-4">
                <a :href="item.linkedin" target="_blank" class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                  ➡ Profil
                </a>
              </td>
              <td class="border border-gray-300 px-6 py-4">{{ item.age }}</td>
              <td class="border border-gray-300 px-6 py-4">{{ item.university }}</td>
              <td class="border border-gray-300 px-6 py-4">{{ item.department }}</td>
              <td class="border border-gray-300 px-6 py-4">{{ item.grade }}</td>
              <td class="border border-gray-300 px-6 py-4 text-gray-500">{{ formatDate(item.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
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
  
  // Tarihi sadece "YYYY-MM-DD" formatında göster
  const formatDate = (timestamp) => {
    return new Date(timestamp).toISOString().split('T')[0];
  };
  
  onMounted(fetchData);
  </script>
  