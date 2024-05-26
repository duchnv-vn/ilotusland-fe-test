import { SupabaseClientOptions, createClient } from '@supabase/supabase-js';
import { SUPABASE_API_KEY, SUPABASE_PROJECT_URL } from '@/config/env';
import { Database } from 'database.types';
import { TableNames } from './types/db.type';

const getSupabase = (access_token: string) => {
  const options: SupabaseClientOptions<'public'> = {};

  if (access_token) {
    options.global = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
  }

  const supabase = createClient<Database>(
    SUPABASE_PROJECT_URL,
    SUPABASE_API_KEY,
    options,
  );

  return supabase;
};

const getDb = (access_token: string, tableName: TableNames) => {
  return getSupabase(access_token).from(tableName);
};

export { getSupabase, getDb };
