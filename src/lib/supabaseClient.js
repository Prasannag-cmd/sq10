/* ============================================================
   SUPABASE CLIENT — Shared Supabase instance
   ============================================================ */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hgkwzltxliggqrrzvxzn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GvSxajxWMIZenNvVoABuwg_8aQh0rn8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
