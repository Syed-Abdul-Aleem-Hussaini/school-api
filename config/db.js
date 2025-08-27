import { Pool } from 'pg';
import dotenv from "dotenv";
dotenv.config();



const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false } // needed for Render
});

export const query = (text, params) => pool.query(text, params);

export default pool;
