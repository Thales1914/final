const { Sequelize } = require("sequelize");

// ajeita usuário e senha conforme seu Postgres
const sequelize = new Sequelize("retira-facil", "postgres", "300903tmB#@", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = { sequelize };
