#! /usr/bin/env node

import fs from "fs";
import sqlite3 from "sqlite3";

async function main() {
  const db = new sqlite3.Database("memos.db");
  const memo = newMemo();
  save(db, memo);
}

async function save(db, memo) {
  try {
    await run(
      db,
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, firstLine TEXT NOT NULL)"
    );

    await run(db, "INSERT INTO memos (content, firstLine) VALUES (?, ?)", [
      memo.content,
      memo.firstLine,
    ]);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    } else {
      throw err;
    }
  } finally {
    close(db);
  }
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

function close(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      err ? reject(err) : resolve();
    });
  });
}

main();
