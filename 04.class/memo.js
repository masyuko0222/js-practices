import fs from "fs";
import minimist from "minimist";
import sqlite3 from "sqlite3";
import { close } from "./module/sqlite3_module.js";
import { index, show } from "./module/view_module.js";
import { Memo } from "./class/memo_class.js";
import { Selector } from "./class/selector_class.js";

const DB = "memos.db";

async function main() {
  const options = minimist(process.argv);
  const db = new sqlite3.Database(DB);

  try {
    if (options.l) {
      const memos = await Memo.all(db);
      index(memos);
    } else if (options.r) {
      const choiced_memo = await choice(db, "Choose a note you want to show:");
      show(choiced_memo);
    } else if (options.d) {
      const choiced_memo = await choice(
        db,
        "Choose a note you want to delete:"
      );
      await Memo.destroy(db, choiced_memo);
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

// DRY method
async function choice(db, msg = "") {
  const memos = await Memo.all(db);
  const selector = new Selector(memos);
  const choiced_memo = await selector.choice(msg);
  return choiced_memo;
}

main();
