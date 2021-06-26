const conf = {
    secret: {
      jwtSecret: 'secret code for KFF',
    },
    signOptions: {
      algorithm: 'RS256',
      expiresIn: 10, //in hours
    },
  };
  module.exports = conf;