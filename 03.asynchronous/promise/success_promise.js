#! /usr/bin/env node
"use strict";

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
    return new Promise((resolve) => {
      db.run(
        `INSERT INTO books (title) VALUES ($title1), ($title2)`,
        { $title1: "First Books", $title2: "Second Book" },
        function () {
          console.log("Inserted records successfully.");
          console.log(`The last inserted ID is ${this.lastID}`);
          resolve();
        }
      );
    });
  })
  .then(() => {
    return new Promise((resolve) => {
      db.all(`SELECT * FROM books`, (_, row) => {
        console.log("Selected all records successfully.");
        console.log(row);
        resolve();
      });
    });
  })
  .then(() => {
    return new Promise(() => {
      db.close(() => {
        console.log("Closed DB successfully.");
      });
    });
  });
