export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false }, // Devtools kapatıldı, istersen açabilirsin

  runtimeConfig: {
    public: {
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY
    }
  },

  css: ["@/styles/global.css"], // Tailwind CSS için gerekli

  modules: ["@nuxt/devtools"], // Eğer devtools kullanıyorsan ekle

  pages: true,
});
