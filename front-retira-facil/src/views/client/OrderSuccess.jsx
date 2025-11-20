import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="container text-center py-5">
      <h2 className="text-success fw-bold">Pedido realizado com sucesso!</h2>

      <p className="mt-3">
        Seu pedido foi registrado. Aguarde o e-mail de confirmação quando estiver pronto para retirada.
      </p>

      <Link to="/" className="btn btn-primary mt-3">
        Voltar ao início
      </Link>
    </div>
  );
}
