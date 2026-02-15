// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pltyyjymvsvfpzohjvbf.supabase.co';
const supabaseAnonKey = 'sb_publishable_SjSzauXbY6JWijbD3zZSqA_sVU1XqAb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
