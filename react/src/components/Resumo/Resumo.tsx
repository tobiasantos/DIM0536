import { useState } from "react";
import "./Resumo.css";

interface item {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  url: string;
}

interface ResumoProps {
  carrinho: Array<{ id: number; quantidade: number }>;
  produtos: Array<item>;
  setEnvio: React.Dispatch<React.SetStateAction<boolean>>;
  cep: string;
  setCep: React.Dispatch<React.SetStateAction<string>>;
  frete: number;
  setFrete: React.Dispatch<React.SetStateAction<number>>;
  setPedido: React.Dispatch<
    React.SetStateAction<{
      pedido: {
        id: number;
        quantidade: number;
      }[];
      cep: string;
      valor_frete: number;
    }>
  >;
}

export const Resumo = ({
  carrinho,
  produtos,
  setEnvio,
  cep,
  setCep,
  frete,
  setFrete,
  setPedido,
}: ResumoProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const [endereco, setEndereco] = useState("");
  const [err, setErr] = useState(false);

  const calculaPrecoCarrinho = (
    carrinho: Array<{ id: number; quantidade: number }>
  ) => {
    return carrinho
      .reduce(
        (acc, itemCarrinho) =>
          acc +
          Number(
            produtos.find((produto) => {
              if (produto.id == itemCarrinho.id) return produto;
            })?.preco
          ) *
            itemCarrinho.quantidade,
        0
      )
      .toFixed(2);
  };

  const calculaQuantTotal = (
    carrinho: Array<{ id: number; quantidade: number }>
  ) => {
    const aux = carrinho.reduce((acc, value) => acc + value.quantidade, 0);
    return Number(aux);
  };

  const calculaFrete = (cep: string) => {
    fetch(`https://viacep.com.br/ws/${cep.replace("-", "")}/json`)
      .then((res) => res.json())
      .then((data) => {
        if (data.logradouro) {
          const valor = (Number(data.ddd) * Number(data.siafi)) / 10000;
          setFrete(valor);
          setEndereco(
            data.logradouro + " - " + data.bairro + "/" + data.localidade
          );
          setIsComplete(true);
        } else {
          setEndereco("Endereço não encontrado.");
          setIsComplete(false);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const calculaTotal = () => {
    const soma = Number(frete) + Number(calculaPrecoCarrinho(carrinho));
    return soma.toFixed(2);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    setCep(value);
  };

  const checkInput = (cep: string) => {
    if (cep.length !== 9) {
      setErr(true);
      setIsComplete(false);
      alert("CEP Inválido");
    } else {
      calculaFrete(cep);
      setErr(false);
    }
  };

  const handlePedido = () => {
    if (frete && Number(calculaPrecoCarrinho(carrinho))) {
      setEnvio(true);
      setPedido({
        pedido: carrinho,
        cep: cep,
        valor_frete: frete,
      });
      alert("Pedido Enviado!");
    } else {
      setEnvio(false);
      alert("Faltam etapas");
    }
  };

  return (
    <div className="resumo">
      <h2>Resumo</h2>
      <hr />
      <h3>Frete</h3>
      <div className="frete">
        <span>CEP</span>
        <div>
          <input
            className={err ? "borda-vermelha" : ""}
            type="text"
            value={cep}
            maxLength={9}
            onChange={(e) => handleInput(e)}
            placeholder="Insira CEP"
          />
          <button onClick={() => checkInput(cep)}>Ok</button>
        </div>
        <span>{isComplete && frete ? "R$ " + frete.toFixed(2) : ""}</span>
      </div>

      <br />
      {endereco ? endereco : ""}
      <hr />
      <div className="itens-calc">
        <span>
          {calculaQuantTotal(carrinho) > 1 ? "Itens" : "Item"} (
          {calculaQuantTotal(carrinho)})
        </span>
        <span>R$: {calculaPrecoCarrinho(carrinho)}</span>
      </div>
      <div className="frete-calc">
        <span>{isComplete && frete ? "Frete" : ""}</span>
        <span>{isComplete && frete ? `R$: ${frete.toFixed(2)}` : ""}</span>
      </div>
      <hr />
      <div className="total-calc">
        <span>Total</span>
        <span>R$: {calculaTotal()}</span>
      </div>
      <button
        className={isComplete ? "" : "disabled"}
        onClick={() => handlePedido()}
      >
        Fechar pedido
      </button>
    </div>
  );
};
