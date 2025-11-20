const express = require("express");
const controller = require("../controllers/productController");
const auth = require("../middleware/authMiddleware"); // <---- ESTE CAMINHO TEM QUE EXISTIR

const router = express.Router();

// cliente
router.get("/", controller.listar);

// admin
router.get("/admin", auth, controller.listarTodos);
router.post("/", auth, controller.criar);
router.put("/:id", auth, controller.atualizar);
router.delete("/:id", auth, controller.deletar);

module.exports = router;
