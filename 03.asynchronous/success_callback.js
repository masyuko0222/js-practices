#! /usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    console.log("Created books table successfully.");
    db.run(
      "INSERT INTO books(title) VALUES($title1), ($title2)",
      { $title1: "First Book", $title2: "Second Book" },
      function () {
        console.log(`Last inserted ID is ${this.lastID}.`);
        db.all("SELECT * FROM books", (_, rows) => {
          console.log(rows);
          db.run("DROP TABLE books;", () => {
            console.log("Dropped books table successfully.");
            db.close(() => {
              console.log("Closed DB successfully.");
            });
          });
        });
      }
    );
  }
);
