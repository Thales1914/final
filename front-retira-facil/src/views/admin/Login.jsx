import { useState } from "react";
import { useAuthController } from "../../controllers/useAuthController";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, loading, error } = useAuthController();
  const { login: saveToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await login(form.username, form.password);
    if (success) {
      saveToken(localStorage.getItem("token"));
      navigate("/admin/dashboard");
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
          />
        </div>

        <div className="mb-3">
          <label>Senha</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
