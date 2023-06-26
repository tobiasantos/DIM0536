import "./Main.css";

import { useEffect, useState } from "react";
import { ItemEdit } from "./itemEdit/ItemEdit";
import { Resumo } from "./Resumo/Resumo";

interface item {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  url: string;
}

interface pedido {
  pedido: { id: number; quantidade: number }[];
  cep: string;
  valor_frete: number;
}

interface MainProps {
  itensList: Array<item>;
}

export const Main = ({ itensList }: MainProps) => {
  const [itensQuant, setItensQuant] = useState(itensList.length);
  const [quantTotal, setQuantTotal] = useState(itensList.length);
  const [cep, setCep] = useState("");
  const [envio, setEnvio] = useState(false);
  const [frete, setFrete] = useState(0);
  const [carrinho, setCarrinho] = useState(
    itensList.map((item: item, idx: number) => {
      return {
        id: item.id,
        quantidade: 1,
      };
    })
  );

  const [pedido, setPedido] = useState({
    pedido: carrinho,
    cep: cep,
    valor_frete: frete,
  });

  const printaPedido = (pedido: pedido) => {
    return (
      <>
        {pedido.pedido.map((itemPedido) => {
          return (
            <h3>
              {itemPedido.id}: {itemPedido.quantidade}x
            </h3>
          );
        })}
        <h3>cep: {pedido.cep}</h3>
        <h3>frete: {pedido.valor_frete.toFixed(2)}</h3>
      </>
    );
  };

  const criaItens = (itens: Array<item>, envio: boolean) => {
    if (!envio)
      return itens.map((item: item, idx: number) => {
        if (item.id > 0)
          return (
            <>
              <ItemEdit
                key={idx}
                id={item.id}
                itemInfo={item}
                setItensQuant={setItensQuant}
                setQuantTotal={setQuantTotal}
                itensQuant={itensQuant}
                quantTotal={quantTotal}
                carrinho={carrinho}
                setCarrinho={setCarrinho}
              />
              <hr />
            </>
          );
      });
    console.log("objeto pedido: " + pedido);
    console.log(pedido);
    return (
      <>
        <h1>PEDIDO ENVIADO</h1>
        {printaPedido(pedido)}
      </>
    );
  };

  useEffect(() => {
    criaItens(itensList, envio);
  }, [itensQuant]);

  return (
    <>
      {!envio && (
        <div className="header">
          <h1>Carrinho de compras</h1>
          <h4>
            Você tem {quantTotal} {quantTotal > 1 ? "itens" : "item"}
          </h4>
        </div>
      )}

      {quantTotal > 0 ? (
        <div className="main-container">
          <div className="carrinho">
            <div className="itens">{criaItens(itensList, envio)}</div>
          </div>
          <Resumo
            carrinho={carrinho}
            produtos={itensList}
            setEnvio={setEnvio}
            cep={cep}
            setCep={setCep}
            frete={frete}
            setFrete={setFrete}
            setPedido={setPedido}
          />
        </div>
      ) : (
        <div className="main-container">
          <div className="carrinho">
            <h1>você não tem itens disponíveis :(</h1>
          </div>
          <div className="relative">
            <Resumo
              carrinho={carrinho}
              produtos={itensList}
              setEnvio={setEnvio}
              cep={cep}
              setCep={setCep}
              frete={frete}
              setFrete={setFrete}
              setPedido={setPedido}
            />
          </div>
        </div>
      )}
    </>
  );
};
