const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgresql://postgres:JFpiMXUwWcRexaJnqHyaikJKaSwhLhZl@tramway.proxy.rlwy.net:12065/railway", {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = { sequelize };
