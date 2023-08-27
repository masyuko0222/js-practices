#! /usr/bin/env node

import sqlite3 from "sqlite3";

import {
  dbRunPromise,
  dbAllPromise,
  dbClosePromise,
} from "../../module/sqlite3_functions.js";

async function main() {
  const db = new sqlite3.Database(":memory:");

  await dbRunPromise(
    db,
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
  console.log("Create table successfully.");

  try {
    await dbRunPromise(
      db,
      "INSERT INTO books (no_column) VALUES ($title1), ($title2)"
    );
  } catch (err) {
    console.error(err.message);
  }

  try {
    await dbAllPromise(db, "SELECT * FROM no_table");
  } catch (err) {
    console.error(err.message);
  }

  await dbClosePromise(db);
  console.log("Closed DB successfully.");
}

main();
