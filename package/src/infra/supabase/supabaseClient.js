import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = String(SUPABASE_URL ?? "").trim();
const supabaseKey = String(SUPABASE_KEY ?? "").trim();

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase env config: SUPABASE_URL and/or SUPABASE_KEY.");
}

if (!/^https?:\/\//i.test(supabaseUrl)) {
    throw new Error("Invalid SUPABASE_URL format. Expected a full URL.");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        storage: AsyncStorage,
        autoRefreshToken: true,
        detectSessionInUrl: false,
    },
})
