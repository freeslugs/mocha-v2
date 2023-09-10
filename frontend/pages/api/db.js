// db.js
import { Pool } from "pg";

let conn;

if (!conn) {
  conn = new Pool({
    host: 'db.riikozdctnkhklhbqgwz.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'PW5CKiRn7gYEYru3',
  });


}

export default conn ;