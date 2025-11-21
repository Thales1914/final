import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="container page-area text-center fade-in">
      <div className="card-custom">
        <h2 className="mb-3">Pedido realizado com sucesso!</h2>

        <p className="lead mb-4">
          Seu pedido foi registrado e estará pronto para retirada no horário escolhido.
        </p>

        <Link to="/" className="btn btn-primary">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
