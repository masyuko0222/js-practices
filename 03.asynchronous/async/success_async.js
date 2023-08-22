#! /usr/bin/env node
"use strict";

import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

//new Promise((resolve) => {
//  db.run(
//    `CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
//    () => {
//      console.log("Created books table successfully.");
//      resolve();
//    }
//  );
//})
//  .then(() => {
//    db.run(
//      `INSERT INTO books (title) VALUES ($title1), ($title2)`,
//      { $title1: "First Books", $title2: "Second Book" },
//      function () {
//        console.log("Inserted records successfully.");
//        console.log(`The last inserted ID is ${this.lastID}`);
//      }
//    );
//  })
//  .then(() => {
//    db.all(`SELECT * FROM books`, (_, row) => {
//      console.log("Selected all records successfully.");
//      console.log(row);
//    });
//  })
//  .finally(() => {
//    db.close(() => {
//      console.log("Closed DB successfully.");
//    });
//  });

async function asyncMain() {
  await createTablePromise();
  console.log("Created books table successfully.");

  const lastId = await insertRecordsPromise();
  console.log("Inserted records successfully.");
  console.log(`The last inserted ID is ${lastId}.`);

  const allRecords = await selectRecordsPromise();
  console.log("Selected all records successfully.");
  console.log(allRecords);

  await closeDbPromise();
  console.log("Closed DB successfully.");
}

const createTablePromise = () => {
  return new Promise((resolve) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
      () => {
        resolve();
      }
    );
  });
};

const insertRecordsPromise = () => {
  return new Promise((resolve) => {
    db.run(
      `INSERT INTO books (title) VALUES ($title1), ($title2)`,
      { $title1: "First book", $title2: "Second Book" },
      function () {
        resolve(this.lastID);
      }
    );
  });
};

const selectRecordsPromise = () => {
  return new Promise((resolve) => {
    db.all(`SELECT * FROM books`, (_, row) => {
      resolve(row);
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

asyncMain();