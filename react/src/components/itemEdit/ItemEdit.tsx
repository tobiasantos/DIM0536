import "./ItemEdit.css";
import { useEffect, useState } from "react";
import { ItemQuant } from "../ItemQuant/ItemQuant";
import removeBtn from "../../assets/trash-solid.svg";

interface item {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  url: string;
}

interface ItemEditProp {
  id: number;
  itemInfo: item;
  itensQuant: number;
  setItensQuant: Function;
  quantTotal: number;
  setQuantTotal: Function;
  carrinho: Array<{ id: number; quantidade: number }>;
  setCarrinho: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        quantidade: number;
      }[]
    >
  >;
}

export const ItemEdit = ({
  id,
  itemInfo,
  itensQuant,
  setItensQuant,
  quantTotal,
  setQuantTotal,
  carrinho,
  setCarrinho,
}: ItemEditProp) => {
  const [quant, setQuant] = useState(1);

  useEffect(() => {
    setCarrinho((prev) => {
      const aux = prev.map((item: { id: number; quantidade: number }) => {
        if (item.id === id) {
          return { id: id, quantidade: quant };
        } else {
          return item;
        }
      });
      return aux;
    });
  }, [quant]);

  const handleRemove = async () => {
    await setCarrinho((prev) => {
      const aux = prev.filter((itemCarrinho) => {
        if (itemCarrinho.id != itemInfo.id) return itemCarrinho;
      });
      return aux;
    });
    itemInfo.id = -1;
    setItensQuant(itensQuant - 1);
    setQuantTotal(quantTotal - quant);
  };

  return (
    <div className="item-container">
      <div className="ilustracao">
        <img src={itemInfo.url} alt="ilustracao do item" />
      </div>
      <div className="info">
        <h2>{itemInfo.nome}</h2>
        <span>{itemInfo.descricao}</span>
        <br />
        <span>R$ {itemInfo.preco.toFixed(2)}</span>
      </div>

      <ItemQuant
        quant={quant}
        quantTotal={quantTotal}
        setQuant={setQuant}
        setQuantTotal={setQuantTotal}
      />

      <div className="total">{(itemInfo.preco * quant).toFixed(2)}</div>

      <div className="remove-btn">
        <img
          src={removeBtn}
          onClick={() => {
            handleRemove();
          }}
        />
      </div>
    </div>
  );
};
