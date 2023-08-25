#! /usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const dbRunPromise = (sql, param = {}) => {
  return new Promise((resolve) => {
    db.run(sql, param, function () {
      resolve(this.lastID);
    });
  });
};

const dbAllPromise = (sql, param = {}) => {
  return new Promise((resolve) => {
    db.all(sql, param, (_, rows) => {
      resolve(rows);
    });
  });
};

const dbClosePromise = function () {
  return new Promise((resolve) => {
    db.close(function () {
      resolve();
    });
  });
};

async function main() {
  await dbRunPromise(
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
  console.log("Create table successfully.");

  const lastId = await dbRunPromise(
    "INSERT INTO books (title) VALUES ($title1), ($title2)",
    {
      $title1: "FirstBook",
      $title2: "SecondBook",
    }
  );
  console.log(`The last inserted ID is ${lastId}`);

  const rows = await dbAllPromise("SELECT * FROM books");
  console.log(rows);

  await dbClosePromise();
  console.log("Closed DB successfully.");
}

main();
