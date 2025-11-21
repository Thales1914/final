import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container page-area fade-in">
      <div className="card-custom text-center">
        <h1 className="mb-3">Bem-vindo ao Retira Fácil</h1>
        <p className="lead mb-4">
          Escolha seus produtos, selecione um horário e retire tudo com rapidez
          e organização.
        </p>

        <Link to="/produtos" className="btn btn-primary btn-lg px-4">
          Ver Produtos
        </Link>
      </div>
    </div>
  );
}
