const jwt = require("jsonwebtoken");
const adminService = require("../services/adminService");

const JWT_SECRET = process.env.JWT_SECRET || "retira-facil-secret";

function validarCampo(v) {
  return v && typeof v === "string" && v.trim().length > 0;
}

module.exports = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // ---------------- VALIDACOES ----------------

      if (!validarCampo(username)) {
        return res.status(400).json({ error: "Usuário é obrigatório." });
      }

      if (!validarCampo(password)) {
        return res.status(400).json({ error: "Senha é obrigatória." });
      }

      // --------------- AUTENTICACAO ----------------

      const user = await adminService.autenticar(username, password);

      if (!user) {
        return res
          .status(401)
          .json({ error: "Usuário ou senha incorretos." });
      }

      // --------------- GERA TOKEN ----------------

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "8h" }
      );

      res.json({ token });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro interno ao fazer login" });
    }
  },
};
