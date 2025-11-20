const jwt = require("jsonwebtoken");
const adminService = require("../services/adminService");

const JWT_SECRET = process.env.JWT_SECRET || "retira-facil-secret";

module.exports = {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await adminService.autenticar(username, password);
      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "8h" }
      );

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  },
};
