#! /usr/bin/env node

import fs from "fs";
import minimist from "minimist";
import sqlite3 from "sqlite3";

const DB = "memos.db";

async function main() {
  const options = minimist(process.argv);
  const db = new sqlite3.Database(DB);

  if (options.l) {
    index(db);
  } else {
    const memo = newMemo();
    save(db, memo);
  }
}

async function index(db) {
  const memos = await all(db, "SELECT * FROM memos");

  memos.forEach((memo) => {
    console.log(memo.firstLine);
  });

  await close(db);
}

async function save(db, memo) {
  await run(
    db,
    "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, firstLine TEXT NOT NULL)"
  );

  await run(db, "INSERT INTO memos (content, firstLine) VALUES (?, ?)", [
    memo.content,
    memo.firstLine,
  ]);

  await close(db);
}

function newMemo() {
  const stdin = fs.readFileSync("/dev/stdin", "utf8");
  const firstLine = stdin.split(`\n`)[0].trim();
  return { content: stdin, firstLine: firstLine };
}

function run(db, sql, params = {}) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      err ? reject(err) : resolve();
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
