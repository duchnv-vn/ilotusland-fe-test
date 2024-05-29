import postgres from 'postgres';
import { DB_SESSION_MODE_URL } from '@/config/env';

const sql = postgres(DB_SESSION_MODE_URL);

export default sql;
