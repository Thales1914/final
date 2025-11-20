const express = require("express");
const controller = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// cliente cria pedido
router.post("/", controller.criar);

// admin vê e atualiza
router.get("/", auth, controller.listarAtivos);
router.put("/:id/status", auth, controller.atualizarStatus);

module.exports = router;
