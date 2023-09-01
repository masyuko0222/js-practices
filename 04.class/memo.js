import pkg from "enquire";
import fs from "fs";
import sqlite3 from "sqlite3";
import minimist from "minimist";

const enquire = pkg;

function main() {
  save();
}

async function save() {
  const db = new sqlite3.Database("memos.db");
  const stdin = fs.readFileSync("/dev/stdin", "utf8");

  // SQL
  const createTable =
    "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)";
  const insertMemo = "INSERT INTO memos(content) values(?)";

  try {
    await run(db, createTable);
    await run(db, insertMemo, [stdin]);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    } else {
      throw err;
    }
  } finally {
    await close(db);
  }
}

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      err ? reject(err) : resolve(this.lastID);
    });
  });
}

function close(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      err ? reject(err) : resolve();
    });
  });
}

main();
