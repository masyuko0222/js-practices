#! /usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTablePromise = () => {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      () => {
        resolve();
      }
    );
  });
};

const insertRecordsPromise = () => {
  return new Promise((resolve) => {
    db.run(
      "INSERT INTO books (title) VALUES ($title1), ($title2)",
      { $title1: "FirstBook", $title2: "SecondBook" },
      function () {
        resolve(this.lastID);
      }
    );
  });
};

const selectAllRecordsPromise = () => {
  return new Promise((resolve) => {
    db.all("SELECT * FROM books", (_, rows) => {
      resolve(rows);
    });
  });
};

const closeDbPromise = () => {
  return new Promise((resolve) => {
    db.close(() => {
      resolve();
    });
  });
};

createTablePromise()
  .then(() => {
    console.log("Created books table successfully.");
    return insertRecordsPromise();
  })
  .then((lastId) => {
    console.log("Inserted records successfully.");
    console.log(`The inserted last ID is ${lastId}`);
    return selectAllRecordsPromise();
  })
  .then((rows) => {
    console.log("The below allay means all records.");
    console.log(rows);
  })
  .finally(() => {
    return closeDbPromise();
  })
  .then(() => {
    console.log("Closed DB successfully.");
  });
