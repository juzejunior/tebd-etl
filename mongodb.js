const MongoClient = require("mongodb").MongoClient;

class MongoDB {
  constructor() {
    this.url = "mongodb://localhost:27017";
    this.dbName = "DBVENDAS";
    this.database = null;
  }

  connect() {
    console.log(
      "connecting to database " + this.dbName + " with URL " + this.url
    );
    return new Promise((resolve, reject) => {
      MongoClient.connect(
        this.url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        (err, client) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          this.database = client.db(this.dbName);
          console.log(this.database);
          resolve();
        }
      );
    });
  }

  getAll() {
    const col = this.database.collection("autores");
    col.find().toArray((err, items) => {
      console.log(items);
    });
  }

  insertAll(array) {
    const col = this.database.collection("DWVENDAS.artigos");
    return col.insertMany(array, (err, result) => {
      if (err) return "err";
      console.log(result);
      return result;
    });
  }
}

module.exports = new MongoDB();
