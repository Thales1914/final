import { useState } from "react";
import { useAuthController } from "../../controllers/useAuthController";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login: apiLogin, loading } = useAuthController();
  const { login: saveToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.username.trim()) {
      alert("O campo usuário é obrigatório.");
      return;
    }

    if (!form.password.trim()) {
      alert("O campo senha é obrigatório.");
      return;
    }

    try {
      const token = await apiLogin(form.username, form.password);

      if (token) {
        saveToken(token); // SALVA NO sessionStorage
        navigate("/admin/dashboard");
      } else {
        alert("Usuário ou senha inválidos.");
      }

    } catch (err) {
      alert("Erro ao fazer login.");
      console.error(err);
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: "450px" }}>
      <h2 className="mb-4">Login Admin</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Usuário</label>
          <input
            className="form-control"
            name="username"
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label>Senha</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
