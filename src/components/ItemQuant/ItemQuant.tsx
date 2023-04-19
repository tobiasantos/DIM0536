import "./ItemQuant.css";
import upBtn from "../../assets/angle-up-solid.svg";
import downBtn from "../../assets/angle-down-solid.svg";

interface ItemQuantProp {
  quant: number;
  setQuant: Function;
  quantTotal: number;
  setQuantTotal: Function;
}

export const ItemQuant = ({
  quant,
  setQuant,
  quantTotal,
  setQuantTotal,
}: ItemQuantProp) => {
  const handleQuant = (action: string) => {
    if (action === "mais") {
      setQuantTotal(quantTotal + 1);
      return setQuant(quant + 1);
    }
    if (quant > 0) {
      setQuantTotal(quantTotal - 1);
      return setQuant(quant - 1);
    }
  };
  return (
    <div className="container">
      <span>{quant}</span>
      <div className="botoes">
        <img src={upBtn} onClick={() => handleQuant("mais")} />
        <img src={downBtn} onClick={() => handleQuant("menos")} />
      </div>
    </div>
  );
};
