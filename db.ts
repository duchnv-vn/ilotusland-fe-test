import postgres from 'postgres';
import { DATABASE_SESSION_MODE_URL } from '@/config/env';

const sql = postgres(DATABASE_SESSION_MODE_URL);

export default sql;
