const MongoClient = require("mongodb").MongoClient;
const mongodbUri = require("mongodb-uri");
let dbClient = null;
module.exports.initDBConnection = (dbConfig) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      dbConfig.mongoUri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, client) => {
        if (err) {
          return reject(null);
        }
        const dbUri = mongodbUri.parse(dbConfig.mongoUri);
        const database = client.db(dbUri.database);
        dbClient = {
          sales: database.collection("sales"),
        };
        return resolve(dbClient);
      }
    );
  });
};
