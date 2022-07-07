import { InputType } from "../../../types/Input";
import { useEffect, useState } from "react";
import "./style.scss";
import Input from "../../../components/Input";
import { Link } from "react-router-dom";

export default function Home() {
  const [inputs, setInputs] = useState<InputType[]>(() => {
    const storagedInputs = localStorage.getItem("@form:ChrisCoy");
    if (storagedInputs) {
      return JSON.parse(storagedInputs);
    }
    return [];
  });

  console.log(localStorage.getItem("@form:ChrisCoy"));

  return (
    <div className="formContainer">
      <h2>Formulário</h2>
      <div className="row g-3">
        {inputs.map((input) => {
          return (
            <div className="col-md-6">
              <Input input={input} />
            </div>
          );
        })}
      </div>
      <button type="button" className="btn btn-success bg-primary">
        Salvar
      </button>
    </div>
  );
}
