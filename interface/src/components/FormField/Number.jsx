import { useState } from "react";

export default function Number(props = null) {
    const [value, setValue] = useState(props.value);

    function handleChange(event){
        setValue(event.target.value);
    }

    return (
        <div className="formfield-container">
            <label htmlFor={props.id}>{props.label}</label><br/>
            <input
                type={props.type}
                id={props.id}
                name={props.name}
                value={value}
                placeholder={props.placeholder}
                required={props.required}
                onChange={handleChange}
                autoComplete="off"
            />
            <div className="formfiels-details">
                <div className="formfield-tip">{props.tip}</div>
            </div>
        </div>
    );
}