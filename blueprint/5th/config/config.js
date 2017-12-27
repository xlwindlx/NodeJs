const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  // 개발 환경
  development: {
    root: rootPath,
    app: {
      name: '5th'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/5th-development'
  },

  // test환경
  test: {
    root: rootPath,
    app: {
      name: '5th'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/5th-test'
  },

  // 배포 환경
  production: {
    root: rootPath,
    app: {
      name: '5th'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/5th-production'
  }
};

module.exports = config[env];
