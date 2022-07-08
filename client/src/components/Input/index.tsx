import { InputType } from "../../types/Input";

interface InputProps {
  input: InputType;
  setInput?: (input: any) => void;
}

function LocalInput({ input }: InputProps) {
  if (input.type === "Texto") {
    return <input type="text" className="form-control" id={input._id} maxLength={30} />;
  } else if (input.type === "Texto Grande") {
    return <textarea className="form-control" maxLength={100}></textarea>;
  } else {
    return (
      <select className="form-select">
        {!!input.options1 && <option>{input.options1}</option>}
        {!!input.options2 && <option>{input.options2}</option>}
        {!!input.options3 && <option>{input.options3}</option>}
      </select>
    );
  }
}

export default function Input({ input, setInput }: InputProps) {
  return (
    <>
      <label htmlFor={input._id}>{input.label}</label>
      <LocalInput input={input} />
    </>
  );
}
