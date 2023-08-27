#! /usr/bin/env node

import sqlite3 from "sqlite3";

import {
  dbRunPromise,
  dbAllPromise,
  dbClosePromise,
} from "../module/sqlite3_functions.js";

async function main() {
  const db = new sqlite3.Database(":memory:");

  await dbRunPromise(
    db,
    "CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
  console.log("Created table successfully.");

  const lastId = await dbRunPromise(
    db,
    "INSERT INTO books (title) VALUES ($title1), ($title2)",
    {
      $title1: "FirstBook",
      $title2: "SecondBook",
    }
  );
  console.log(`The last inserted ID is ${lastId}`);

  const rows = await dbAllPromise(db, "SELECT * FROM books");
  console.log(rows);

  await dbClosePromise(db);
  console.log("Closed DB successfully.");
}

main();
