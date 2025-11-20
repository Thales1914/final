const bcrypt = require("bcryptjs");
const AdminUser = require("../models/AdminUser");

module.exports = {
  async criarPadraoSeNaoExistir() {
    const count = await AdminUser.count();
    if (count === 0) {
      const passwordHash = await bcrypt.hash("admin123", 10);
      await AdminUser.create({
        username: "admin",
        passwordHash,
      });
      console.log("👑 Usuário admin padrão criado (admin / admin123)");
    }
  },

  async autenticar(username, password) {
    const user = await AdminUser.findOne({ where: { username } });
    if (!user) return null;

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return null;

    return user;
  },
};
