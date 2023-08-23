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

const insertRecordsRejectPromise = () => {
  return new Promise((_, reject) => {
    db.run(
      "INSERT INTO books (no_column) VALUES ($title1), ($title2)",
      { $title1: "FirstBook", $title2: "SecondBook" },
      (error) => {
        reject(error);
      }
    );
  });
};

const selectAllRecordsRejectPromise = () => {
  return new Promise((_, reject) => {
    db.all("SELECT * FROM no_table", (error) => {
      reject(error);
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

async function main() {
  await createTablePromise();
  console.log("Created books table successfully.");

  try {
    await insertRecordsRejectPromise();
  } catch (error) {
    console.log("Error occurred!!!");
    console.error(error);
  }

  try {
    await selectAllRecordsRejectPromise();
  } catch (error) {
    console.log("Error occurred!!!");
    console.error(error);
  }

  await closeDbPromise();
  console.log("Closed DB successfully.");
}

main();
