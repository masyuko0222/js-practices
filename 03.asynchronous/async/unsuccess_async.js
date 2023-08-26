#! /usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const dbRunPromise = (sql, param = {}) => {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
};

const dbAllPromise = (sql, param = {}) => {
  return new Promise((_, reject) => {
    db.all(sql, param, (err) => {
      reject(err);
    });
  });
};

const dbClosePromise = function (cb = new Function()) {
  return new Promise((resolve) => {
    db.close(function () {
      cb();
      resolve();
    });
  });
};

async function main() {
  await dbRunPromise(
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
  console.log("Create table successfully.");

  try {
    await dbRunPromise(
      "INSERT INTO books (no_column) VALUES ($title1), ($title2)"
    );
  } catch (err) {
    console.error(err.message);
  }

  try {
    await dbAllPromise("SELECT * FROM no_table");
  } catch (err) {
    console.error(err.message);
  }

  await dbClosePromise();
  console.log("Closed DB successfully.");
}

main();
