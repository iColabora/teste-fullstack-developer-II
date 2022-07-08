import { InputType } from "../../../types/Input";
import { useEffect, useState } from "react";
import "./style.scss";
import Input from "../../../components/Input";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [inputs, setInputs] = useState<InputType[]>([]);

  useEffect(() => {
    axios.post("http://localhost:3001/get-inputs").then((response) => {
      setInputs(response.data[0].inputs);
    });
  }, []);

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
