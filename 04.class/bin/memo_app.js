import fs from "fs";
import minimist from "minimist";
import sqlite3 from "sqlite3";
import { choice } from "../module/selector_module.js";
import { list, reference } from "../module/view_module.js";
import { Memo } from "../class/Memo.js";
import { SqliteDB } from "../class/SqliteDB.js";

const DB = "memos.db";

async function main() {
  const options = minimist(process.argv);
  const dbInstance = new SqliteDB(new sqlite3.Database(DB));

  try {
    if (options.l) {
      const memos = await Memo.all(dbInstance);
      list(memos);
    } else if (options.r) {
      const choiced_memo = await choice(
        await Memo.all(dbInstance),
        "Choose a note you want to reference:"
      );
      reference(choiced_memo);
    } else if (options.d) {
      const choiced_memo = await choice(
        await Memo.all(dbInstance),
        "Choose a note you want to delete:"
      );
      await Memo.destroy(dbInstance, choiced_memo);
    } else {
      const stdin = fs.readFileSync("/dev/stdin", "utf8");
      const memo = new Memo(stdin);
      await memo.save(dbInstance);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    } else {
      throw err;
    }
  } finally {
    await dbInstance.close();
  }
}

main();
