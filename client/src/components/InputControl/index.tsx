import { InputType } from "../../types/Input";
import { ReactNode, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

interface InputControlProps {
  input: InputType;
  setInput: (input: any) => void;
  children: ReactNode;
}

export default function InputControl({ input, setInput, children }: InputControlProps) {
  useEffect(() => {
    if (input.type !== "Combo") {
      setInput({ ...input, options1: "", options2: "", options3: "" });
    }
  }, [input.type]);

  return (
    <>

      <h4>{children}</h4>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Label do campo</label>
          <input
            type="text"
            className="form-control"
            onChange={(evt) => setInput({ ...input, label: evt.target.value })}
            value={input.label}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Id do campo</label>
          <input
            type="text"
            className="form-control"
            onChange={(evt) => setInput({ ...input, _id: evt.target.value })}
            value={input._id}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Tipo do campo</label>
          <select
            className="form-select"
            onChange={(evt) => setInput({ ...input, type: evt.target.value })}
            value={input.type}
          >
            <option defaultValue={input.type}>Texto</option>
            <option>Texto Grande</option>
            <option>Combo</option>
          </select>
        </div>
      </div>
      {input.type === "Combo" && (
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Opção 1:</label>
            <input
              type="text"
              className="form-control"
              onChange={(evt) => setInput({ ...input, options1: evt.target.value })}
              value={input.options1}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Opção 2:</label>
            <input
              type="text"
              className="form-control"
              onChange={(evt) => setInput({ ...input, options2: evt.target.value })}
              value={input.options2}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Opção 3:</label>
            <input
              type="text"
              className="form-control"
              onChange={(evt) => setInput({ ...input, options3: evt.target.value })}
              value={input.options3}
            />
          </div>
        </div>
      )}
    </>
  );
}
