#! /usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

async function asyncMain() {
  await createTablePromise();
  console.log("Created books table successfully.");

  try {
    await insertErrRecords();
  } catch (error) {
    console.log("Failed inserting");
    console.log(error.message);
  }

  try {
    await selectErrRecords();
  } catch (error) {
    console.log("Failed selecting.");
    console.log(error.message);
  }

  await closeDbPromise();
  console.log("Closed DB successfully.");
}

const createTablePromise = () => {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      () => {
        resolve();
      }
    );
  });
};

const insertErrRecords = () => {
  return new Promise((_, reject) => {
    db.run(
      "INSERT INTO books (no_column) VALUES ($title1), ($title2)",
      { $title1: "First book", $title2: "Second Book" },
      (err) => {
        reject(err);
      }
    );
  });
};

const selectErrRecords = () => {
  return new Promise((_, reject) => {
    db.all("SELECT * FROM no_table", (err) => {
      reject(err);
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
