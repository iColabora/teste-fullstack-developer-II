import { useState } from "react";

export default function Option(props){
    const [label, setLabel] = useState(props.option.label);
    const [value, setValue] = useState(props.option.value);

    function handleChangeLabel(event){
        setLabel(event.target.value);
    }

    function handleChangeValue(event){
        setValue(event.target.value);
    }

    return (
        <div className="formfield-container-inline" style={{display: "flex"}}>
            <input type="hidden" name={"option_id_"+ props.sequential} id={"option_id_" + props.sequential} value={props.option.id}/>
            <input type="text" name={"option_label_"+ props.sequential} id={"option_label_" + props.sequential} value={label} placeholder="Label" onChange={handleChangeLabel}/>
            <input type="text" name={"option_value_"+ props.sequential} id={"option_value_" + props.sequential} value={value} placeholder="Valor" onChange={handleChangeValue}/>
        </div>
    );
}