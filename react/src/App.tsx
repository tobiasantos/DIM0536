import "./App.css";
import { Main } from "./components/Main";
import { listaTeste } from "./data/itensTeste";

export default function App() {
  return <Main itensList={listaTeste} />;
}
