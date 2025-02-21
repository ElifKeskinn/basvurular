import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const supabase = createClient(
    config.public.VITE_SUPABASE_URL,
    config.public.VITE_SUPABASE_ANON_KEY
  );

  return {
    provide: {
      supabase
    }
  };
});
