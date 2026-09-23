import { createClient } from '@supabase/supabase-js';
import { ENV } from './env';

// Verificação de segurança
if (!ENV.SUPABASE_URL || !ENV.SUPABASE_URL.startsWith('http')) {
  console.error("🚨 ERRO GRAVE: A URL do Supabase no env.ts está vazia ou não começa com https:// !");
}

if (!ENV.SUPABASE_ANON_KEY || ENV.SUPABASE_ANON_KEY.includes('COLA_AQUI')) {
  console.error("🚨 ERRO GRAVE: Esqueceste-te de substituir a chave anónima no env.ts!");
}

export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);