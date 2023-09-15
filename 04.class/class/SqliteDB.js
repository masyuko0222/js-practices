export class SqliteDB {
  #db;

  constructor(db = "") {
    this.#db = db;
  }

  run(sql, params = {}) {
    return new Promise((resolve, reject) => {
      this.#db.run(sql, params, (err) => {
        err ? reject(err) : resolve();
      });
    });
  }

  all(sql, params = {}) {
    return new Promise((resolve, reject) => {
      this.#db.all(sql, params, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.#db.close((err) => {
        err ? reject(err) : resolve();
      });
    });
  }
}
