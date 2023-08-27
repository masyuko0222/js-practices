const dbRunPromise = (db, sql, params = {}) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      err ? reject(err) : resolve(this.lastID);
    });
  });
};

const dbAllPromise = (db, sql, params = {}) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
};

const dbClosePromise = function (db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      err ? reject(err) : resolve();
    });
  });
};

export { dbRunPromise, dbAllPromise, dbClosePromise };
