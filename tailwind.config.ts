import type { Config } from 'tailwindcss';

export default <Config>{
  content: [
    "./app.vue",
    "./pages/**/*.vue",
    "./components/**/*.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
