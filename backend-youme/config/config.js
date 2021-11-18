const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  "development": {
    "username": "admin",
    "password": process.env.DB_PASSWORD,
    "database": "myme_development",
    "host": "ssafy-pjt1-dbserver.cotmr33tcon0.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql",
    "timezone": "+09:00"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "admin",
    "password": process.env.DB_PASSWORD,
    "database": "myme_development",
    "host": "ssafy-pjt1-dbserver.cotmr33tcon0.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql",
    "timezone": "+09:00"
  }
}
