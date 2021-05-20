const dbConfig = {};

dbConfig.mongoUri = 'mongodb://localhost:27017/KFF';
if (process.env.NODE_ENV === 'production') {
  dbConfig.mongoUri = process.env.MONGODB_URI;
}

module.exports = dbConfig;