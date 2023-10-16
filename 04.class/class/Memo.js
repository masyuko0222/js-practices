export class Memo {
  static async all(dbInstance) {
    return dbInstance.all("SELECT * FROM memos");
  }

  static async destroy(dbInstance, memo) {
    await dbInstance.run("DELETE FROM memos where id = ?", [memo.id]);
  }

  #content;
  #firstLine;

  constructor(stdin = "") {
    this.#content = stdin;
    this.#firstLine = stdin.split(`\n`)[0].trim();
  }

  async save(dbInstance) {
    await dbInstance.run(
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, firstLine TEXT NOT NULL)"
    );

    await dbInstance.run(
      "INSERT INTO memos (content, firstLine) VALUES (?, ?)",
      [this.#content, this.#firstLine]
    );
  }
}
