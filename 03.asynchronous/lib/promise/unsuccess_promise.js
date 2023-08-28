#! /usr/bin/env node

import sqlite3 from "sqlite3";
import {
  dbRunPromise,
  dbAllPromise,
  dbClosePromise,
} from "../../module/sqlite3_functions.js";

function main() {
  const db = new sqlite3.Database(":memory:");

  dbRunPromise(
    db,
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  )
    .then(() => {
      console.log("Created table successfully.");
      return dbRunPromise(
        db,
        "INSERT INTO books (no_column) VALUES ($title1), ($title2)"
      );
    })
    .catch((err) => {
      console.error(err.message);
      return dbAllPromise(db, "SELECT * FROM no_table");
    })
    .catch((err) => {
      console.error(err.message);
    })
    .finally(() => {
      dbClosePromise(db);
    })
    .then(() => {
      console.log("Closed DB successfully.");
    });
}

main();
