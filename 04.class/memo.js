import fs from "fs";
import minimist from "minimist";
import sqlite3 from "sqlite3";
import { close } from "./module/sqlite3_module.js";
import { Format } from "./class/format_class.js";
import { Memo } from "./class/memo_class.js";

const DB = "memos.db";

// あくまでDRY化しただけのメソッドなので、データを何も持たないmainファイルでも、いくつかの関数定義がされています。
async function newFormat(db) {
  const memos = await Memo.all(db);
  return new Format(memos);
}

async function select(db, msg = "") {
  const format = await newFormat(db);
  const selected = await format.select(msg);

  return selected;
}

// main
async function main() {
  const options = minimist(process.argv);
  const db = new sqlite3.Database(DB);

  try {
    if (options.l) {
      const format = await newFormat(db);
      format.index();
    } else if (options.r) {
      const selected = await select(db, "Choose a note you want to see:");
      Format.show(selected);
    } else if (options.d) {
      const selected = await select(db, "Choose a note you want to delete:");
      await Memo.destroy(db, selected);
    } else {
      const stdin = fs.readFileSync("/dev/stdin", "utf8");
      const memo = new Memo(stdin);
      await memo.save(db);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    } else {
      throw err;
    }
  } finally {
    await close(db);
  }
}

main();
