import { InputType } from "../../../types/Input";
import { useState } from "react";
import InputControl from "../../../components/InputControl";
import "./style.scss";
import { Link } from "react-router-dom";

export default function Home() {
  const inputTemplate: InputType = {
    _id: "",
    label: "",
    type: "Texto",
    options1: "",
    options2: "",
    options3: "",
  };

  const [input1, setInput1] = useState<InputType>(inputTemplate);
  const [input2, setInput2] = useState<InputType>(inputTemplate);
  const [input3, setInput3] = useState<InputType>(inputTemplate);
  const [input4, setInput4] = useState<InputType>(inputTemplate);
  const [input5, setInput5] = useState<InputType>(inputTemplate);

  function handleSaveButton() {
    localStorage.setItem(
      "@form:ChrisCoy",
      JSON.stringify([input1, input2, input3, input4, input5])
    );
    setInput1(inputTemplate);
    setInput2(inputTemplate);
    setInput3(inputTemplate);
    setInput4(inputTemplate);
    setInput5(inputTemplate);
  }

  return (
    <div className="formContainer">
      <h2>Configuração do Formulário</h2>
      <InputControl input={input1} setInput={setInput1}>
        Campo 1
      </InputControl>
      <InputControl input={input2} setInput={setInput2}>
        Campo 2
      </InputControl>
      <InputControl input={input3} setInput={setInput3}>
        Campo 3
      </InputControl>
      <InputControl input={input4} setInput={setInput4}>
        Campo 4
      </InputControl>
      <InputControl input={input5} setInput={setInput5}>
        Campo 5
      </InputControl>
      <button onClick={handleSaveButton} type="button" className="btn btn-success bg-primary">
        Salvar
      </button>
    </div>
  );
}
