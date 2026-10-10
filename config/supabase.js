const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Peringatan: SUPABASE_URL atau SUPABASE_ANON_KEY belum diatur di environment variable.');
}

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

module.exports = supabase;
