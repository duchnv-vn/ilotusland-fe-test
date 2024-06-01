import { Database } from './database.type';

export type TableNames = keyof Database['public']['Tables'];
