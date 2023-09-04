#! /usr/bin/env node

import enquirer from "enquirer";
import fs from "fs";
import minimist from "minimist";
import sqlite3 from "sqlite3";

const DB = "memos.db";

async function main() {
  const options = minimist(process.argv);
  const db = new sqlite3.Database(DB);

  try {
    if (options.l) {
      index(db);
    } else if (options.r) {
      show(db);
    } else {
      save(db);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    } else {
      throw err;
    }
  }
}

// Controller
async function index(db) {
  const memos = await allMemos(db);

  memos.forEach((memo) => {
    console.log(memo.firstLine);
  });
  await close(db);
}

async function show(db) {
  const memos = await allMemos(db);
  const memo = await selectMemo(memos);
  console.log(memo);
  await close(db);
}

async function save(db) {
  const memo = newMemo();

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

const newMemo = () => {
  const stdin = fs.readFileSync("/dev/stdin", "utf8");
  const firstLine = stdin.split(`\n`)[0].trim();
  return { content: stdin, firstLine: firstLine };
};

const allMemos = async (db) => {
  return all(db, "SELECT * FROM memos");
};

const selectMemo = async (memos) => {
  const question = {
    type: "select",
    name: "memos",
    message: "Choose a note you want to see:",
    choices: memos.map((memo) => {
      return { name: memo.firstLine, value: memo.content };
    }),
    result() {
      return this.focused.value;
    },
  };

  const answer = await enquirer.prompt(question);
  return answer.memos;
};

// db functions
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
