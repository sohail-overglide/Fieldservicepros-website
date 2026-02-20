import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "fieldservicepro.db");

declare global {
  // eslint-disable-next-line no-var
  var __db: Database.Database | undefined;
}

function initDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS client_portal (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      company_name TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS candidates_portal (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const seedAdmins = [
    { username: "sohailfigma@gmail.com", password: "sohail@123" },
    { username: "admin@123", password: "Mandy&Angela" },
  ];

  const insertAdmin = db.prepare(
    "INSERT OR IGNORE INTO admin_users (username, password_hash) VALUES (?, ?)"
  );

  for (const { username, password } of seedAdmins) {
    const hash = bcrypt.hashSync(password, 10);
    insertAdmin.run(username, hash);
  }
}

export function getDb(): Database.Database {
  if (!global.__db) {
    global.__db = new Database(DB_PATH);
    global.__db.pragma("journal_mode = WAL");
    initDb(global.__db);
  }
  return global.__db;
}

export const JWT_SECRET = new TextEncoder().encode(
  "fieldservice-admin-jwt-secret-2024"
);
