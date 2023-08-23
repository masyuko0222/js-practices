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
        if (error) {
          reject(error);
        }
      }
    );
  });
};

const selectAllRecordsRejectPromise = () => {
  return new Promise((_, reject) => {
    db.all("SELECT * FROM no_table", (error) => {
      if (error) {
        reject(error);
      }
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
    return insertRecordsRejectPromise();
  })
  .catch((error) => {
    console.log("Error occured!!!");
    console.error(error.message);
    return selectAllRecordsRejectPromise();
  })
  .catch((error) => {
    console.log("Error occured!");
    console.error(error.message);
  })
  .finally(() => {
    return closeDbPromise();
  })
  .then(() => {
    console.log("Closed DB successfully.");
  });
