#! /usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const dbRunPromise = (sql, param = {}, cb = new Function()) => {
  return new Promise((resolve) => {
    db.run(sql, param, function () {
      if (this.lastID) {
        const lastId = this.lastID;
        cb(lastId);
        return resolve();
      }

      cb();
      resolve();
    });
  });
};

const dbAllPromise = (sql, param = {}, cb = new Function()) => {
  return new Promise((resolve) => {
    db.all(sql, param, function (_, rows) {
      if (rows) {
        cb(_, rows);
        return resolve();
      }
      cb();
      resolve();
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
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    {},
    () => {
      console.log("Created table successfully.");
    }
  )
    .then(() => {
      return dbRunPromise(
        "INSERT INTO books (title) VALUES ($title1), ($title2)",
        { $title1: "FirstBook", $title2: "SecondBook" },
        function (lastId) {
          console.log(`The last inserted ID is ${lastId}`);
        }
      );
    })
    .then(() => {
      return dbAllPromise("SELECT * FROM books", {}, (_, rows) => {
        console.log(rows);
      });
    })
    .finally(() => {
      dbClosePromise(() => {
        console.log("Closed DB successfully.");
      });
    });
}

main();
