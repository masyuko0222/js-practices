#! /usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const dbRunPromise = (sql, param = {}) => {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (err) {
      if (err) return reject(err);
      resolve(this.lastID);
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

function main() {
  dbRunPromise(
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  )
    .then(() => {
      console.log("Created table successfully.");
    })
    .then(() => {
      return dbRunPromise(
        "INSERT INTO books (no_column) VALUES ($title1), ($title2)"
      );
    })
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      return dbAllPromise("SELECT * FROM no_table");
    })
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      dbClosePromise(() => {
        console.log("Closed DB successfully.");
      });
    });
}

main();
