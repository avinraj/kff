const conf = {
    secret: {
      jwtSecret: 'secret code for KFF',
    },
    signOptions: {
      algorithm: 'RS256',
      expiresIn: '2h',
    },
  };
  module.exports = conf;