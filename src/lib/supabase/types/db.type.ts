import { Database } from 'database.types';

export type TableNames = keyof Database['public']['Tables'];
