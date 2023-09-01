import enquirer from "enquirer";
import fs from "fs";
import sqlite3 from "sqlite3";
import minimist from "minimist";

function main() {
  const args = minimist(process.argv);

  if (args.l) {
    index();
  } else {
    save();
  }
}

//* Controller *//
async function index() {
  const db = new sqlite3.Database("memos.db");
  const select = "SELECT * FROM memos";

  try {
    const memos = await all(db, select);
    memos.forEach((memo) => render(memo.content));
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

async function save() {
  const db = new sqlite3.Database("memos.db");
  const stdin = fs.readFileSync("/dev/stdin", "utf8");

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

//* View *//
function render(content) {
  console.log(content.split(`\n`)[0].trim());
}

//* SQL functions *//
function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      err ? reject(err) : resolve(this.lastID);
    });
  });
}

function all(db, sql, params = {}) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      err ? reject(err) : resolve(rows);
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
