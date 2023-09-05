export function run(db, sql, params = {}) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      err ? reject(err) : resolve();
    });
  });
}

export function all(db, sql, params = {}) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
}

export function close(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      err ? reject(err) : resolve();
    });
  });
}
