import fs from "fs";
import minimist from "minimist";
import sqlite3 from "sqlite3";
import { close } from "./module/sqlite3_module.js";
import { Format } from "./class/format_class.js";
import { Memo } from "./class/memo_class.js";

const DB = "memos.db";

async function main() {
  const options = minimist(process.argv);
  const db = new sqlite3.Database(DB);

  try {
    if (options.l) {
      const memos = await Memo.all(db);
      const format = new Format(memos);

      format.index();
    } else if (options.r) {
      const memos = await Memo.all(db);
      const format = new Format(memos);
      const selected = await format.select();

      format.show(selected);
    } else if (options.d) {
      const memos = await Memo.all(db);
      const format = new Format(memos);
      const selected = await format.select();

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
