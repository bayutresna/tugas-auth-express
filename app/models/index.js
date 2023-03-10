const config = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize= new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect, //driver atau vendor db macam postgres, mysql dll
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.customer = require("../models/customer.model.js")(sequelize,Sequelize);
db.product = require("../models/product.model.js")(sequelize,Sequelize);
db.order = require("../models/order.model.js")(sequelize,Sequelize);



db.user.hasMany(db.customer, {
  foreignKey: 'UserId'
});

db.order.belongsTo(db.user);
db.order.belongsTo(db.product);

db.customer.belongsTo(db.user);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
