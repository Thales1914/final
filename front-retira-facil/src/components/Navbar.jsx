import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand" to="/">
        Retira Fácil
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/produtos">
              Produtos
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          {!isAuthenticated ? (
            <li className="nav-item">
              <Link className="nav-link" to="/admin/login">
                Admin
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <button className="btn btn-light btn-sm" onClick={logout}>
                  Sair
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
