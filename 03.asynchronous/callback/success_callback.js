#! /usr/bin/env node
"use strict";

import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run(
  `CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
  () => {
    console.log("Created table successfully.");
    db.run(
      `INSERT INTO books(title) VALUES($title1), ($title2)`,
      { $title1: "First Book", $title2: "Second Book" },
      function () {
        console.log("Inserted 2 records successfully.");
        console.log(`Last inserted ID is ${this.lastID}.`);
        db.all(`SELECT * FROM books`, (_, row) => {
          console.log("Selected all records.");
          console.log(row);
          db.close(() => {
            console.log("Closed DB");
          });
        });
      }
    );
  }
);
