require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./sequelize");
require("./models"); // registra models e associações

const productRoutes = require("./routes/productRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminService = require("./services/adminService");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("🟢 Conectado ao Postgres!");

    await sequelize.sync();
    await adminService.criarPadraoSeNaoExistir();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar servidor:", err);
  }
}

start();
