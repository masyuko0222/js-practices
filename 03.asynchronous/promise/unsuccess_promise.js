#! /usr/bin/env node

import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

new Promise((resolve) => {
  db.run(
    `CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
    () => {
      console.log("Created books table successfully.");
      resolve();
    }
  );
})
  .then(() => {
    return new Promise((_, reject) => {
      db.run(
        `INSERT INTO books (no_column) VALUES ($title1), ($title2)`,
        { $title1: "First Books", $title2: "Second Book" },
        (err) => {
          console.log("Failed inserting");
          console.log(err.message);
          reject();
        }
      );
    });
  })
  .catch(() => {
    return new Promise((_, reject) => {
      db.all(`SELECT * FROM no_table`, (err) => {
        console.log("Failed selecting.");
        console.log(err.message);
        reject();
      });
    });
  })
  .finally(() => {
    return new Promise(() => {
      db.close(() => {
        console.log("Closed DB successfully.");
      });
    });
  });
