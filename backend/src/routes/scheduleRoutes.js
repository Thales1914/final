const express = require("express");
const controller = require("../controllers/scheduleController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// cliente
router.get("/", controller.listarDisponiveis);

// admin
router.get("/admin", auth, controller.listar);
router.post("/", auth, controller.criar);
router.put("/:id", auth, controller.atualizar);
router.delete("/:id", auth, controller.deletar);

module.exports = router;
