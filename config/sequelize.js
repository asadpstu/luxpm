const dbConfig = require("./mysql");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model.js")(sequelize, Sequelize);
db.pythons = require("../models/python.model.js")(sequelize, Sequelize);


//db.quotations.hasMany(db.estimations);  //This code throws error, Probablbly package version error.

db.sequelize.sync();

module.exports = db;