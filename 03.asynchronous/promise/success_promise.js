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

function main() {
  dbRunPromise(
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  )
    .then(() => {
      console.log("Created table successfully.");
    })
    .then(() => {
      return dbRunPromise(
        "INSERT INTO books (title) VALUES ($title1), ($title2)",
        {
          $title1: "FirstBook",
          $title2: "SecondBook",
        }
      );
    })
    .then((lastId) => {
      console.log(`The last inserted ID is ${lastId}`);
    })
    .then(() => {
      return dbAllPromise("SELECT * FROM books");
    })
    .then((rows) => {
      console.log(rows);
    })
    .finally(() => {
      dbClosePromise(() => {
        console.log("Closed DB successfully.");
      });
    })
    .then(() => {
      console.log("Closed DB successfully.");
    });
}

main();
