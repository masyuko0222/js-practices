import { run, all } from "../module/sqlite3_module.js";

export class Memo {
  static async all(db) {
    return all(db, "SELECT * FROM memos");
  }

  static async destroy(db, memo) {
    await run(db, "DELETE FROM memos where id = ?", [memo.id]);
  }

  #content;
  #firstLine;

  constructor(stdin = "") {
    this.#content = stdin;
    this.#firstLine = stdin.split(`\n`)[0].trim();
  }

  async save(db) {
    await run(
      db,
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, firstLine TEXT NOT NULL)"
    );

    await run(db, "INSERT INTO memos (content, firstLine) VALUES (?, ?)", [
      this.#content,
      this.#firstLine,
    ]);
  }
}
